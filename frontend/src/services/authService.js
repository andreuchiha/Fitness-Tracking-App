import api from "./api";

// functions to handle user login, registration and refresh token.

export const loginUser = async (username, password) => {
    const response = await api.post("accounts/login/", {username, password});
    
    return response.data;
};

export const registerUser = async (username, email, password) => {
    const response = await api.post("accounts/register/", {username, email, password});
    
    return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await api.post("accounts/token/refresh/", {refresh: refreshToken})

    return response.data;
};