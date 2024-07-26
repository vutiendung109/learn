document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    fetchCourses();
    fetchReviews();
});

async function fetchUsers() {
    try {
        const users = await api.get('/admin/users');
        const userList = document.getElementById('userList');
        userList.innerHTML = users.map(user => `<li>${user.username} - ${user.email} - ${user.role}</li>`).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Thêm các hàm fetchCourses và fetchReviews tương tự