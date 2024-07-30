import { api } from './api.js';

async function loadDashboardStats() {
    try {
        const [courses, users, orders] = await Promise.all([
            api.getCourses(),
            api.getUsers(),
            api.getOrders()
        ]);

        const statsContainer = document.getElementById('dashboard-stats');
        statsContainer.innerHTML = `
            <div class="stat-box">
                <h3>Khóa học</h3>
                <p>${courses.length}</p>
            </div>
            <div class="stat-box">
                <h3>Người dùng</h3>
                <p>${users.length}</p>
            </div>
            <div class="stat-box">
                <h3>Đơn hàng</h3>
                <p>${orders.length}</p>
            </div>
        `;
    } catch (error) {
        console.error('Lỗi khi tải thống kê:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboardStats);