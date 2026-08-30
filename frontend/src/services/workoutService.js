import api from "./api";

export const getWorkoutPlans = async () => {
    const response = await api.get(
        "workouts/workoutplans/"
    );

    return response.data;
};