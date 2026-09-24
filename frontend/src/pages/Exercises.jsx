import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import styles from "../static/style.module.css";
import {
    getExercises,
    getExerciseMuscleGroups,
    getMuscleGroups
} from "../services/exerciseService";

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [exerciseMuscleGroups, setExerciseMuscleGroups] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            // Here is where I will call the API to fetch exercises, muscle groups and exercise muscle groups and set them in the state variable.
            try {
                const exercisesData = await getExercises();
                const exerciseMuscleGroupsData = await getExerciseMuscleGroups();
                const muscleGroupsData = await getMuscleGroups();

                setExercises(exercisesData);
                setExerciseMuscleGroups(exerciseMuscleGroupsData);
                setMuscleGroups(muscleGroupsData);

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

            <div className={styles.exerciseGrid}>
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        exerciseMuscleGroups={exerciseMuscleGroups}
                        muscleGroups={muscleGroups}
                    />
                ))}
            </div>
        </div>
    );
}

export default Exercises;