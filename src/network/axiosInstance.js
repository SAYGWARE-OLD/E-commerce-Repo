import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://669e08db9a1bda3680051ddb.mockapi.io/api/v1'
});