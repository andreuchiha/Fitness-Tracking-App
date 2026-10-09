import { useEffect, useState } from "react";
import styles from "../static/style.module.css";
import { getWorkoutSessions, getWorkoutPlan } from "../services/workoutService";
import SessionCard from "../components/SessionCard";
import WorkoutCalendar from "../components/WorkoutCalendar";

function Sessions() {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {

        const fetchSessions = async () => {

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

                setSessions(sessionsWithPlans);

                console.log("Fetched sessions:", sessionsWithPlans);

            } catch (error) {
                console.error("Error fetching workout sessions:", error);
            }

        };

        fetchSessions();

    }, []);

    return (
        <div className={styles.sessionPage}>

            <h1>Sessions</h1>

            <WorkoutCalendar sessions={sessions} />

            <div className={styles.sessionList}>

            {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />

            ))}

            </div>


        </div>
    );
}

export default Sessions;