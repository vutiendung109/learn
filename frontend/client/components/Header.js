// import { isAuthenticated, getUserAvatar, logout } from '../utils/auth.js';

// const Header = () => {
//     const isLoggedIn = isAuthenticated();
//     const avatar = getUserAvatar();

//     const headerHtml = `
//     <header class="header fixed">
//         <div class="main-content">
//             <div class="body">
//                 <img src="/client/assets/img/logo.svg" alt="lesson." class="logo" />
//                 <nav class="nav">
//                     <ul>
//                         <li><a href="/" data-link>Trang chủ</a></li>
//                         <li><a href="#/courses" data-link>Khoá học</a></li>
//                         <li><a href="#" data-link>Tin tức</a></li>
//                         <li><a href="#" data-link>Về tác giả</a></li>
//                     </ul>
//                 </nav>
//                 <div class="action">
//                     ${isLoggedIn ? `
//                         <img src="${avatar}" alt="User Avatar" class="user-avatar" />
//                         <button id="logout-btn" class="btn dnbtn">Đăng xuất</button>
//                     ` : `
//                         <a href="/register" class="btn dkbtn" data-link>Đăng ký</a>
//                         <a href="/login" class="btn dnbtn" data-link id="login-btn">Đăng nhập</a>
//                     `}
//                 </div>
//             </div>
//         </div>
//     </header>
//     `;

//     // Chèn HTML của header vào DOM
//     document.getElementById('main-header').innerHTML = headerHtml;

//     // Thêm sự kiện cho nút logout nếu có
//     const logoutBtn = document.getElementById('logout-btn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', () => {
//             logout();
//             Header(); // Re-render header after logout
//         });
//     }

//     // Xử lý sự kiện nút đăng nhập nếu có
//     const loginBtn = document.getElementById('login-btn');
//     if (loginBtn) {
//         loginBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             window.location.hash = '/login';
//         });
//     }
// };

// // Export mặc định là hàm Header để được gọi nơi khác
// export default Header;


// import { isAuthenticated, getUserAvatar, getUserInfo, logout } from '../utils/auth.js';

// const Header = () => {
//     const isLoggedIn = isAuthenticated();
//     const avatar = getUserAvatar();
//     const userInfo = getUserInfo(); // Lấy thông tin người dùng

//     const headerHtml = `
//     <header class="header fixed">
//         <div class="main-content">
//             <div class="body">
//                 <img src="/client/assets/img/logo.svg" alt="lesson." class="logo" />
//                 <nav class="nav">
//                     <ul>
//                         <li><a href="/" data-link>Trang chủ</a></li>
//                         <li><a href="#/courses" data-link>Khoá học</a></li>
//                         <li><a href="#" data-link>Tin tức</a></li>
//                         <li><a href="#" data-link>Về tác giả</a></li>
//                     </ul>
//                 </nav>
//                 <div class="action">
//                     ${isLoggedIn ? `
//                         <img src="${avatar}" alt="User Avatar" class="user-avatar" id="user-avatar" />
//                         <button id="logout-btn" class="btn dnbtn">Đăng xuất</button>
//                     ` : `
//                         <a href="/register" class="btn dkbtn" data-link>Đăng ký</a>
//                         <a href="/login" class="btn dnbtn" data-link id="login-btn">Đăng nhập</a>
//                     `}
//                 </div>
//             </div>
//         </div>
//     </header>

//     <!-- Modal thông tin người dùng -->
//     <div id="user-info-modal" class="modal">
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h2>Thông tin người dùng</h2>
//             <p><strong>Tên người dùng:</strong> ${userInfo ? userInfo.username : ''}</p>
//             <p><strong>Email:</strong> ${userInfo ? userInfo.email : ''}</p>
//             <p><strong>Vai trò:</strong> ${userInfo ? userInfo.role : ''}</p>
//             <button id="update-info-btn" class="btn">Cập nhật thông tin</button>
//         </div>
//     </div>
//     `;

//     // Chèn HTML của header vào DOM
//     document.getElementById('main-header').innerHTML = headerHtml;

//     // Thêm sự kiện cho nút logout nếu có
//     const logoutBtn = document.getElementById('logout-btn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', () => {
//             logout();
//             Header(); // Re-render header after logout
//         });
//     }

//     // Xử lý sự kiện nút đăng nhập nếu có
//     const loginBtn = document.getElementById('login-btn');
//     if (loginBtn) {
//         loginBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             window.location.hash = '/login';
//         });
//     }

//     // Xử lý sự kiện nhấn vào avatar để mở modal
//     const avatarImg = document.getElementById('user-avatar');
//     const modal = document.getElementById('user-info-modal');
//     const closeModal = document.querySelector('.modal .close');

//     if (avatarImg) {
//         avatarImg.addEventListener('click', () => {
//             modal.style.display = 'block';
//         });
//     }

//     if (closeModal) {
//         closeModal.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });
//     }

//     // Đóng modal khi nhấn vào bất kỳ đâu ngoài modal
//     window.addEventListener('click', (event) => {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
// };

// export default Header;

import { isAuthenticated, getUserAvatar, logout } from '../utils/auth.js';
import { getUserInfo } from '../pages/Profile.js'; // Giả sử hàm này lấy thông tin người dùng

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
                            <img src="${avatar}" alt="User Avatar" class="user-avatar" id="user-avatar" />
                            <button id="logout-btn" class="btn dnbtn">Đăng xuất</button>
                        ` : `
                            <a href="#/register" class="btn dkbtn" data-link id="register-btn">Đăng ký</a>
                            <a href="#/login" class="btn dnbtn" data-link id="login-btn">Đăng nhập</a>
                        `}
                    </div>
                </div>
            </div>
        </header>
        
        ${isLoggedIn ? `
            <div id="user-modal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Thông tin người dùng</h2>
                    <div id="user-info">
                        <!-- Thông tin người dùng sẽ được điền động sau khi nhấn vào avatar -->
                    </div>
                    <form id="update-user-form">
                        <input type="text" id="update-name" placeholder="Họ tên" required>
                        <input type="email" id="update-email" placeholder="Email" required>
                        <input type="password" id="update-password" placeholder="Mật khẩu mới (để trống nếu không đổi)">
                        <button type="submit" class="btn">Cập nhật thông tin</button>
                    </form>
                    <p id="update-message"></p>
                </div>
            </div>
        ` : ''}
    `;

    const headerContainer = document.getElementById('main-header');
    if (headerContainer) {
        headerContainer.innerHTML = headerHtml;
    } else {
        console.error('Không tìm thấy phần tử với id "main-header"');
        return;
    }

    const setupEventListeners = () => {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                logout();
                Header(); // Tải lại header sau khi logout
            });
        }

        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '/login';
            });
        }

        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '/register';
            });
        }

        if (isLoggedIn) {
            const userAvatar = document.getElementById('user-avatar');
            const userModal = document.getElementById('user-modal');
            const closeModal = userModal ? userModal.querySelector('.close') : null;
            const updateForm = document.getElementById('update-user-form');
            const updateMessage = document.getElementById('update-message');

            if (userAvatar && userModal) {
                userAvatar.addEventListener('click', async () => {
                    try {
                        const userInfo = await getUserInfo(); // Lấy thông tin người dùng
                        const userInfoHtml = `
                            <p><strong>Tên đăng nhập:</strong> ${userInfo.username}</p>
                            <p><strong>Email:</strong> ${userInfo.email}</p>
                            <p><strong>Họ tên:</strong> ${userInfo.full_name}</p>
                            <p><strong>Ảnh đại diện:</strong> <img src="${userInfo.avatar}" alt="Avatar" width="50"/></p>
                        `;
                        document.getElementById('user-info').innerHTML = userInfoHtml;
                        userModal.style.display = 'block';
                    } catch (error) {
                        console.error('Failed to load user information:', error);
                    }
                });
            }

            if (closeModal) {
                closeModal.addEventListener('click', () => {
                    userModal.style.display = 'none';
                });
            }

            if (userModal) {
                window.addEventListener('click', (event) => {
                    if (event.target === userModal) {
                        userModal.style.display = 'none';
                    }
                });
            }

            if (updateForm) {
                updateForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const name = document.getElementById('update-name').value;
                    const email = document.getElementById('update-email').value;
                    const password = document.getElementById('update-password').value;

                    try {
                        // Giả sử bạn có một hàm updateUser trong Profile.js để xử lý việc cập nhật thông tin
                        await updateUser({ full_name: name, email, password });
                        if (updateMessage) {
                            updateMessage.textContent = 'Thông tin đã được cập nhật thành công!';
                            updateMessage.style.color = 'green';
                        }
                    } catch (error) {
                        if (updateMessage) {
                            updateMessage.textContent = 'Cập nhật thông tin thất bại, vui lòng thử lại.';
                            updateMessage.style.color = 'red';
                        }
                    }
                });
            }
        }
    };

    setupEventListeners();
};

export default Header;
