import { api } from './api.js';

let editingUserId = null;

async function loadUsers() {
    try {
        const users = await api.getUsers();
        const tableBody = document.querySelector('#users-table tbody');
        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.user_id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.full_name}</td>
                <td><img src="${user.profile_picture}" alt="Ảnh đại diện" width="50"></td>
                <td>${new Date(user.created_at).toLocaleString()}</td>
                <td>${user.role}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${user.user_id}">Sửa</button>
                    <button class="action-btn delete-btn" data-id="${user.user_id}">Xóa</button>
                    <button class="action-btn edit-permission-btn" data-id="${user.user_id}">Chỉnh sửa quyền</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteUser(btn.dataset.id));
        });
        document.querySelectorAll('.edit-permission-btn').forEach(btn => {
            btn.addEventListener('click', () => openPermissionModal(btn.dataset.id));
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
    }
}

function openModal(title, userId = null) {
    const modal = document.getElementById('user-modal');
    document.getElementById('modal-title').textContent = title;
    const form = document.getElementById('user-form');
    form.reset();
    document.getElementById('userId').value = userId;

    if (userId) {
        loadUser(userId);
    } else {
        document.getElementById('password').value = '';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('user-modal').style.display = 'none';
    document.getElementById('permission-modal').style.display = 'none';
}

async function loadUser(userId) {
    try {
        const user = await api.getUser(userId);
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('fullName').value = user.full_name;
        document.getElementById('profilePicture').value = user.profile_picture || '';
        document.getElementById('role').value = user.role;
    } catch (error) {
        console.error('Lỗi khi tải thông tin người dùng:', error);
    }
}

function openEditModal(userId) {
    openModal('Chỉnh sửa người dùng', userId);
}

async function deleteUser(userId) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        try {
            await api.deleteUser(userId);
            alert('Xóa người dùng thành công!');
            loadUsers();
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Có lỗi xảy ra khi xóa người dùng.');
        }
    }
}

async function openPermissionModal(userId) {
    const modal = document.getElementById('permission-modal');
    document.getElementById('editUserId').value = userId;
    
    try {
        const user = await api.getUserPermissions(userId);
        const purchasedCourses = user.enrollments ? user.enrollments : [];

        const tableBody = document.querySelector('#purchased-courses-table tbody');
        tableBody.innerHTML = purchasedCourses.map(course => `
            <tr>
                <td>${course.title}</td>
                <td>
                    <button class="action-btn remove-course-btn" data-course-id="${course.course_id}">Xóa</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.remove-course-btn').forEach(btn => {
            btn.addEventListener('click', () => removeCourse(userId, btn.dataset.courseId));
        });

        modal.style.display = 'block';
        
        // Thêm event listener cho nút "Thêm quyền" ở đây
        document.getElementById('add-permission-btn').addEventListener('click', loadAllCourses);
        
        // Ẩn phần "add-permission-section" ban đầu
        const addPermissionSection = document.getElementById('add-permission-section');
        if (addPermissionSection) {
            addPermissionSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Lỗi khi tải danh sách quyền của người dùng:', error);
    }
}

async function loadAllCourses() {
    try {
        const response = await api.getCourses();
        const allCourses = response.courses || response;

        const courseSelect = document.getElementById('all-courses');
        courseSelect.innerHTML = allCourses.map(course => `
            <option value="${course.course_id}">${course.title}</option>
        `).join('');

        const addPermissionSection = document.getElementById('add-permission-section');
        if (addPermissionSection) {
            addPermissionSection.style.display = 'block';
        } else {
            console.error("Không tìm thấy phần tử 'add-permission-section'");
        }

        document.getElementById('save-permission-btn').addEventListener('click', saveNewPermissions);
    } catch (error) {
        console.error('Lỗi khi tải danh sách khóa học:', error);
    }
}

async function saveNewPermissions() {
    const userId = document.getElementById('editUserId').value;
    const selectedCourses = Array.from(document.getElementById('all-courses').selectedOptions).map(option => option.value);

    try {
        await api.updateUserPermissions(userId, { courses: selectedCourses });
        alert('Thêm quyền thành công!');
        const addPermissionSection = document.getElementById('add-permission-section');
        if (addPermissionSection) {
            addPermissionSection.style.display = 'none';
        }
        loadPurchasedCourses(userId);
    } catch (error) {
        console.error('Lỗi khi thêm quyền:', error);
        alert('Có lỗi xảy ra khi thêm quyền.');
    }
}

async function loadPurchasedCourses(userId) {
    try {
        const user = await api.getUserPermissions(userId);
        const purchasedCourses = user.enrollments ? user.enrollments : [];

        const tableBody = document.querySelector('#purchased-courses-table tbody');
        tableBody.innerHTML = purchasedCourses.map(course => `
            <tr>
                <td>${course.title}</td>
                <td>
                    <button class="action-btn remove-course-btn" data-course-id="${course.course_id}">Xóa</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.remove-course-btn').forEach(btn => {
            btn.addEventListener('click', () => removeCourse(userId, btn.dataset.courseId));
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách khóa học đã mua:', error);
        alert('Có lỗi xảy ra khi tải danh sách khóa học. Vui lòng thử lại sau.');
    }
}

async function removeCourse(userId, courseId) {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này khỏi quyền của người dùng?')) {
        try {
            await api.removeUserPermission(userId, courseId);
            alert('Xóa khóa học thành công!');
            await loadPurchasedCourses(userId);
        } catch (error) {
            console.error('Lỗi khi xóa khóa học:', error);
            alert('Có lỗi xảy ra khi xóa khóa học.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    document.getElementById('add-user-btn').addEventListener('click', () => {
        openModal('Thêm người dùng mới');
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const userData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            fullName: document.getElementById('fullName').value,
            profilePicture: document.getElementById('profilePicture').value,
            role: document.getElementById('role').value,
        };

        try {
            if (userId) {
                await api.updateUser(userId, userData);
                alert('Cập nhật thông tin người dùng thành công!');
            } else {
                await api.createUser(userData);
                alert('Người dùng đã được thêm thành công!');
            }
            loadUsers();
            closeModal();
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật người dùng:', error);
            alert('Có lỗi xảy ra khi thêm hoặc cập nhật người dùng.');
        }
    });
});