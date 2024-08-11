export class Login {
    async render(parent) {
        parent.innerHTML = `
            <div class="login-container">
                <h1>Đăng nhập</h1>
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
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
        document.getElementById('login-form').addEventListener('submit', this.handleLogin);
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.hash = '/'; // Chuyển hướng đến trang profile sau khi đăng nhập thành công
        } catch (error) {
            document.getElementById('login-error').textContent = error.message;
        }
    }
}
