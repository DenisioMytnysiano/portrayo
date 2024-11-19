import TokenStorage from '../stores/token.store';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const publicRoutes = ['/auth/login', '/auth/register'];

    if (publicRoutes.includes(config.url || '')) {
        return config;
    }

    const accessToken = TokenStorage.getAccessToken();
    const refreshToken = TokenStorage.getRefreshToken();

    if (TokenStorage.isTokenExpired(accessToken)) {
        try {
            const response = await axios.post('/api/v1/auth/refresh', {
                refresh_token: refreshToken
            });
            TokenStorage.setTokens(
                response.data.access_token,
                response.data.refresh_token
            );

            config.headers.Authorization = `Bearer ${response.data.access_token}`;
        } catch (error) {
            TokenStorage.clearTokens();
            window.location.href = '/login';
            return Promise.reject(error);
        }
    } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
