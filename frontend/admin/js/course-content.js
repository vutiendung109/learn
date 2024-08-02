import { api } from './api.js';
import { loadSections, openSectionModal } from './sections.js';
import { openLessonModal } from './lessons.js';

document.addEventListener('DOMContentLoaded', () => {
    const courseId = new URLSearchParams(window.location.search).get('id');
    document.getElementById('course-name').dataset.courseId = courseId;

    // Load course details and sections
    loadCourseDetails(courseId);
    loadSections(courseId);

    // Add event listeners
    document.getElementById('add-section-btn').addEventListener('click', () => openSectionModal());

    // Close modals when clicking on close button
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('section-modal').style.display = 'none';
            document.getElementById('lesson-modal').style.display = 'none';
        });
    });
});

async function loadCourseDetails(courseId) {
    try {
        const course = await api.getCourse(courseId);
        document.getElementById('course-name').textContent = course.title;
    } catch (error) {
        console.error('Error loading course details:', error);
    }
}