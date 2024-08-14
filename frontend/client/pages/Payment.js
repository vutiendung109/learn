import Header from '../components/Header.js';
import { api } from '../utils/api.js';

export class Payment {
    constructor() {
        this.courseId = this.getCourseIdFromUrl();
        console.log('CourseId from URL:', this.courseId);
        this.container = document.getElementById('app');
    }

    getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        return urlParams.get('courseId');
    }

    async fetchCourseDetail() {
        try {
            if (!this.courseId) {
                throw new Error('Không có courseId được cung cấp.');
            }
            const course = await api.getCourse(this.courseId);
            this.renderPaymentPage(course);
        } catch (error) {
            console.error('Lỗi khi tải thông tin khóa học:', error);
            this.renderError(error.message || 'Không thể tải thông tin khóa học. Vui lòng thử lại sau.');
        }
    }

    renderPaymentPage(course) {
        const paymentHtml = `
            <div class="payment-container">
                <div class="course-info">
                    <h1 class="course-title">${course.title}</h1>
                    <p class="course-description">${course.description}</p>
                    <p class="course-price">Giá: ${course.regular_price} VND</p>
                </div>
                <div class="qr-code">
                    <img src="/client/assets/img/qr.jpg" alt="QR Code Thanh Toán" />
                </div>
                <a class="payment-instruction" href="https://facebook.com">Sau khi thanh toán xong, vui lòng liên hệ với chúng tôi qua Facebook để xác nhận.</a>
            </div>
        `;

        this.container.innerHTML = paymentHtml;
        Header(); // Hiển thị header trên trang
    }

    renderError(message) {
        this.container.innerHTML = `
            <div class="error-container">
                <p class="error">${message}</p>
                <button onclick="window.history.back()">Quay lại</button>
            </div>
        `;
    }

    async render() {
        if (!this.courseId) {
            this.renderError('Không có thông tin khóa học hợp lệ. Vui lòng chọn một khóa học trước khi thanh toán.');
            return;
        }
        await this.fetchCourseDetail();
    }
}