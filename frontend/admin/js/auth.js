import { api } from './api.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await api.login({ username, password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('userRole', response.role);
            window.location.href = '/admin/index.html';
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const full_name = document.getElementById('full_name').value;
        try {
            await api.register({ username, email, password, full_name });
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    });
}

//2 hàm này chưa chạy
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}