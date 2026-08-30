import api from "./api";

export const createFoodLog = async (foodLog) => {
    const response = await api.post(
        "nutrition/foodlogs/",
        foodLog
    );

    return response.data;
};

export const getFoodLogs = async () => {
    const response = await api.get(
        "nutrition/foodlogs/"
    );

    return response.data;
};