import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getFoodLogs} from "../services/nutritionService";
import {getWeightLogs} from "../services/progressService";
import {getWorkoutPlans} from "../services/workoutService";



function Dashboard() {

    const [foodLogs, setFoodLogs] = useState([]);
    const [weightLogs, setWeightLogs] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
    
        const fetchFoodLogs = async () => {
            try {
                const logs = await getFoodLogs();

                setFoodLogs(logs);

            } catch (error) {
                console.error("Failed to fetch food logs:", error);
            }
        };

        const fetchWeightLogs = async () => {
            try {
                const logs = await getWeightLogs();

                setWeightLogs(logs);
            } catch (error) {
                console.error("Failed to fetch weight logs:", error);
            }
        };

        const fetchWorkoutPlans = async () => {
            try {
                const plans = await getWorkoutPlans();
                setWorkoutPlans(plans);
            } catch (error) {
                console.error("Failed to fetch workout plans:", error);
            }
        }

        fetchFoodLogs();
        fetchWeightLogs();
        fetchWorkoutPlans();
    }, []);

    // Get Todays Date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get Todays Food Logs
    const todaysFoodLogs = foodLogs.filter(log => log.date === today);

    // Calculate total calories and protein for today
    const todaysCalories = todaysFoodLogs.reduce((sum, log) => sum + log.calories, 0);
    const todaysProtein = todaysFoodLogs.reduce((sum, log) => sum + Number(log.protein ?? 0),0);

    // Get the most recent weight log
    const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : null;

    // Get todays workout plan based of day
    const dayOfWeek = new Date().toLocaleDateString("en-US", {weekday: "long"}).toUpperCase();
    const todaysWorkout = workoutPlans.find(plan => plan.day_of_week === dayOfWeek);

    return (
        <div className = {styles.dashboard}>
            <h1>Welcome back!</h1>

            <div className = {styles.dashboardGrid}>

                <section className = {styles.dashboardCard}>
                    <h2>Today's Workout</h2>
                    <p>{todaysWorkout ? todaysWorkout.workout_name : "No workout scheduled."}</p>
                    <button className = {styles.dashboardButton} onClick={() => navigate(`/workouts/${todaysWorkout.id}`)}  >View</button>
                </section>

                <section className = {styles.dashboardCard}>
                    <h2>Today's Nutrition</h2>
                    <p>Calories: {todaysCalories}</p>
                    <p>Protein: {todaysProtein}g</p>
                </section>

                <section className = {styles.dashboardCard}>
                    <h2>Current Weight</h2>
                    <p>{latestWeight} kg</p>
                </section>

                <section className = {styles.dashboardCard}>
                    <h2>Recent Workouts</h2>
                    <p>No workouts completed yet.</p>
                </section>
                

            </div>
        </div>
    );
}

export default Dashboard;