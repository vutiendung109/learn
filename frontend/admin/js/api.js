const API_BASE_URL = 'http://localhost:5000/api/admin';

export async function fetchData(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export const api = {
    getUsers: () => fetchData('/users'),
    getUser: (userId) => fetchData(`/users/${userId}`), // Thêm API để lấy thông tin người dùng
    createUser: (data) => fetchData('/users', 'POST', data),
    updateUser: (userId, data) => fetchData(`/users/${userId}`, 'PUT', data),
    deleteUser: (userId) => fetchData(`/users/${userId}`, 'DELETE'),
};

