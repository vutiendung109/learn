const API_URL = 'http://localhost:5000/api';

export const api = {
    get: async (endpoint) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },
    post: async (endpoint, data) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },
    // Thêm các phương thức khác như put, delete nếu cần
};
