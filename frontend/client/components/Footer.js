import { isAuthenticated } from '../utils/auth.js';

const Footer = () => {
    const isLoggedIn = isAuthenticated();

    const footerHtml = `
        <footer class="footer fixed">
            <div class="main-content">
                <div class="body">
                    <div class="footer-info">
                        <p><strong>Tác giả:</strong> Vũ Tiến Dũng</p>
                        <p><strong>Trường:</strong> Đại Học Xây Dựng</p>
                        <p><strong>SĐT:</strong> 0968769502</p>
                        <p><strong>Email:</strong> <a href="mailto:dungvutien62@gmail.com">dungvutien62@gmail.com</a></p>
                        <p><strong>Facebook:</strong> <a href="https://www.facebook.com/yourfacebookprofile" target="_blank">Facebook của tôi</a></p>
                    </div>
                </div>
            </div>
        </footer>
    `;

    const footerContainer = document.getElementById('main-footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    } else {
        console.error('Không tìm thấy phần tử với id "main-footer"');
    }
};

export default Footer;
