import { api } from '../utils/api.js'; // Đảm bảo đường dẫn đúng

export class CourseLearning {
    constructor(courseId) {
        this.courseId = courseId;
        this.container = document.getElementById('app');
    }

    async loadCourseContent() {
        await this.fetchCourseContent();
    }

    async fetchCourseContent() {
        try {
            console.log(`Fetching course content for courseId: ${this.courseId}`);
            const course = await api.getCourse(this.courseId);
            console.log('Course data:', course);

            const sections = await api.getSections(this.courseId);
            console.log('Sections data:', sections);

            // Kiểm tra nếu không có lessons trong section, thì gọi API để lấy lessons riêng.
            for (let section of sections) {
                if (!section.lessons || !Array.isArray(section.lessons)) {
                    // Giả sử bạn có API riêng để lấy danh sách lessons
                    const lessons = await api.getLessons(section.section_id);
                    console.log('Lessons data:', lessons); // Kiểm tra dữ liệu lessons
                    section.lessons = lessons;
                }
            }

            this.renderCourseContent(course, sections);
        } catch (error) {
            console.error('Error fetching course content:', error);
            this.renderError('Không thể tải nội dung khóa học.');
        }
    }

    renderCourseContent(course, sections) {
        let sectionsHtml = '';
    
        sections.forEach(section => {
            let lessonsHtml = '';
    
            if (Array.isArray(section.lessons)) {
                section.lessons.forEach(lesson => {
                    lessonsHtml += `
                        <li class="lesson-item" data-lesson-id="${lesson.lesson_id}" style="cursor: pointer;">
                            ${lesson.order_num}. ${lesson.title}
                        </li>
                    `;
                });
            } else {
                console.error('Expected section.lessons to be an array', section.lessons);
            }
    
            sectionsHtml += `
                <div class="section-item">
                    <h3 class="section-title" data-section-id="${section.section_id}">${section.order_num}. ${section.title}</h3>
                    <ul class="lesson-list" style="display: none;">
                        ${lessonsHtml}
                    </ul>
                </div>
            `;
        });
    
        const courseHtml = `
            <div class="course-learning-container">
                <div class="video-container">
                    <video id="course-video" controls>
                        <source src="" type="video/mp4">
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                    <div class="sidebar-toggle" id="toggle-sidebar-btn">⮜</div>
                </div>
                <div class="sidebar" id="sidebar">
                    <div class="sections">
                        ${sectionsHtml}
                    </div>
                </div>
            </div>
        `;
    
        this.container.innerHTML = courseHtml;
    
        this.addEventListeners();
    }
    
    addEventListeners() {
        const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
        const sidebar = document.getElementById('sidebar');
        
        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
                toggleSidebarBtn.textContent = sidebar.classList.contains('hidden') ? '⮞' : '⮜';
            });
        }
    
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles) {
            sectionTitles.forEach(titleElement => {
                titleElement.addEventListener('click', this.toggleLessons);
            });
        }
    
        const lessonItems = document.querySelectorAll('.lesson-item');
        if (lessonItems) {
            lessonItems.forEach(lessonItem => {
                lessonItem.addEventListener('click', (event) => this.playLesson(event.target.dataset.lessonId));
            });
        }
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('toggle-sidebar-btn');
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
            toggleBtn.textContent = 'Ẩn mục lục';
        } else {
            sidebar.style.display = 'none';
            toggleBtn.textContent = 'Hiện mục lục';
        }
    }

    toggleLessons = async (event) => {
        const sectionElement = event.target.nextElementSibling;
        const sectionId = event.target.dataset.sectionId;
    
        if (sectionElement.style.display === 'none' || sectionElement.style.display === '') {
            try {
                // Gọi API để lấy danh sách bài học cho phần này
                const lessons = await api.getLessons(sectionId);
                
                let lessonsHtml = '';
                lessons.forEach(lesson => {
                    lessonsHtml += `
                        <li class="lesson-item" data-lesson-id="${lesson.lesson_id}" style="cursor: pointer;">
                            ${lesson.order_num}. ${lesson.title}
                        </li>
                    `;
                });
                
                sectionElement.innerHTML = lessonsHtml;
                sectionElement.style.display = 'block';
        
                // Thêm event listener cho mỗi bài học sau khi chúng được thêm vào DOM
                document.querySelectorAll('.lesson-item').forEach(lessonItem => {
                    lessonItem.addEventListener('click', (event) => this.playLesson(event.target.dataset.lessonId));
                });
        
            } catch (error) {
                console.error('Không thể tải danh sách bài học:', error);
            }
        } else {
            sectionElement.style.display = 'none';
        }
    }
    
    async playLesson(lessonId) {
        try {
            const lesson = await api.getLesson(lessonId);
            const videoElement = document.getElementById('course-video');
    
            // Đặt URL của video trước
            videoElement.src = lesson.video_url;
    
            // Đảm bảo rằng video đã sẵn sàng để phát
            videoElement.load();
    
            // Đợi đến khi video có thể phát được rồi mới phát
            videoElement.addEventListener('canplay', () => {
                videoElement.play().catch(error => {
                    console.error('Error attempting to play video:', error);
                });
            });
    
        } catch (error) {
            console.error('Không thể tải video bài học:', error);
        }
    }
    

    renderError(message) {
        this.container.innerHTML = `<p class="error">${message}</p>`;
    }

    async render() {
        await this.loadCourseContent();
    }
}
