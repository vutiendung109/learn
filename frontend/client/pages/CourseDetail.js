import Header from '../components/Header.js'; // Đảm bảo đã export component Header đúng cách

export class CourseDetail {
    constructor(courseId) {
        this.courseId = courseId;
        this.container = document.getElementById('app'); // Đảm bảo container này tồn tại trong HTML của bạn
    }

    async fetchCourseDetail() {
        try {
            const url = `http://localhost:5000/api/courses/${this.courseId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Không thể tải chi tiết khóa học');
            }
            const course = await response.json();
            this.renderCourseDetail(course);
        } catch (error) {
            this.renderError(error.message);
        }
    }

    renderCourseDetail(course) {
        const courseHtml = `
            <div class="course-detail">
                <div class="course-image">
                    <img src="${course.image_url}" alt="${course.title}" />
                </div>
                <div class="course-description">
                    <h1 class="course-title">${course.title}</h1>
                    <p class="course-info">${course.description}</p>
                    <p class="course-info">
                        Giá: <span class="course-price">${course.regular_price} VND</span>
                    </p>
                    <a href="#!" class="btn buy-btn">Mua khoá học</a>
                </div>
            </div>
        `;
        this.container.innerHTML = `${Header()}<div class="course-detail-container">${courseHtml}</div>`;
    }

    renderError(message) {
        this.container.innerHTML = `<p class="error">Lỗi: ${message}</p>`;
    }

    async render() {
        await this.fetchCourseDetail();
    }
}
