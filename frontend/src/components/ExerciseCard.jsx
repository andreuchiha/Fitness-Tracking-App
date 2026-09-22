import styles from "../static/style.module.css";
import { useNavigate } from "react-router-dom";

function ExerciseCard({ exercise, exerciseMuscleGroups, muscleGroups }) {

    const navigate = useNavigate();

        const handleClick = () => {
        navigate(`/exercises/${exercise.id}`);
    };

    const targetedMuscles = exerciseMuscleGroups
        .filter(
            (exerciseMuscle) =>
                exerciseMuscle.exercise === exercise.id
        )
        .map(
            (exerciseMuscle) =>
                muscleGroups.find(
                    (muscle) =>
                        muscle.id === exerciseMuscle.muscle_group
                )
        )
        .filter(Boolean);

    return (
        <div className={styles.exerciseCard} onClick={handleClick}>
            <h2>{exercise.name}</h2>

            <p className = {styles.exerciseCardText}>
                Muscles:{" "}
                {targetedMuscles
                    .map((muscle) => muscle.name)
                    .join(", ")}
            </p>

            <span className = {styles.exerciseDifficultyText}>Difficulty: {exercise.difficulty}</span>

        </div>
    )

}


export default ExerciseCard;