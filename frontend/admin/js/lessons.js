import { api } from './api.js';

async function loadLessons(sectionId) {
    try {
        const lessons = await api.getLessons(sectionId);
        const tableBody = document.querySelector('#lessons-table tbody');
        tableBody.innerHTML = lessons.map(lesson => `
            <tr>
                <td>${lesson.lesson_id}</td>
                <td>${lesson.title}</td>
                <td>${lesson.summary}</td>
                <td>${lesson.video_url}</td>
                <td>
                    <button class="action-btn edit-lesson" data-id="${lesson.lesson_id}">Edit</button>
                    <button class="action-btn delete-lesson" data-id="${lesson.lesson_id}">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
}

function handleAddLesson(sectionId) {
    const lessonForm = document.querySelector('#lesson-form');
    lessonForm.reset();
    lessonForm.sectionId.value = sectionId;
    document.querySelector('#lesson-modal-title').innerText = 'Add New Lesson';
    document.querySelector('#lesson-modal').style.display = 'block';
}

async function handleSaveLesson(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        title: form.lessonTitle.value,
        summary: form.lessonSummary.value,
        videoUrl: form.lessonVideoUrl.value,
    };

    try {
        const lessonId = form.lessonId.value;
        const sectionId = form.sectionId.value;
        if (lessonId) {
            await api.updateLesson(lessonId, data);
        } else {
            await api.createLesson(sectionId, data);
        }
        document.querySelector('#lesson-modal').style.display = 'none';
        await loadLessons(sectionId);
    } catch (error) {
        console.error('Error saving lesson:', error);
    }
}

async function handleEditLesson(lessonId) {
    try {
        const lesson = await api.getLesson(lessonId);
        const form = document.querySelector('#lesson-form');
        form.lessonId.value = lesson.lesson_id;
        form.lessonTitle.value = lesson.title;
        form.lessonSummary.value = lesson.summary;
        form.lessonVideoUrl.value = lesson.video_url;
        document.querySelector('#lesson-modal-title').innerText = 'Edit Lesson';
        document.querySelector('#lesson-modal').style.display = 'block';
    } catch (error) {
        console.error('Error editing lesson:', error);
    }
}

async function handleDeleteLesson(lessonId) {
    if (confirm('Are you sure you want to delete this lesson?')) {
        try {
            await api.deleteLesson(lessonId);
            const sectionId = document.querySelector('#lesson-form').sectionId.value;
            await loadLessons(sectionId);
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addLessonBtn = document.querySelector('#add-lesson-btn');
    if (addLessonBtn) {
        addLessonBtn.addEventListener('click', () => {
            const sectionId = document.querySelector('#lesson-form').sectionId.value;
            handleAddLesson(sectionId);
        });
    }
    
    const lessonForm = document.querySelector('#lesson-form');
    if (lessonForm) {
        lessonForm.addEventListener('submit', handleSaveLesson);
    }

    const lessonsList = document.querySelector('#lessons-list');
    if (lessonsList) {
        lessonsList.addEventListener('click', async (event) => {
            const target = event.target;
            const lessonId = target.getAttribute('data-id');

            if (target.classList.contains('edit-lesson')) {
                await handleEditLesson(lessonId);
            } else if (target.classList.contains('delete-lesson')) {
                await handleDeleteLesson(lessonId);
            }
        });
    }

    const closeLessonModalBtn = document.querySelector('#lesson-modal .close-btn');
    if (closeLessonModalBtn) {
        closeLessonModalBtn.addEventListener('click', () => {
            document.querySelector('#lesson-modal').style.display = 'none';
        });
    }
});

export { loadLessons };
