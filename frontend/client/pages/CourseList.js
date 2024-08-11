import Header from '../components/Header.js'; // Đảm bảo đã export component Header đúng cách
import { isAuthenticated } from '../utils/auth.js';

export class CourseList {
    constructor() {
        this.container = document.getElementById('app'); // Đảm bảo container này tồn tại trong HTML của bạn
    }

    async fetchCourses() {
        try {
            const response = await fetch('http://localhost:5000/api/courses');
            if (!response.ok) {
                throw new Error('Không thể tải danh sách khóa học');
            }
            const { courses } = await response.json();
            this.renderCourses(courses);
        } catch (error) {
            this.renderError(error.message);
        }
    }

    renderCourses(courses) {
        const searchBarHtml = `
            <div class="search-bar">
                <input type="text" id="search-courses" placeholder="Tìm kiếm khóa học..." class="search-input"/>
            </div>
        `;

        const coursesHtml = courses.map(course => `
            <div class="course-item">
                <img src="${course.image_url}" alt="${course.title}" class="course-image">
                <div class="course-details">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <span>Giá: ${course.regular_price} VND</span>
                    <a href="#/course/${course.course_id}" class="btn view-course-btn">Xem chi tiết</a>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            ${Header()} <!-- Render header -->
            ${searchBarHtml} <!-- Render search bar -->
            <div class="courses-container">${coursesHtml}</div>
        `;

        // Đặt thời gian chờ ngắn để đảm bảo rằng DOM đã được cập nhật
        setTimeout(() => this.addSearchEventListener(courses), 100);
    }

    addSearchEventListener(courses) {
        const searchInput = document.getElementById('search-courses');
        if (searchInput) {
            searchInput.addEventListener('input', event => {
                const searchQuery = event.target.value.toLowerCase();
                const filteredCourses = courses.filter(course =>
                    course.title.toLowerCase().includes(searchQuery)
                );
                this.renderCourses(filteredCourses); // Rerender the courses based on search
            });
        } else {
            console.error('Search input not found');
        }
    }

    renderError(message) {
        this.container.innerHTML = `<p class="error">Lỗi: ${message}</p>`;
    }

    async render() {
        await this.fetchCourses();
    }
}
