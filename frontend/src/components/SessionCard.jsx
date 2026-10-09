import styles from "../static/style.module.css";
import { useNavigate } from "react-router-dom";



function SessionCard({ session }) {

    const navigate = useNavigate();

    const handleClick = () => {
    navigate(`/workouts/session/${session.id}`);
    };

    return (
        <div className = {styles.sessionCard} onClick = {handleClick}> 
            <h3>{session.workoutPlan.workout_name}</h3>
            <p>{session.date}</p>
        </div>
    );}


export default SessionCard;