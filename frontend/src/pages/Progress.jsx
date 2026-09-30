import styles from "../static/style.module.css";
import { useState, useEffect } from "react";
import { createWeightLog, getWeightLogs, deleteWeightLog} from "../services/progressService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Progress() {


    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
    const [weightLogs, setWeightLogs] = useState([]);

    useEffect(() => {
        const fetchWeightLogs = async () => {
            try {
                const logs = await getWeightLogs();

                const sortedLogs = [...logs].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
                );

                setWeightLogs(sortedLogs);
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

        setWeightLogs((previousLogs) => {

            const updatedLogs = [
                ...previousLogs,
                response
            ];

            return updatedLogs.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

        });

        setDate("");
        setWeight("");
        setNotes("");

    } catch (error) {
        console.error("Failed to create weight log:", error);
    }


    };

    const handleDeleteWeightLog = async (id) => {
    try {
        await deleteWeightLog(id);
        setWeightLogs((previousLogs) =>
            previousLogs.filter((log) => log.id !== id)
        );

    }catch (error) {
        console.error("Failed to delete weight log:", error);
    }

    }



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

        <div className={styles.WeightGraphContainer}>

    <span className={styles.WeightLoggerText}>
        Weight Journey
    </span>

    <ResponsiveContainer width="100%" height={400}>

        <LineChart data={weightLogs}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
                dataKey="date"
                tick={{ fill: 'white' }}
            />

            <YAxis
                label={{
                    value: "Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: 'white'}
                    
                }}
                tick={{ fill: 'white' }}
                
            />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="weight"
                stroke="#3498db"
                strokeWidth={3}
                dot={{ r: 5 }}
            />

        </LineChart>

    </ResponsiveContainer>

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
                        <td>
                            <button
                                className = {styles.deleteButton}
                                onClick={() => handleDeleteWeightLog(log.id)}
                            >
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

        </div>

            
        </div>


    );

}

export default Progress;