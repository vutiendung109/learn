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
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteUser(btn.dataset.id));
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
        // Nếu là chế độ chỉnh sửa, tải thông tin người dùng
        loadUser(userId);
    } else {
        // Nếu là chế độ thêm mới, ẩn trường mật khẩu
        document.getElementById('password').value = '';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('user-modal').style.display = 'none';
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

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    document.getElementById('add-user-btn').addEventListener('click', () => {
        openModal('Thêm người dùng mới');
    });

    document.querySelector('.close-btn').addEventListener('click', closeModal);

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
                // Cập nhật người dùng
                await api.updateUser(userId, userData);
                alert('Cập nhật thông tin người dùng thành công!');
            } else {
                // Thêm người dùng mới
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
