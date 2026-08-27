import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import ExerciseCard from "../components/ExerciseCard";
import styles from "../static/style.module.css";

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await getExercises();

                console.log("Exercises received:", data);

                setExercises(data);
            } catch (error) {
                console.error("Exercise API error:", error);
                setError("Failed to load exercises.");
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    if (loading) {
        return <p>Loading exercises...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Exercises</h1>

            <div className = {styles.exerciseGrid}>

            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}

            </div>
        </div>
    );
}

export default Exercises;