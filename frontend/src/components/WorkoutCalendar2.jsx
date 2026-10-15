
import { useState } from "react";
import styles from "../static/style.module.css";

function WorkoutCalendar({ sessions }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday = 0, Tuesday = 1, ..., Sunday = 6
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

    const workoutDates = new Set(
        sessions
            .filter((session) => session.date)
            .map((session) => session.date.slice(0, 10))
    );

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const previousMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const monthName = currentMonth.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className={styles.workoutCalendar2}>
            <div className={styles.calendarHeader2}>
                <button type="button" onClick={previousMonth}>
                    &lt;
                </button>

                <h2>{monthName}</h2>

                <button type="button" onClick={nextMonth}>
                    &gt;
                </button>
            </div>

            <div className={styles.calendarGrid2}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                        <div
                            key={day}
                            className={styles.calendarWeekday2}
                        >
                            {day}
                        </div>
                    )
                )}

                {Array.from({ length: firstDay }, (_, index) => (
                    <div
                        key={`empty-${index}`}
                        className={styles.calendarEmpty2}
                    />
                ))}

                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;

                    const dateString = [
                        year,
                        String(month + 1).padStart(2, "0"),
                        String(day).padStart(2, "0"),
                    ].join("-");

                    const hasWorkout = workoutDates.has(dateString);
                    const isToday = dateString === todayString;

                    return (
                        <div
                            key={dateString}
                            className={[
                                styles.calendarDay2,
                                hasWorkout ? styles.gymDay2 : "",
                                isToday ? styles.today2 : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            title={
                                hasWorkout
                                    ? `Workout completed on ${dateString}`
                                    : dateString
                            }
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            <div className={styles.calendarLegend2}>
                <span className={styles.legendGymDay2} />
                Gym day
                <span className={styles.legendToday2} />
                Today
            </div>
        </div>
    );
}

export default WorkoutCalendar;
