import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



import {
    getWorkoutPlan,
    createWorkoutPlanExercise,
    getWorkoutPlanExercises,
    deleteWorkoutPlanExercise
} from "../services/workoutService";

import { getExercises } from "../services/exerciseService";

import styles from "../static/style.module.css";


function WorkoutDetails() {

    const { id } = useParams();

    const [workout, setWorkout] = useState(null);

    const [exercises, setExercises] = useState([]);

    const [workoutExercises, setWorkoutExercises] = useState([]);

    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [restSeconds, setRestSeconds] = useState("");
    const [orderIndex, setOrderIndex] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);


    // Fetch workout, exercises and workout exercises
    // when the page loads
    useEffect(() => {

        const fetchWorkout = async () => {

            try {

                const data = await getWorkoutPlan(id);

                console.log("Workout received:", data);

                setWorkout(data);

            } catch (error) {

                console.error(
                    "Failed to fetch workout:",
                    error
                );

            }

        };


        const fetchExercises = async () => {

            try {

                const data = await getExercises();

                console.log("Exercises received:", data);

                setExercises(data);

            } catch (error) {

                console.error(
                    "Failed to fetch exercises:",
                    error
                );

            }

        };


        const fetchWorkoutExercises = async () => {

            try {

                const data = await getWorkoutPlanExercises();

                console.log(
                    "Workout plan exercises:",
                    data
                );

                const exercisesForWorkout = data
                    .filter(
                        (workoutExercise) =>
                            Number(workoutExercise.plan) === Number(id)
                    )
                    .sort(
                        (a, b) =>
                            a.order_index - b.order_index
                    );

                setWorkoutExercises(exercisesForWorkout);

            } catch (error) {

                console.error(
                    "Failed to fetch workout exercises:",
                    error
                );

            }

        };


        fetchWorkout();
        fetchExercises();
        fetchWorkoutExercises();

    }, [id]);


    // Add exercise to workout
    const handleAddExercise = async () => {

        const workoutPlanExercise = {

            plan: id,

            exercise: selectedExercise,

            sets: Number(sets),

            reps: Number(reps),

            rest: Number(restSeconds),

            order_index: Number(orderIndex)

        };


        console.log(
            "Creating workout plan exercise:",
            workoutPlanExercise
        );


        try {

            const response = await createWorkoutPlanExercise(
                workoutPlanExercise
            );


            console.log(
                "Workout plan exercise created:",
                response
            );


            // Add the newly created exercise to the list
            setWorkoutExercises((previousExercises) => {

                const updatedExercises = [
                    ...previousExercises,
                    response
                ];

                return updatedExercises.sort(
                    (a, b) =>
                        a.order_index - b.order_index
                );

            });


            // Reset inputs
            setSelectedExercise("");
            setSets("");
            setReps("");
            setRestSeconds("");
            setOrderIndex("");

            // Close form
            setShowCreateForm(false);


        } catch (error) {

            console.error(
                "Failed to add exercise:",
                error
            );

            if (error.response) {

                console.error(
                    "Django response:",
                    error.response.data
                );

            }

        }

    };

    const DeleteWorkoutPlanExercise = async (exerciseId) => {
        try {
            await deleteWorkoutPlanExercise(exerciseId);

            // Remove the deleted exercise from the list
            setWorkoutExercises((previousExercises) =>
                previousExercises.filter(
                    (exercise) => exercise.id !== exerciseId
                )
            );
        }

        catch (error) {

            console.error(
                "Failed to delete workout plan exercise:",
                error
            );
    }

}


    if (!workout) {

        return <p>Loading workout...</p>;

    }


    return (
        

        <div className={styles.workoutsPage}>

            <h1>{workout.workout_name}</h1>



            {/* Workout Exercises */}

            <div className={styles.WorkoutExercisesContainer}>

                <h2 className={styles.WorkoutPlanText}>
                    Exercises
                </h2>


                <div className={styles.WorkoutExercisesList}>

                    {workoutExercises.length === 0 ? (

                        <p>No exercises added yet.</p>

                    ) : (

                        workoutExercises.map((workoutExercise) => {

                            const exercise = exercises.find(
                                (exercise) =>
                                    Number(exercise.id) ===
                                    Number(workoutExercise.exercise)
                            );


                            return (

                                <div
                                    className={styles.WorkoutExerciseCard}
                                    key={workoutExercise.id}
                                >

                                    <h3>
                                        {workoutExercise.order_index}.{" "}
                                        {exercise
                                            ? exercise.name
                                            : "Unknown Exercise"}
                                    </h3>


                                    <p>
                                        Sets: {workoutExercise.sets}
                                    </p>


                                    <p>
                                        Reps: {workoutExercise.reps}
                                    </p>


                                    <p>
                                        Rest: {workoutExercise.rest} seconds
                                    </p>

                                    <button
                                    className = {styles.DeleteWorkoutPlanExerciseButton}
                                    onClick = {() => DeleteWorkoutPlanExercise(workoutExercise.id)}>
                                         REMOVE
                                          </button>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>

             {/* Add Exercise Button */}

            <div className={styles.CreateWorkoutPlansContainer}>

                <button
                    className={styles.ViewWorkoutButton}
                    onClick={() => setShowCreateForm(true)}
                >
                    Add Exercise
                </button>

            </div>


            {/* Add Exercise Form */}

            {showCreateForm && (

                <div className={styles.CreateWorkoutForm}>

                    <h2>Add Exercise</h2>


                    {/* Exercise */}

                    <div>

                        <select
                            value={selectedExercise}
                            onChange={(e) =>
                                setSelectedExercise(e.target.value)
                            }
                            className={styles.CreateWorkoutDropdown}
                        >

                            <option value="">
                                Select an exercise
                            </option>


                            {exercises.map((exercise) => (

                                <option
                                    key={exercise.id}
                                    value={exercise.id}
                                >
                                    {exercise.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Sets */}

                    <div>

                        <input
                            className={styles.CreateWorkoutFormInput}
                            type="number"
                            min="1"
                            value={sets}
                            onChange={(e) =>
                                setSets(e.target.value)
                            }
                            placeholder="Number of Sets"
                        />

                    </div>


                    {/* Reps */}

                    <div>

                        <input
                            className={styles.CreateWorkoutFormInput}
                            type="number"
                            min="1"
                            value={reps}
                            onChange={(e) =>
                                setReps(e.target.value)
                            }
                            placeholder="Number of Reps"
                        />

                    </div>


                    {/* Rest */}

                    <div>

                        <input
                            className={styles.CreateWorkoutFormInput}
                            type="number"
                            min="0"
                            value={restSeconds}
                            onChange={(e) =>
                                setRestSeconds(e.target.value)
                            }
                            placeholder="Rest (seconds)"
                        />

                    </div>


                    {/* Order Index */}

                    <div>

                        <input
                            className={styles.CreateWorkoutFormInput}
                            type="number"
                            min="1"
                            value={orderIndex}
                            onChange={(e) =>
                                setOrderIndex(e.target.value)
                            }
                            placeholder="Exercise Order"
                        />

                    </div>


                    {/* Add Exercise */}

                    <button
                        className={styles.CreateWorkoutButton}
                        onClick={handleAddExercise}
                    >
                        Add Exercise
                    </button>


                    {/* Cancel */}

                    <button
                        className={styles.CreateWorkoutButton}
                        onClick={() => setShowCreateForm(false)}
                    >
                        Cancel
                    </button>

                </div>

            )}


        </div>

    );

}


export default WorkoutDetails;