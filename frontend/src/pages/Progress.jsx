import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import { createWeightLog, getWeightLogs } from "../services/progressService";


function Progress() {


    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
    const [weightLogs, setWeightLogs] = useState([]);

    useEffect(() => {
        const fetchWeightLogs = async () => {
            try {
                const logs = await getWeightLogs();
                setWeightLogs(logs);
            } catch (error) {
                console.error("Failed to fetch weight logs:", error);
            }
        };

        fetchWeightLogs();
    }, []);

    const handleSubmit = async () => {

    const weightLog = {
        date: date,
        weight: weight,
        notes: notes
    };

    try {
        const response = await createWeightLog(weightLog);

        console.log("Weight log created:", response);

        setWeightLogs((previousLogs) => [
            ...previousLogs,
            response
        ]);

        setDate("");
        setWeight("");
        setNotes("");

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

        

        <div className = {styles.WeightLogsContainer}> 

        <span className = {styles.WeightLoggerText}> Weight History </span>

        <table className = {styles.WeightHistoryTable}>
            <thead>
                <tr>
                    <th className = {styles.WeightLoggerText}>Date</th>
                    <th className = {styles.WeightLoggerText}>Weight (kg)</th>
                    <th className = {styles.WeightLoggerText}>Notes</th>
                </tr>
            </thead>

            <tbody>
                {weightLogs.map((log) => (
                    <tr key={log.id}>
                        <td className = {styles.WeightLoggerText}>{log.date}</td>
                        <td className = {styles.WeightLoggerText}>{log.weight}</td>
                        <td className = {styles.WeightLoggerText}>{log.notes || "-"}</td>
                    </tr>
                ))}
            </tbody>

        </table>

        </div>

            
        </div>


    );

}

export default Progress;