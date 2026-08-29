import api from "./api";

export const getWeightLogs = async () => {
    const response = await api.get("/progress/weightlogs/");
    return response.data;
};

export const createWeightLog = async (weightLog) => {
    const response = await api.post(
        "progress/weightlogs/",
        weightLog
    );

    return response.data;
};