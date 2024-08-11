// import { isAuthenticated, getUserAvatar, logout } from '../utils/auth.js';

const Header = () => {
    const isLoggedIn = isAuthenticated();
    const avatar = getUserAvatar();

    return `
    <header class="header fixed">
        <div class="main-content">
            <div class="body">
                <img src="./assets/img/logo.svg" alt="lesson." class="logo" />
                <nav class="nav">
                    <ul>
                        <li><a href="/" data-link>Trang chủ</a></li>
                        <li><a href="/courses" data-link>Khoá học</a></li>
                        <li><a href="/news" data-link>Tin tức</a></li>
                        <li><a href="/about" data-link>Về tác giả</a></li>
                    </ul>
                </nav>
                <div class="action">
                    ${isLoggedIn ? `
                        <img src="${avatar}" alt="User Avatar" class="user-avatar" />
                        <button id="logout-btn" class="btn dnbtn">Đăng xuất</button>
                    ` : `
                        <a href="/register" class="btn dkbtn" data-link>Đăng ký</a>
                        <a href="/login" class="btn dnbtn" data-link>Đăng nhập</a>
                    `}
                </div>
            </div>
        </div>
    </header>
    `;
};

export default Header;

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            window.location.href = '/';
        });
    }
});
