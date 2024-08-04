import { api } from './api.js';

export async function loadLessons(sectionId) {
    try {
        const lessons = await api.getLessons(sectionId);
        const sectionContent = document.querySelector(`.section[data-id="${sectionId}"] .section-content`);
        sectionContent.innerHTML = lessons.map(lesson => `
            <div class="lesson" data-id="${lesson.lesson_id}">
                <div class="lesson-header">
                    <span class="lesson-order">${lesson.order_num}.</span>
                    <span class="lesson-title">${lesson.title}</span>
                    <div class="lesson-actions">
                        <button class="btn edit-lesson-btn">Edit</button>
                        <button class="btn delete-lesson-btn">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        addLessonEventListeners();
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
}

function addLessonEventListeners() {
    document.querySelectorAll('.edit-lesson-btn').forEach(btn => {
        btn.removeEventListener('click', editLessonHandler);
        btn.addEventListener('click', editLessonHandler);
    });
    document.querySelectorAll('.delete-lesson-btn').forEach(btn => {
        btn.removeEventListener('click', deleteLessonHandler);
        btn.addEventListener('click', deleteLessonHandler);
    });
}

function editLessonHandler(e) {
    const lessonId = e.target.closest('.lesson').dataset.id;
    openLessonModal(lessonId);
}

function deleteLessonHandler(e) {
    e.stopPropagation();
    const lessonId = e.target.closest('.lesson').dataset.id;
    deleteLesson(lessonId);
}

async function deleteLesson(lessonId) {
    if (confirm('Are you sure you want to delete this lesson?')) {
        try {
            await api.deleteLesson(lessonId);
            const sectionId = document.querySelector('.section.expanded').dataset.id;
            loadLessons(sectionId);
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    }
}

export function openLessonModal(lessonId = null, sectionId = null) {
    const modal = document.getElementById('lesson-modal');
    const form = document.getElementById('lesson-form');
    const title = document.getElementById('lesson-modal-title');

    form.reset();
    form.dataset.id = lessonId || '';
    form.dataset.sectionId = sectionId || '';
    title.textContent = lessonId ? 'Edit Lesson' : 'Add New Lesson';

    if (lessonId) {
        api.getLesson(lessonId).then(lesson => {
            document.getElementById('lessonTitle').value = lesson.title;
            document.getElementById('lessonSummary').value = lesson.summary;
            document.getElementById('lessonVideoUrl').value = lesson.video_url;
            document.getElementById('lessonOrder').value = lesson.order_num;
        }).catch(error => console.error('Error loading lesson data:', error));
    }

    modal.style.display = 'flex';
}

export async function saveLesson() {
    const form = document.getElementById('lesson-form');
    const lessonId = form.dataset.id;
    const sectionId = form.dataset.sectionId || document.querySelector('.section.expanded').dataset.id;
    const title = document.getElementById('lessonTitle').value.trim();
    const orderNum = parseInt(document.getElementById('lessonOrder').value, 10);

    if (!title) {
        showError('lessonTitle', 'Title is required');
        return;
    }
    if (isNaN(orderNum) || orderNum < 1) {
        showError('lessonOrder', 'Order must be a positive number');
        return;
    }

    const lesson = {
        section_id: sectionId,
        course_id: document.getElementById('course-name').dataset.courseId,
        title: title,
        summary: document.getElementById('lessonSummary').value.trim(),
        video_url: document.getElementById('lessonVideoUrl').value.trim(),
        order_num: orderNum
    };

    try {
        if (lessonId) {
            await api.updateLesson(lessonId, lesson);
        } else {
            await api.createLesson(lesson);
        }
        document.getElementById('lesson-modal').style.display = 'none';
        loadLessons(sectionId);
    } catch (error) {
        console.error('Error saving lesson:', error);
        showError('general', 'Error saving lesson. Please try again.');
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.id = `${fieldId}-error`;
        error.className = 'error-message';
        error.textContent = message;
        field.parentNode.insertBefore(error, field.nextSibling);
    }
}

document.getElementById('lesson-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveLesson();
});
