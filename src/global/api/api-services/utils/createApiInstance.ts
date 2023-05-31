import axios, {AxiosInstance, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig} from 'axios';

export default function createApiInstance(API_URL: string): AxiosInstance {
    const instanceConfig: CreateAxiosDefaults = {
        // withCredentials: true,
        baseURL: API_URL
    };

    const apiInstance: AxiosInstance = axios.create(instanceConfig);

    apiInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const access_token: string | null = localStorage.getItem('access_token');

            if (access_token !== null) {
                config.headers.Authorization = `Bearer_${access_token}`;
            }

            return config;
        }
    );

    apiInstance.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 403 && error.config && !error.config._isRetry) {
                originalRequest._isRetry = true;

                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_USERS_URL}/users/refresh`, {
                        refreshToken: localStorage.getItem('refresh_token')
                    }, {
                        withCredentials: true
                    });

                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);

                    return apiInstance.request(originalRequest);
                } catch (error) {
                    console.log('Не авторизован');
                }
            }

            throw error;
        }
    );

    return apiInstance;
}