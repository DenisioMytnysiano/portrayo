import apiClient from '../utils/client';
import TokenStorage from '../stores/token.store';

export const AuthService = {
    async login(username, password) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await apiClient.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;
        TokenStorage.setTokens(access_token, refresh_token);
    },

    async register(userData) {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },

    async refreshToken() {
        const refreshToken = TokenStorage.getRefreshToken();
        const response = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });

        const { access_token, refresh_token } = response.data;
        TokenStorage.setTokens(access_token, refresh_token);

        return response.data;
    },

    logout() {
        TokenStorage.clearTokens();
    },

    async me(){
        if(this.isLoggedIn()){
            const response = await apiClient.get('/auth/me')
            return response.data;
        }
    },

    isLoggedIn() {
        const accessToken = TokenStorage.getAccessToken();
        if (!accessToken) {
            return false;
        }
        try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    },
};
