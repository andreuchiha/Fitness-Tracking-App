import api from "./api";

export const getWorkoutPlans = async () => {
    const response = await api.get(
        "workouts/workoutplans/"
    );

    return response.data;
};

export const getWorkoutPlan = async (id) => {
    const response = await api.get(`workouts/workoutplans/${id}/`);
    return response.data;
};

export const createWorkoutPlan = async (workoutPlan) => {
    const response = await api.post("workouts/workoutplans/", workoutPlan);
    return response.data;
};

export const getWorkoutPlanExercises = async () => {
    const response = await api.get("workouts/workoutplanexercises/");
    return response.data;
};

export const createWorkoutPlanExercise = async (workoutPlanExercise) => {
    const response = await api.post(
        "workouts/workoutplanexercises/",
        workoutPlanExercise
    );

    return response.data;
};

export const deleteWorkoutPlanExercise = async (id) => {
    const response = await api.delete(
        `workouts/workoutplanexercises/${id}/`
    );
    return response.data;
}

export const deleteWorkoutPlan = async (id) => {
    const response = await api.delete(
        `workouts/workoutplans/${id}/`
    );
    return response.data;
}

export const createWorkoutSession = async (workoutSession) => {
    const response = await api.post(
        "workouts/workoutsessions/",
        workoutSession
    );
    return response.data;
}