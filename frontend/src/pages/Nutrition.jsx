import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import {createFoodLog, getFoodLogs } from "../services/nutritionService";


function Nutrition() {

    const [foodName, setFoodName] = useState("");
    const [date, setDate] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [mealType, setMealType] = useState("");

    const [foodLogs, setFoodLogs] = useState([]);


    useEffect(() => {

    const fetchFoodLogs = async () => {

        try {

            const logs = await getFoodLogs();

            setFoodLogs(logs);

        } catch (error) {

            console.error("Failed to fetch food logs:", error);

        }

    };

    fetchFoodLogs();

    

}, []);

const handleSubmit = async () => {

    const foodLog = {
        food_name: foodName,
        date: date,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
        meal_type: mealType
    };

    try {

        const response = await createFoodLog(foodLog);

        console.log("Food log created:", response);

        setFoodLogs((previousLogs) => [
            ...previousLogs,
            response
        ]);

        setFoodName("");
        setDate("");
        setCalories("");
        setProtein("");
        setCarbs("");
        setFats("");
        setMealType("");

    } catch (error) {

        console.error("Failed to create food log:", error);

    }
};


    return (

        <div className={styles.nutritionPage}>

            <h1>Nutrition</h1>


            <div className={styles.FoodLoggerContainer}>

                <span className={styles.FoodLoggerText}>
                    Food Logger
                </span>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Date
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Food
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Calories
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Protein (g)
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="number"
                        step="0.1"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Carbs (g)
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="number"
                        step="0.1"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Fats (g)
                    </label>

                    <input
                        className={styles.FoodLoggerInput}
                        type="number"
                        step="0.1"
                        value={fats}
                        onChange={(e) => setFats(e.target.value)}
                    />
                </div>


                <div>
                    <label className={styles.FoodLoggerText}>
                        Meal Type
                    </label>

                    <select
                        className={styles.FoodLoggerInput}
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                    >
                        <option value="">Select meal</option>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                        <option value="SNACK">Snack</option>
                    </select>
                </div>


                <button
                    className={styles.FoodLoggerButton}
                    onClick={handleSubmit}
                >
                    Submit
                </button>

            </div>


            <div className={styles.FoodLogsContainer}>

                <span className={styles.FoodLoggerText}>
                    Nutrition History
                </span>


                <table className={styles.FoodHistoryTable}>

                    <thead>
                        <tr>
                            <th className={styles.FoodLoggerText}>Date</th>
                            <th className={styles.FoodLoggerText}>Food</th>
                            <th className={styles.FoodLoggerText}>Calories</th>
                            <th className={styles.FoodLoggerText}>Protein</th>
                            <th className={styles.FoodLoggerText}>Carbs</th>
                            <th className={styles.FoodLoggerText}>Fats</th>
                            <th className={styles.FoodLoggerText}>Meal</th>
                        </tr>
                    </thead>


                    <tbody>

                        {foodLogs.map((log) => (

                            <tr key={log.id}>

                                <td className={styles.FoodLoggerText}>
                                    {log.date}
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.food_name}
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.calories}
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.protein}g
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.carbs}g
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.fats}g
                                </td>

                                <td className={styles.FoodLoggerText}>
                                    {log.meal_type}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default Nutrition;