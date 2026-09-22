import api from "./api";

export const getExercises = async () => {
    const response = await api.get("exercises/exercises/");
    return response.data;
};

export const getExercise = async (id) => {

    const response = await api.get(
        `exercises/exercises/${id}/`
    );

    return response.data;
};

export const getExerciseMuscleGroups = async () => {
    const response = await api.get("exercises/exercisemusclegroups/");
    return response.data;
};

export const getMuscleGroups = async () => {
    const response = await api.get("exercises/musclegroups/");
    return response.data;
};