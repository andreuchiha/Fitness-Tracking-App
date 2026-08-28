import styles from "../static/style.module.css";
import { useState } from "react";
import { createWeightLog } from "../services/progressService";


function Progress() {


    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async () => {

    const weightLog = {
        date: date,
        weight: weight,
        notes: notes
    };

    try {
        const response = await createWeightLog(weightLog);

        console.log("Weight log created:", response);

    } catch (error) {
        console.error("Failed to create weight log:", error);
    }
};

    return (

        <div className = {styles.progressPage}>
            
        <h1>Progress</h1>


            <div className = {styles.WeightLoggerContainer}>
            
            <span className = {styles.WeightLoggerText}> Weight Logger </span>

                <div>
                <label className = {styles.WeightLoggerText} >Date </label>
                <input  className = {styles.WeightLoggerInput} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                <label className = {styles.WeightLoggerText} >Weight (kg)</label>
                <input  className = {styles.WeightLoggerInput} type="number" step="0.1" value = {weight} onChange = {(e) => setWeight(e.target.value)}/>
                </div>


                <div>
                <label className = {styles.WeightLoggerText} >Notes</label>
                <input  className = {styles.WeightLoggerInput} type="text" value = {notes} onChange = {(e) => setNotes(e.target.value)}/>
                </div>


                <button className = {styles.WeightLoggerButton} onClick = {handleSubmit}>Submit</button>
        
            </div>


            
        </div>


    );

}

export default Progress;