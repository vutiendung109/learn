import { isAuthenticated, getUserAvatar, logout } from '../utils/auth.js';

const Header = () => {
    const isLoggedIn = isAuthenticated();
    const avatar = getUserAvatar();

    const headerHtml = `
    <header class="header fixed">
        <div class="main-content">
            <div class="body">
                <img src="/client/assets/img/logo.svg" alt="lesson." class="logo" />
                <nav class="nav">
                    <ul>
                        <li><a href="/" data-link>Trang chủ</a></li>
                        <li><a href="#/courses" data-link>Khoá học</a></li>
                        <li><a href="#" data-link>Tin tức</a></li>
                        <li><a href="#" data-link>Về tác giả</a></li>
                    </ul>
                </nav>
                <div class="action">
                    ${isLoggedIn ? `
                        <img src="${avatar}" alt="User Avatar" class="user-avatar" />
                        <button id="logout-btn" class="btn dnbtn">Đăng xuất</button>
                    ` : `
                        <a href="/register" class="btn dkbtn" data-link>Đăng ký</a>
                        <a href="/login" class="btn dnbtn" data-link id="login-btn">Đăng nhập</a>
                    `}
                </div>
            </div>
        </div>
    </header>
    `;

    // Chèn HTML của header vào DOM
    document.getElementById('main-header').innerHTML = headerHtml;

    // Thêm sự kiện cho nút logout nếu có
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            Header(); // Re-render header after logout
        });
    }

    // Xử lý sự kiện nút đăng nhập nếu có
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '/login';
        });
    }
};

// Export mặc định là hàm Header để được gọi nơi khác
export default Header;
