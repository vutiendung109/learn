import { api } from './api.js';

export async function loginClient(username, password) {
    try {
        const response = await api.login({ username, password });

        // Kiểm tra log của phản hồi từ API
        console.log('API response:', response);

        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('avatarUrl', response.avatarUrl);
            localStorage.setItem('userInfo', JSON.stringify({
                username: response.username,
                email: response.email,
                full_name: response.full_name,
                avatar: response.avatarUrl,
                role: response.role
            }));
            console.log('User Info saved:', localStorage.getItem('userInfo'));
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed, please try again.');
    }
}


export function isAuthenticated() {
    const token = localStorage.getItem('token');
    console.log('Is authenticated:', token !== null);
    return token !== null;
}

export function getUserAvatar() {
    const avatarUrl = localStorage.getItem('avatarUrl') || '/shared/assets/img/default-avatar.png';
    console.log('User Avatar URL:', avatarUrl);
    return avatarUrl;
}

export const getUserInfo = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        console.log('User Info retrieved:', userInfo);
        return userInfo;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error.message);

        // Trả về thông tin mặc định nếu có lỗi
        const defaultUserInfo = {
            username: 'N/A',
            email: 'N/A',
            fullName: 'N/A',
            avatar: '/shared/assets/img/default-avatar.png'
        };
        console.log('Returning default User Info:', defaultUserInfo);
        return defaultUserInfo;
    }
};

export const updateUserInfo = async (updatedInfo) => {
    const currentInfo = await getUserInfo();
    const newInfo = { ...currentInfo, ...updatedInfo };

    if (updatedInfo.password && updatedInfo.password.trim() !== '') {
        newInfo.password = updatedInfo.password;
    } else {
        delete newInfo.password;
    }

    localStorage.setItem('userInfo', JSON.stringify(newInfo));
    console.log('Updated User Info:', newInfo);
    return newInfo;
};

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('userInfo');
    console.log('User logged out and localStorage cleared');
    window.location.href = '/';
}
