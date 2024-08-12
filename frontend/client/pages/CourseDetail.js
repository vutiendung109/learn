import Header from '../components/Header.js';
import { api } from '../utils/api.js';



export class CourseDetail {
    constructor(courseId) {
        this.courseId = courseId;
        this.container = document.getElementById('app'); // Đảm bảo container này tồn tại trong HTML của bạn
    }

    async fetchCourseDetail() {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${this.courseId}`);
            if (!response.ok) {
                throw new Error('Không thể tải chi tiết khóa học');
            }
            const course = await response.json();
            await this.renderCourseDetail(course);
        } catch (error) {
            this.renderError(error.message);
        }
    }

    async fetchCourseSections(courseId) {
        try {
            const sections = await api.getSections(courseId);
            return sections || [];
        } catch (error) {
            console.error('Error loading sections:', error);
            return [];
        }
    }

    async fetchCourseLessons(sectionId) {
        try {
            const lessons = await api.getLessons(sectionId);
            return lessons || [];
        } catch (error) {
            console.error('Error loading lessons:', error);
            return [];
        }
    }

    async renderCourseDetail(course) {
        const sections = await this.fetchCourseSections(course.course_id);
        let sectionsHtml = '';

        for (let section of sections) {
            let lessonsHtml = '';

            sectionsHtml += `
                <div class="section-item">
                    <h3 class="section-title" data-id="${section.section_id}">
                        ${section.order_num}. ${section.title}
                    </h3>
                    <ul class="lesson-list" id="lessons-${section.section_id}">
                        ${lessonsHtml}
                    </ul>
                </div>
            `;
        }

        const courseHtml = `
            <div class="course-detail-container">
                <div class="course-header">
                    <div class="course-description">
                        <h1 class="course-title">${course.title}</h1>
                        <p class="course-info">${course.description}</p>
                        <p class="course-info">
                            Giá: <span class="course-price">${course.regular_price} VND</span>
                        </p>
                        <a href="#!" class="btn buy-btn">Mua khoá học</a>
                    </div>
                    <div class="course-image">
                        <img src="${course.image_url}" alt="${course.title}" />
                    </div>
                </div>
                <div class="course-sections">
                    <h2>Danh sách bài học</h2>
                    ${sectionsHtml}
                </div>
            </div>
        `;

        this.container.innerHTML = courseHtml;

        Header(); // Gọi hàm Header() sau khi DOM đã được cập nhật

        this.addSectionToggleEvents();
    }

    addSectionToggleEvents() {
        document.querySelectorAll('.section-title').forEach(titleElement => {
            titleElement.addEventListener('click', async (e) => {
                const sectionId = e.target.dataset.id;
                const lessonListElement = document.getElementById(`lessons-${sectionId}`);

                if (lessonListElement.style.display === 'none' || lessonListElement.style.display === '') {
                    const lessons = await this.fetchCourseLessons(sectionId);
                    lessonListElement.innerHTML = lessons.map(lesson => `
                        <li class="lesson-item">
                            ${lesson.order_num}. ${lesson.title}
                        </li>
                    `).join('');
                    lessonListElement.style.display = 'block';
                } else {
                    lessonListElement.style.display = 'none';
                }
            });
        });
    }

    renderError(message) {
        this.container.innerHTML = `<p class="error">Lỗi: ${message}</p>`;
    }

    async render() {
        await this.fetchCourseDetail();
    }
}

