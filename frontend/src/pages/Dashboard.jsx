import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Services
import {getFoodLogs} from "../services/nutritionService";
import {getWeightLogs} from "../services/progressService";
import {getWorkoutPlans, getWorkoutSessions, getWorkoutPlan, getWorkoutSessionsExercises} from "../services/workoutService";
import { getExercises } from "../services/exerciseService";
// Components
import WorkoutCalendar from "../components/WorkoutCalendar2";




function Dashboard() {

    const [foodLogs, setFoodLogs] = useState([]);
    const [weightLogs, setWeightLogs] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [workoutSessions, setWorkoutSessions] = useState([]);
    const [bestLifts, setBestLifts] = useState([]);


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

        const fetchWorkoutSessions = async () => {
            try {
                const sessionsData = await getWorkoutSessions();

                const sessionsWithPlans = await Promise.all(
                    sessionsData.map(async (session) => {

                        const workoutPlan = await getWorkoutPlan(
                            session.workout_plan
                        );

                        return {
                            ...session,
                            workoutPlan: workoutPlan
                        };

                    })
                );

                setWorkoutSessions(sessionsWithPlans);
            } catch (error) {
                console.error("Failed to fetch workout sessions:", error);
            }
        };

        const fetchBestLifts = async () => {
    try {
        const [sessionExercises, exercises] = await Promise.all([
            getWorkoutSessionsExercises(),
            getExercises()
        ]);

        const liftRecords = {};

        sessionExercises.forEach((record) => {
            const weight = Number(record.weight);

            // Ignore records without a valid recorded weight.
            if (
                record.weight === null ||
                record.weight === undefined ||
                record.weight === "" ||
                !Number.isFinite(weight) ||
                weight <= 0
            ) {
                return;
            }

            const exerciseId = record.exercise;
            const exercise = exercises.find(
                (item) => Number(item.id) === Number(exerciseId)
            );

            if (!exercise) {
                return;
            }

            if (
                !liftRecords[exerciseId] ||
                weight > liftRecords[exerciseId].weight
            ) {
                liftRecords[exerciseId] = {
                    id: exerciseId,
                    name: exercise.name,
                    weight: weight
                };
            }
        });

        const sortedLifts = Object.values(liftRecords)
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 5); // Second number decides how many best lifts show

        setBestLifts(sortedLifts);
    } catch (error) {
        console.error("Failed to fetch best lifts:", error);
    }
    };
        
        fetchFoodLogs();
        fetchWeightLogs();
        fetchWorkoutPlans();
        fetchWorkoutSessions();
        fetchBestLifts();
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

    // Get the latest 3 workout sessions
    const latestWorkoutSessions = workoutSessions.slice(-3).reverse();
    // Calculate average workout duration
    const totalWorkoutDuration = workoutSessions.reduce(
    (total, session) => total + Number(session.duration || 0),
    0);

    const averageWorkoutDuration = workoutSessions.length > 0
    ? Math.round(totalWorkoutDuration / workoutSessions.length)
    : 0;

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
                    <h2>Recent Sessions</h2>
                    {latestWorkoutSessions.length > 0 ? (
                        <ul>
                            {latestWorkoutSessions.map(session => (
                                <li key={session.id}>{session.workoutPlan?.workout_name} | {session.duration} mins</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No workouts completed yet.</p>
                    )}
                </section>


                <section className = {styles.dashboardCalendarCard}>
                    <WorkoutCalendar sessions={workoutSessions} />

                </section>
                
            <section className={styles.dashboardCard}>
                <h2>Top Lifts</h2>

                {bestLifts.length > 0 ? (
                    <ul >
                        {bestLifts.map((lift) => (
                            <li key={lift.id}>
                                <span>{lift.name}: </span>
                                <strong>{lift.weight} kg</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recorded lifts yet.</p>
                )}
            </section>

<section className={styles.dashboardGraphCard}>
    <h2>Weight Journey</h2>

    {weightLogs.length > 0 ? (
        <div className={styles.dashboardWeightGraph}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={[...weightLogs].sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                    )}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 5
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#536577"
                    />

                    <YAxis
                        tick={{ fill: "white", fontSize: 12 }}
                        width={45}
                        domain={["auto", "auto"]}
                        tickFormatter={(value) => `${value} kg`}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#172f41",
                            border: "1px solid #536577",
                            borderRadius: "8px",
                            color: "white"
                        }}
                        labelFormatter={(label, payload) =>
                            payload?.[0]?.payload?.date ?? ""
                        }
                        formatter={(value) => [`${value} kg`, "Weight"]}
                    />

                    <Line
                        type="monotone"
                        dataKey="weight"
                        name="Weight"
                        stroke="#48bb78"
                        strokeWidth={3}
                        dot={{ r: 3, fill: "#48bb78" }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>



        </div>
    ) : (
        <p>No weight logs recorded yet.</p>
    )}
</section>

        <section className={styles.dashboardCard}>

            <h2>Average Workout Duration</h2>

            <p className={styles.dashboardDurationText}>
                {averageWorkoutDuration} minutes
            </p>

            <p className={styles.dashboardDurationText2}>Across {workoutSessions.length} workout sessions</p>

        </section>

                

            </div>

            
        </div>
    );
}

export default Dashboard;