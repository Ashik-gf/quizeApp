import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        // add a request interseptor
        const requestInterseptor = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config;
            },
            (error) => Promise.reject(error)
        )
        // add response interseptor
        const responseInterseptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = auth?.refreshToken;
                        const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/refresh-token`, { refreshToken })
                        const { accessToken } = response.data.data;
                        console.log(`new token ${accessToken}`);
                        setAuth({ ...auth, accessToken })
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`
                        return axios(originalRequest)
                    } catch (error) {
                        throw error
                        console.log(error);
                    }
                }
                return Promise.reject(error)
            }
        )
        // return () => {
        //     api.interceptors.request.eject(requestInterseptor)
        //     api.interceptors.response.eject(responseInterseptor)
        // }
        return () => {
            api.interceptors.request.eject(requestInterseptor); // Corrected typo
            api.interceptors.response.eject(responseInterseptor);
        }
    }, [auth.accessToken])
    return { api }
}

export default useAxios;