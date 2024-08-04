import { api } from './api.js';

async function loadCourses() {
    try {
        const response = await api.getCourses();
        const courses = response.courses; // Lấy mảng courses từ response

        const tableBody = document.querySelector('#courses-table tbody');
        tableBody.innerHTML = courses.map(course => `
           <tr>
        <td>${course.course_id}</td>
        <td>${course.title}</td>
        <td>${course.category_id || 'N/A'}</td>
        <td>${course.regular_price}</td>
        <td>${course.discounted_price || 'N/A'}</td>
        <td>${course.discount_start_date ? new Date(course.discount_start_date).toLocaleString() : ''}</td>
        <td>${course.discount_end_date ? new Date(course.discount_end_date).toLocaleString() : ''}</td>
        <td>${course.status}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${course.course_id}">Edit</button>
          <button class="action-btn delete-btn" data-id="${course.course_id}">Delete</button>
          <button class="action-btn manage-content-btn" data-id="${course.course_id}">Manage Content</button>
        </td>
      </tr>
        `).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteCourse(btn.dataset.id));
        });
        document.querySelectorAll('.manage-content-btn').forEach(btn => {
            btn.addEventListener('click', () => manageContent(btn.dataset.id));
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

function formatDateTimeForInput(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toISOString().slice(0, 16); // Cắt bỏ phần giây và múi giờ
  }
  
  async function loadCourse(courseId) {
    try {
      const course = await api.getCourse(courseId);
      document.getElementById('courseId').value = courseId;
      document.getElementById('categoryId').value = course.category_id || '';
      document.getElementById('title').value = course.title || '';
      document.getElementById('regularPrice').value = course.regular_price || '';
      document.getElementById('discountedPrice').value = course.discounted_price || '';
      document.getElementById('discountStartDate').value = formatDateTimeForInput(course.discount_start_date);
      document.getElementById('discountEndDate').value = formatDateTimeForInput(course.discount_end_date);
      document.getElementById('imageUrl').value = course.image_url || '';
      document.getElementById('description').value = course.description || '';
      document.getElementById('content').value = course.content || '';
      document.getElementById('status').value = course.status || 'draft';
    } catch (error) {
      console.error('Error loading course details:', error);
    }
  }
function openEditModal(courseId) {
    console.log('Editing course with ID:', courseId);
    openModal('Edit Course', courseId);
    loadCourse(courseId);
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

function manageContent(courseId) {
    // Chuyển hướng đến trang quản lý nội dung khóa học
    window.location.href = `course-content.html?id=${courseId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();

    document.querySelector('#add-course-btn').addEventListener('click', () => {
        openModal('Add New Course');
    });

// Cập nhật event listener cho form submission
document.querySelector('#course-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const courseId = document.getElementById('courseId').value;
    const courseData = {
      category_id: document.getElementById('categoryId').value || null,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      content: document.getElementById('content').value,
      regular_price: parseFloat(document.getElementById('regularPrice').value),
      discounted_price: parseFloat(document.getElementById('discountedPrice').value) || null,
      discount_start_date: document.getElementById('discountStartDate').value || null,
      discount_end_date: document.getElementById('discountEndDate').value || null,
      image_url: document.getElementById('imageUrl').value,
      status: document.getElementById('status').value
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
      alert(`An error occurred while saving the course: ${error.message}`);    }
  });
    document.querySelector('#course-modal .close-btn').addEventListener('click', () => {
        closeModal();
    });
});