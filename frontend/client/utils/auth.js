import { api } from './api.js';

export async function loginClient(username, password) {
    try {
        const response = await api.post('/auth/login', { username, password });

        if (response.token && response.avatarUrl) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('avatarUrl', response.avatarUrl);
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed, please try again.');
    }
}

export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

export function getUserAvatar() {
    return localStorage.getItem('avatarUrl') || './assets/img/default-avatar.png';
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('avatarUrl');
}
