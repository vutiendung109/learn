import Header from '../components/Header.js'; // Đảm bảo đã import component Header đúng cách
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
            
            ${searchBarHtml} 
            <div class="courses-container">${coursesHtml}</div>
        `;

        Header(); // Render header ngay sau khi DOM đã được cập nhật

        this.addSearchEventListener(courses); // Gán sự kiện tìm kiếm sau khi DOM đã sẵn sàng
    }

    addSearchEventListener(courses) {
        const searchInput = document.getElementById('search-courses');
        if (searchInput) {
            searchInput.addEventListener('input', event => {
                const searchQuery = event.target.value.toLowerCase();
                const filteredCourses = courses.filter(course =>
                    course.title.toLowerCase().includes(searchQuery)
                );
                this.updateCoursesList(filteredCourses); // Rerender danh sách khoá học theo kết quả tìm kiếm
            });
        } else {
            console.error('Search input not found');
        }
    }

    updateCoursesList(filteredCourses) {
        const coursesHtml = filteredCourses.map(course => `
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

        document.querySelector('.courses-container').innerHTML = coursesHtml;
    }

    renderError(message) {
        this.container.innerHTML = `<p class="error">Lỗi: ${message}</p>`;
    }

    async render() {
        await this.fetchCourses();
    }
}
