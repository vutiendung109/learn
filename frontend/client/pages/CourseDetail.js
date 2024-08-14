import Header from '../components/Header.js';
import { api } from '../utils/api.js';

export class CourseDetail {
    constructor(courseId) {
        this.courseId = courseId;
        this.container = document.getElementById('app');
    }

    async fetchCourseDetail() {
        try {
            const course = await api.getCourse(this.courseId);
            console.log('Course data:', course); // Log dữ liệu khóa học
            await this.renderCourseDetail(course);
        } catch (error) {
            console.error('Error fetching course detail:', error);
            this.renderError(error.message);
        }
    }

    async fetchCourseSections(courseId) {
        try {
            return await api.getSections(courseId);
        } catch (error) {
            console.error('Error loading sections:', error);
            return [];
        }
    }

    async fetchCourseLessons(sectionId) {
        try {
            return await api.getLessons(sectionId);
        } catch (error) {
            console.error('Error loading lessons:', error);
            return [];
        }
    }

    async renderCourseDetail(course) {
        try {
            const sections = await this.fetchCourseSections(course.course_id);
            console.log('Sections:', sections);
            let sectionsHtml = '';
    
            for (let section of sections) {
                sectionsHtml += `
                    <div class="section-item">
                        <h3 class="section-title" data-id="${section.section_id}">
                            ${section.order_num}. ${section.title}
                        </h3>
                        <ul class="lesson-list" id="lessons-${section.section_id}"></ul>
                    </div>
                `;
            }
    
            // Lấy userId từ localStorage hoặc sessionStorage
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
            
            // Kiểm tra quyền xem khóa học
            const { hasPermission } = await api.hasPermission(userId, course.course_id);
            console.log('Has permission:', hasPermission);
    
            const courseHtml = `
            <div class="course-detail-container">
                <div class="course-header">
                    <div class="course-description">
                        <h1 class="course-title">${course.title}</h1>
                        <p class="course-info">${course.description}</p>
                        <p class="course-info">
                            Giá: <span class="course-price">${course.regular_price} VND</span>
                        </p>
                        ${hasPermission 
                            ? `<a href="#/course/${course.course_id}/view" class="btn view-now-btn">Xem ngay</a>`  // Thay đổi href để chuyển hướng đúng route
                            : `<a href="#/payment?courseId=${course.course_id}" class="btn buy-btn">Mua khoá học</a>`                        }
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
    
            Header();
    
            this.addSectionToggleEvents();
        } catch (error) {
            console.error('Error rendering course detail:', error);
            this.renderError('Có lỗi xảy ra khi hiển thị chi tiết khóa học');
        }
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
