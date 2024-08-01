import { api } from './api.js';
import { loadSections, openSectionModal } from './sections.js';

async function loadCourses() {
    try {
        const courses = await api.getCourses();
        const tableBody = document.querySelector('#courses-table tbody');
        tableBody.innerHTML = courses.map(course => `
            <tr>
                <td>${course.course_id}</td>
                <td>${course.title}</td>
                <td>${course.regular_price}</td>
                <td>${course.discounted_price || 'N/A'}</td>
                <td>${course.discount_start_date ? new Date(course.discount_start_date).toLocaleString() : ''}</td>
                <td>${course.discount_end_date ? new Date(course.discount_end_date).toLocaleString() : ''}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${course.course_id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${course.course_id}">Delete</button>
                    <button class="action-btn view-sections" data-id="${course.course_id}">View Sections</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteCourse(btn.dataset.id));
        });
        document.querySelectorAll('.view-sections').forEach(btn => {
            btn.addEventListener('click', () => viewSections(btn.dataset.id));
        });
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function openModal(title, courseId = null) {
    const modal = document.getElementById('course-modal');
    document.getElementById('modal-title').textContent = title;
    const form = document.getElementById('course-form');
    form.reset();
    document.getElementById('courseId').value = courseId || '';

    if (courseId) {
        loadCourse(courseId);
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('course-modal').style.display = 'none';
}

async function loadCourse(courseId) {
    try {
        const course = await api.getCourse(courseId);
        document.getElementById('title').value = course.title || '';
        document.getElementById('regularPrice').value = course.regular_price || '';
        document.getElementById('discountedPrice').value = course.discounted_price || '';

        document.getElementById('discountStartDate').value = course.discount_start_date ? new Date(course.discount_start_date).toISOString().slice(0, -1) : '';
        document.getElementById('discountEndDate').value = course.discount_end_date ? new Date(course.discount_end_date).toISOString().slice(0, -1) : '';

        document.getElementById('imageUrl').value = course.image_url || '';
        document.getElementById('description').value = course.description || '';
    } catch (error) {
        console.error('Error loading course details:', error);
    }
}
function openEditModal(courseId) {
    openModal('Edit Course', courseId);
}

async function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await api.deleteCourse(courseId);
            alert('Course deleted successfully!');
            loadCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('An error occurred while deleting the course.');
        }
    }
}

function viewSections(courseId) {
    const courseTitle = document.querySelector(`button[data-id="${courseId}"]`).closest('tr').querySelector('td:nth-child(2)').innerText;
    document.querySelector('#course-name').innerText = courseTitle;
    document.querySelector('#sections-lessons-page').style.display = 'block';
    loadSections(courseId); // Gọi hàm để tải và hiển thị các sections
}

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();

    document.querySelector('#add-course-btn').addEventListener('click', () => {
        openModal('Add New Course');
    });

    document.querySelector('#course-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const courseId = document.getElementById('courseId').value;
        const courseData = {
            title: document.getElementById('title').value,
            regular_price: parseFloat(document.getElementById('regularPrice').value),
            discounted_price: parseFloat(document.getElementById('discountedPrice').value) || null,
            discount_start_date: document.getElementById('discountStartDate').value,
            discount_end_date: document.getElementById('discountEndDate').value,
            image_url: document.getElementById('imageUrl').value,
            description: document.getElementById('description').value,
        };

        try {
            if (courseId) {
                await api.updateCourse(courseId, courseData);
                alert('Course updated successfully!');
            } else {
                await api.createCourse(courseData);
                alert('Course created successfully!');
            }
            loadCourses();
            closeModal();
        } catch (error) {
            console.error('Error saving course:', error);
            alert('An error occurred while saving the course.');
        }
    });

    document.querySelector('#course-modal .close-btn').addEventListener('click', () => {
        closeModal();
    });

    document.querySelector('#back-to-courses-btn').addEventListener('click', () => {
        document.querySelector('#sections-lessons-page').style.display = 'none';
    });

    // Uncomment and update if you want to add a section
    // document.querySelector('#add-section-btn').addEventListener('click', () => {
    //     openSectionModal('Add New Section');
    // });
});
