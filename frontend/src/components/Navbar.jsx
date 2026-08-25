import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../static/style.module.css";


function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className={styles.navbar}>
            <h2>Gym Tracker</h2>

           <div className={styles.navLinks}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/workouts">Workouts</Link>
                <Link to="/nutrition">Nutrition</Link>
                <Link to="/progress">Progress</Link>

                <button className = {styles.logoutBtn} onClick={logout}>
                    Logout
                </button>
            </div>

            

            
        </nav>
    );
}

export default Navbar;