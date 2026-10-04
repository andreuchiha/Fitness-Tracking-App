import { useParams, useNavigate } from "react-router-dom";
import {getWorkoutPlan, getWorkoutPlanExercises, createWorkoutSession} from "../services/workoutService";
import { useEffect, useState } from "react";
import styles from "../static/style.module.css";
import { getExercises } from "../services/exerciseService";


function WorkoutSession() {


    const { id } = useParams();

    const [workout, setWorkout] = useState(null);
    const [notes, setNotes] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState("");

    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {

        const fetchWorkout = async () => {
            try {
                const workoutData = await getWorkoutPlan(id);
                setWorkout(workoutData);
            } catch (error) {
                console.error("Failed to fetch workout plan:", error);
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



    }
    , [id]);

    const today = new Date().toISOString().split("T")[0];

        
    const handleRegisterSession = async () => {
        const workoutSession = {
            workout_plan: id,
            notes: notes,
            duration: duration,
            date: today,
                }

        try {
            const response = await createWorkoutSession(workoutSession);
            console.log("Workout session created:", response);
        } catch (error) {
            console.error("Failed to create workout session:", error);
            error.response?.data
        }}

        return ( <div className={styles.workoutsPage}>

            <h1>{workout ? `${workout.workout_name} Session` : "Loading..."}</h1>

            <p> DATE </p>


            {/* Workout Exercises Container */}

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


                                </div>

                            );

                        })

                    )}

                </div>

            </div>



            <input
                className={styles.FoodLoggerInput}
                type="text"
                value={notes}
                placeholder="Enter your notes here..."
                onChange={(e) => setNotes(e.target.value)}
            />

            <input
                className={styles.FoodLoggerInput}
                type="number"
                value={duration}
                placeholder="Duration (in minutes)"
                onChange={(e) => setDuration(e.target.value)}
            />

            <button onClick={handleRegisterSession}>Register</button>

    </div>);
}

export default WorkoutSession;