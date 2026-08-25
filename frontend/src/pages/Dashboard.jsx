import styles from "../static/style.module.css";

function Dashboard() {
    return (
        <div className = {styles.dashboard}>
            <h1>Welcome back!</h1>

            <div className = {styles.dashboardGrid}>

                <section className = {styles.dashboardCard}>
                    <h2>Today's Workout</h2>
                    <p>No workout scheduled.</p>
                    <button>View Workouts</button>
                </section>

                <section className = {styles.dashboardCard}>
                    <h2>Today's Nutrition</h2>
                    <p>Calories: 0</p>
                    <p>Protein: 0g</p>
                </section>

                <section className = {styles.dashboardCard}>
                    <h2>Current Weight</h2>
                    <p>65 kg</p>
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