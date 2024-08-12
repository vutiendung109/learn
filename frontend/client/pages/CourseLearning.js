export class CourseLearning {
    constructor(courseId) {
        this.courseId = courseId;
        this.container = document.getElementById('app');
    }

    async fetchCourseContent() {
        try {
            const course = await api.getCourse(this.courseId);
            const sections = await api.getSections(this.courseId);
            this.renderCourseContent(course, sections);
        } catch (error) {
            this.renderError('Không thể tải nội dung khóa học.');
        }
    }

    renderCourseContent(course, sections) {
        let sectionsHtml = '';

        sections.forEach(section => {
            let lessonsHtml = '';
            section.lessons.forEach(lesson => {
                lessonsHtml += `
                    <li class="lesson-item" data-lesson-id="${lesson.lesson_id}">
                        ${lesson.order_num}. ${lesson.title}
                    </li>
                `;
            });

            sectionsHtml += `
                <div class="section-item">
                    <h3 class="section-title">${section.order_num}. ${section.title}</h3>
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
                    <div class="video-controls">
                        <button id="play-pause-btn">Phát/Dừng</button>
                        <button id="speed-btn">Tốc độ: 1x</button>
                    </div>
                </div>
                <div class="sidebar" id="sidebar">
                    <div class="sidebar-toggle">
                        <button id="toggle-sidebar-btn">Ẩn mục lục</button>
                    </div>
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
        document.getElementById('toggle-sidebar-btn').addEventListener('click', this.toggleSidebar);
        document.getElementById('play-pause-btn').addEventListener('click', this.togglePlayPause);
        document.getElementById('speed-btn').addEventListener('click', this.toggleSpeed);

        document.querySelectorAll('.section-title').forEach(titleElement => {
            titleElement.addEventListener('click', this.toggleLessons);
        });

        document.querySelectorAll('.lesson-item').forEach(lessonItem => {
            lessonItem.addEventListener('click', (event) => this.playLesson(event.target.dataset.lessonId));
        });
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

    togglePlayPause() {
        const video = document.getElementById('course-video');
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Dừng';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Phát';
        }
    }

    toggleSpeed() {
        const video = document.getElementById('course-video');
        const speedBtn = document.getElementById('speed-btn');
        if (video.playbackRate === 1) {
            video.playbackRate = 1.5;
            speedBtn.textContent = 'Tốc độ: 1.5x';
        } else if (video.playbackRate === 1.5) {
            video.playbackRate = 2;
            speedBtn.textContent = 'Tốc độ: 2x';
        } else {
            video.playbackRate = 1;
            speedBtn.textContent = 'Tốc độ: 1x';
        }
    }

    toggleLessons(event) {
        const sectionElement = event.target.nextElementSibling;
        if (sectionElement.style.display === 'none') {
            sectionElement.style.display = 'block';
        } else {
            sectionElement.style.display = 'none';
        }
    }

    async playLesson(lessonId) {
        try {
            const lesson = await api.getLesson(lessonId);
            const videoElement = document.getElementById('course-video');
            videoElement.src = lesson.video_url;
            videoElement.play();
        } catch (error) {
            console.error('Không thể tải video bài học:', error);
        }
    }

    renderError(message) {
        this.container.innerHTML = `<p class="error">${message}</p>`;
    }

    async render() {
        await this.fetchCourseContent();
    }
}
