import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExercise } from "../services/exerciseService";
import styles from "../static/style.module.css";

function ExerciseDetails() {

    const { id } = useParams();

    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchExercise = async () => {

            try {

                const data = await getExercise(id);

                console.log("Exercise received:", data);

                setExercise(data);

            } catch (error) {

                console.error("Exercise API error:", error);

                setError("Failed to load exercise.");

            } finally {

                setLoading(false);

            }

        };

        fetchExercise();

    }, [id]);


    if (loading) {
        return <p>Loading exercise...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (

        <div className={styles.exerciseDetailsPage}>

            <h1>{exercise.name}</h1>

            <span className = {styles.exerciseCardText}>Difficulty: {exercise.difficulty}</span>





            <div className = {styles.exerciseInstructionsContainer}>
                <h2>Instructions</h2>

                <p className = {styles.exerciseInstructionsText}>
                    {exercise.instructions}
                </p>

            </div>

            <img
                src={exercise.image_url}
                alt={exercise.name}
            />

        </div>

    );

}

export default ExerciseDetails;