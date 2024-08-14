import { api } from '../utils/api.js';

export class Register {
    async render(parent) {
        parent.innerHTML = `
            <div class="register-container">
                <h1>Đăng ký</h1>
                <form id="register-form">
                    <div class="form-group">
                        <label for="username">Tên người dùng:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="full_name">Họ tên:</label>
                        <input type="text" id="full_name" name="full_name" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn">Đăng ký</button>
                </form>
                <div id="register-error" class="error-message"></div>
            </div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('register-form').addEventListener('submit', this.handleRegister.bind(this));
    }

    async handleRegister(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const full_name = document.getElementById('full_name').value;
        const password = document.getElementById('password').value;

        try {
            const response = await api.register({ username, email, full_name, password });
            console.log('Register successful:', response);
            window.location.hash = '/login'; // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        } catch (error) {
            console.error('Register error:', error);
            document.getElementById('register-error').textContent = error.message || 'Đăng ký không thành công, vui lòng thử lại.';
        }
    }
}
