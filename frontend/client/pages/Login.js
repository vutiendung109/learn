import { loginClient } from '../utils/auth.js';
import Header from '../components/Header.js'; // Import the Header component

export class Login {
    async render(parent) {
        parent.innerHTML = `
            <div class="login-container">
                <h1>Đăng nhập</h1>
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">Tên người dùng:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn">Đăng nhập</button>
                </form>
                <div id="login-error" class="error-message"></div>
            </div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
    }

    async handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await loginClient(username, password);
            console.log('Login successful:', response);
            Header(); // Re-render the header after successful login
            window.location.hash = '/'; // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
        } catch (error) {
            console.error('Login error:', error);
            document.getElementById('login-error').textContent = error.message || 'Login failed, please try again.';
        }
    }
}
