import { api } from './api.js';
import { loadLessons, openLessonModal } from './lessons.js';

export async function loadSections(courseId) {
    try {
        const sections = await api.getSections(courseId);
        const courseOutline = document.getElementById('course-outline');
        courseOutline.innerHTML = sections.map(section => `
            <div class="section" data-id="${section.section_id}">
                <div class="section-header">
                    <span class="section-title">${section.title}</span>
                    <div class="section-actions">
                        <button class="btn edit-section-btn">Edit</button>
                        <button class="btn delete-section-btn">Delete</button>
                        <button class="btn add-lesson-btn">Add Lesson</button>
                    </div>
                </div>
                <div class="section-content"></div>
            </div>
        `).join('');

        addSectionEventListeners();
        sections.forEach(section => loadLessons(section.section_id));
    } catch (error) {
        console.error('Error loading sections:', error);
    }
}

function addSectionEventListeners() {
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => toggleSection(header.closest('.section')));
    });
    document.querySelectorAll('.edit-section-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sectionId = e.target.closest('.section').dataset.id;
            if (sectionId) {
                openSectionModal(sectionId);
            } else {
                console.error('Section ID not found');
            }
        });
    });
    document.querySelectorAll('.delete-section-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sectionId = e.target.closest('.section').dataset.id;
            if (sectionId) {
                deleteSection(sectionId);
            } else {
                console.error('Section ID not found');
            }
        });
    });
    document.querySelectorAll('.add-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sectionId = e.target.closest('.section').dataset.id;
            if (sectionId) {
                openLessonModal(null, sectionId);
            } else {
                console.error('Section ID not found');
            }
        });
    });
}

function toggleSection(sectionElement) {
    sectionElement.classList.toggle('expanded');
}

export function openSectionModal(sectionId = null) {
    const modal = document.getElementById('section-modal');
    const form = document.getElementById('section-form');
    const title = document.getElementById('section-modal-title');

    form.reset();
    form.dataset.id = sectionId || '';
    title.textContent = sectionId ? 'Edit Section' : 'Add New Section';

    if (sectionId) {
        api.getSection(sectionId).then(section => {
            document.getElementById('sectionTitle').value = section.title;
            document.getElementById('sectionDescription').value = section.description;
        }).catch(error => console.error('Error loading section data:', error));
    }

    modal.style.display = 'flex';
}

async function deleteSection(sectionId) {
    if (!sectionId) {
        console.error('Section ID is undefined');
        return;
    }
    if (confirm('Are you sure you want to delete this section?')) {
        try {
            await api.deleteSection(sectionId);
            loadSections(document.getElementById('course-name').dataset.courseId);
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    }
}

export async function saveSection() {
    const form = document.getElementById('section-form');
    const sectionId = form.dataset.id;
    const section = {
        course_id: document.getElementById('course-name').dataset.courseId,
        title: document.getElementById('sectionTitle').value,
        description: document.getElementById('sectionDescription').value,
    };

    try {
        if (sectionId) {
            await api.updateSection(sectionId, section);
        } else {
            await api.createSection(section);
        }
        document.getElementById('section-modal').style.display = 'none';
        loadSections(document.getElementById('course-name').dataset.courseId);
    } catch (error) {
        console.error('Error saving section:', error);
    }
}

document.getElementById('section-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveSection();
});
