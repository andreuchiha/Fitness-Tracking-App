import { useParams, useNavigate } from "react-router-dom";
import {getWorkoutSession,
    getWorkoutPlan,
    createWorkoutSessionExercise,
    getWorkoutSessionsExercises,
    deleteWorkoutSession,} from "../services/workoutService";
import { useEffect, useState } from "react";
import styles from "../static/style.module.css";
import { getExercises } from "../services/exerciseService";


function SessionDetails() {


    const { sessionId } = useParams();

    const [session, setSession] = useState(null);
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([]);


    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


    const navigate = useNavigate();

useEffect(() => {

    const fetchData = async () => {

        try {

            // Get the session first
            const sessionData = await getWorkoutSession(sessionId);

            setSession(sessionData);

            console.log("Session received:", sessionData);
            

            // Get the workout plan associated with the session for information
            const workoutPlanData = await getWorkoutPlan(
                sessionData.workout_plan
            );

            setWorkoutPlan(workoutPlanData);

            console.log(
                "Workout received:",
                workoutPlanData
            );

            // Get the exercises for the dropdown
            const exercisesData = await getExercises();

            console.log("Exercises received:", exercisesData);

            setExercises(exercisesData);

        } catch (error) {

            console.error(
                "Failed to fetch session data:",
                error
            );

        }

        const workoutSessionsExerciseData = await getWorkoutSessionsExercises(sessionId);
        console.log("Workout Session Exercises received:", workoutSessionsExerciseData);

        const exercisesForThisSession = workoutSessionsExerciseData.filter(
            (exercise) => exercise.workout_session === Number(sessionId)
        );

        setWorkoutExercises(exercisesForThisSession);

    };

    fetchData();

}, [sessionId]);

    const handleDeleteSession = async () => {

        try {
            await deleteWorkoutSession(sessionId);
            navigate("/sessions");
        } catch (error) {
            console.error("Failed to delete session:", error);
        }

    };

    const handleAddExerciseToSession = async () => {

        if (!selectedExercise || !sets || !reps || !weight) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const newExercise = {
                exercise: selectedExercise,
                sets_completed: Number(sets),
                reps_completed: Number(reps),
                weight: Number(weight),
                workout_session: sessionId,
            };

            const response = await createWorkoutSessionExercise(newExercise);

            // Add the newly created exercise to the list
            setWorkoutExercises((previousExercises) => {

                const updatedExercises = [
                    ...previousExercises,
                    response
                ];

                return updatedExercises;
            });

            setSelectedExercise("");
            setSets("");
            setReps("");
            setWeight("");

            // Close form
            setShowCreateForm(false);

        } catch (error) {
            console.error("Failed to add exercise to session:", error);
        }
    };

    return (
    
    <div className = {styles.sessionPage}>
    
        <h1> Workout Session</h1>

    <div className = {styles.sessionDetailsHeader}>

        <p> {workoutPlan?.workout_name} | {session?.date} </p>
        <button onClick={() => setShowOptions(true)} className = {styles.ViewWorkoutButton}>
            OPTIONS
        </button>
    </div>


    <div className = {styles.SessionExerciseLog}> 

        <h2 className={styles.WorkoutPlanText}>
            Exercises
        </h2>

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
                                                {exercise
                                                    ? exercise.name
                                                    : "Unknown Exercise"}
                                            </h3>
        
        
                                            <p>
                                                Sets: {workoutExercise.sets_completed}
                                            </p>
        
        
                                            <p>
                                                Reps: {workoutExercise.reps_completed}
                                            </p>
        
        
                                            <p>
                                                Weight: {workoutExercise.weight} kg
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

    <div className = {styles.addSessionExercise}>

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
    
    
                        {/* Sets Completed*/}
    
                        <div>
    
                            <input
                                className={styles.CreateWorkoutFormInput}
                                type="number"
                                min="1"
                                value={sets}
                                onChange={(e) =>
                                    setSets(e.target.value)
                                }
                                placeholder="Sets Completed"
                            />
    
                        </div>
    
    
                        {/* Reps Completed */}
    
                        <div>
    
                            <input
                                className={styles.CreateWorkoutFormInput}
                                type="number"
                                min="1"
                                value={reps}
                                onChange={(e) =>
                                    setReps(e.target.value)
                                }
                                placeholder="Reps Completed"
                            />
    
                        </div>
    
    
                        {/* Weight */}
    
                        <div>
    
                            <input
                                className={styles.CreateWorkoutFormInput}
                                type="number"
                                min="0"
                                value={weight}
                                onChange={(e) =>
                                    setWeight(e.target.value)
                                }
                                placeholder="Weight"
                            />
    
                        </div>
    
    

    
                        {/* Add Exercise */}
    
                        <button
                            className={styles.CreateWorkoutButton}
                            onClick={handleAddExerciseToSession}
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


        {showOptions && (
        <div
            className={styles.optionsOverlay}
            onClick={() => setShowOptions(false)}
        >
            <div
                className={styles.optionsPanel}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeOptions}
                    onClick={() => setShowOptions(false)}
                >
                    ✕
                </button>

                <h2>Session Options</h2>

                <button className={styles.confirmDeleteButton}
                 onClick={() => setShowDeleteConfirm(true)}> DELETE </button>


                {/* Add more options here */}
            </div>
        </div>
        )}

        {showDeleteConfirm && (
            <div
                className={styles.optionsOverlay}
                onClick={() => setShowDeleteConfirm(false)}
            >
                <div
                    className={styles.deleteConfirmPanel}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Delete Workout Session?</h2>

                    <p>
                        Are you sure you want to delete this workout session?
                        This action cannot be undone.
                    </p>

                    <div className={styles.deleteConfirmButtons}>
                        <button
                            className={styles.cancelDeleteButton}
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className={styles.confirmDeleteButton}
                            onClick={handleDeleteSession}
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </div>
        )}


    </div>


    );
}

export default SessionDetails;