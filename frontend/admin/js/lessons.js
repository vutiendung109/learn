import { api } from './api.js';

export async function loadLessons(sectionId) {
    try {
        const lessons = await api.getLessons(sectionId);
        const sectionContent = document.querySelector(`.section[data-id="${sectionId}"] .section-content`);
        sectionContent.innerHTML = lessons.map(lesson => `
            <div class="lesson" data-id="${lesson.lesson_id}">
                <div class="lesson-header">
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
        btn.addEventListener('click', (e) => {
            const lessonId = e.target.closest('.lesson').dataset.id;
            openLessonModal(lessonId);
        });
    });
    document.querySelectorAll('.delete-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lessonId = e.target.closest('.lesson').dataset.id;
            deleteLesson(lessonId);
        });
    });
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
        }).catch(error => console.error('Error loading lesson data:', error));
    }

    modal.style.display = 'flex';
}

async function deleteLesson(lessonId) {
    if (!lessonId) {
        console.error('Lesson ID is undefined');
        return;
    }
    if (confirm('Are you sure you want to delete this lesson?')) {
        try {
            await api.deleteLesson(lessonId);
            const sectionId = document.querySelector(`.lesson[data-id="${lessonId}"]`).closest('.section').dataset.id;
            loadLessons(sectionId);
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    }
}

export async function saveLesson() {
    const form = document.getElementById('lesson-form');
    const lessonId = form.dataset.id;
    const sectionId = form.dataset.sectionId || document.querySelector('.section.expanded').dataset.id;
    const lesson = {
        section_id: sectionId,
        title: document.getElementById('lessonTitle').value,
        summary: document.getElementById('lessonSummary').value,
        video_url: document.getElementById('lessonVideoUrl').value,
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
    }
}

document.getElementById('lesson-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveLesson();
});
