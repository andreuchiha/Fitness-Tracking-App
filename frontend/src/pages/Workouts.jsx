import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import { getWorkoutPlans } from "../services/workoutService";

function Workouts() {

    const [workoutPlans, setWorkoutPlans] = useState([]);

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

    return (

        <div className={styles.workoutsPage}>

            <h1>Workouts</h1>

            <div className={styles.WorkoutPlansContainer}>

                <span className={styles.WorkoutText}>
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

                            <button className={styles.ViewWorkoutButton}>
                                View Workout
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Workouts;