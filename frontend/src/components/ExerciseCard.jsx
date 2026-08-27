import styles from "../static/style.module.css";
import { useNavigate } from "react-router-dom";

function ExerciseCard({ exercise }) {

    const navigate = useNavigate();

        const handleClick = () => {
        navigate(`/exercises/${exercise.id}`);
    };


    return (
        <div className={styles.exerciseCard} onClick={handleClick}>
            <h2>{exercise.name}</h2>
            <p className = {styles.exerciseInstructionsText}> {exercise.instructions} </p>
            <span className = {styles.exerciseDifficultyText}>Difficulty: {exercise.difficulty}</span>
        </div>
    )

}


export default ExerciseCard;