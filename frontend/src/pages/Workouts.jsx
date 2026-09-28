import styles from "../static/style.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWorkoutPlans, createWorkoutPlan, deleteWorkoutPlan } from "../services/workoutService";

function Workouts() {

    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);

    const navigate = useNavigate();

    // Fetch workout plans when the page loads
    useEffect(() => {

        const fetchWorkoutPlans = async () => {

            try {

                const plans = await getWorkoutPlans();

                console.log("Workout plans:", plans);

                setWorkoutPlans(plans);

            } catch (error) {

                console.error("Failed to fetch workout plans:", error);

            }

        };

        fetchWorkoutPlans();

    }, []);

    const handleCreateWorkoutPlan = async () => {

        const workoutPlan = {
            workout_name: workoutName,
            day_of_week: dayOfWeek,
        };

        try {

            const response = await createWorkoutPlan(workoutPlan);

            console.log("Workout plan created:", response);

            setWorkoutPlans((previousPlans) => [
                ...previousPlans,
                response
             ]);

        setWorkoutName("");
        setDayOfWeek("");
        setShowCreateForm(false);
        }
            catch (error) {

        console.error("Failed to create workout plan:", error);

    }
    }
    
    const deleteWorkout = async(id ) => {

        try {
            await deleteWorkoutPlan(id);

            setWorkoutPlans((previousPlans) =>
                 previousPlans.filter((plan) => plan.id !== id)
        );
        }

        catch (error) {
            console.error("Failed to delete workout plan:", error);
        }
    }

    return (

        <div className={styles.workoutsPage}>

            <h1>Workouts</h1>

            

            <div className={styles.WorkoutPlansContainer}>

                <span className={styles.WorkoutPlanText}>
                    My Workout Plans
                </span>


                <div className={styles.WorkoutPlansGrid}>

                    {workoutPlans.map((plan) => (

                        <div
                            className={styles.WorkoutPlanCard}
                            key={plan.id}
                        >

                            <h2>{plan.workout_name}</h2>

                            <h2>{plan.day_of_week}</h2>

                            <button className={styles.ViewWorkoutButton}  onClick={() => navigate(`/workouts/${plan.id}`)} >
                                View Workout
                            </button>

                            <button
                             className={styles.DeleteWorkoutPlanExerciseButton}
                             onClick={() => deleteWorkout(plan.id)}
                            >
                                REMOVE
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <div className = {styles.CreateWorkoutPlansContainer}>

                <button className={styles.ViewWorkoutButton} onClick={() => setShowCreateForm(true)}>
                    Create New Workout Plan
                </button>

            </div>

            {showCreateForm && (

                    <div className={styles.CreateWorkoutForm}>

                        <h2>Create Workout Plan</h2>

                        <div>


                            <input
                                className={styles.CreateWorkoutFormInput}
                                type="text"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                placeholder="Workout Name"
                            />
                        </div>

                        <div>

                            <select
                                className={styles.CreateWorkoutDropdown}
                                value={dayOfWeek}
                                onChange={(e) => setDayOfWeek(e.target.value)}
                            >
                                <option value="">Select a day</option>
                                <option value="MONDAY">Monday</option>
                                <option value="TUESDAY">Tuesday</option>
                                <option value="WEDNESDAY">Wednesday</option>
                                <option value="THURSDAY">Thursday</option>
                                <option value="FRIDAY">Friday</option>
                                <option value="SATURDAY">Saturday</option>
                                <option value="SUNDAY">Sunday</option>
                            </select>
                        </div>

                        <button
                            className={styles.CreateWorkoutButton}
                            onClick={handleCreateWorkoutPlan}
                        >
                            Create Workout Plan
                        </button>

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

export default Workouts;