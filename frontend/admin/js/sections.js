import { api } from './api.js';

// Hàm tải các sections của một khóa học
async function loadSections(courseId) {
    try {
        // Gọi API để lấy dữ liệu các sections theo courseId
        const response = await api.getSectionsByCourse(courseId);
        // Kiểm tra xem response có phải là mảng hay không
        if (!Array.isArray(response)) {
            console.warn('Dữ liệu trả về không phải là mảng hoặc không hợp lệ.');
            return;
        }

        const sections = response;

        // Kiểm tra xem mảng sections có rỗng hay không
        if (sections.length === 0) {
            console.warn('Không có dữ liệu sections.');
            return;
        }

        // Xử lý và hiển thị dữ liệu trên giao diện
        const tableBody = document.querySelector('#sections-list');
        if (!tableBody) {
            console.error('Không tìm thấy phần tử bảng để hiển thị sections.');
            return;
        }


        // Tạo nội dung HTML cho bảng sections
        tableBody.innerHTML = sections.map(section => `
            <tr>
                <td>${section.section_id}</td>
                <td>${section.title}</td>
                <td>${section.description || 'N/A'}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${section.section_id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${section.section_id}">Delete</button>
                    <!-- Thêm nút để xem lessons nếu cần -->
                </td>
            </tr>
        `).join('');

        // Thêm sự kiện cho các nút "Edit" và "Delete"
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openSectionModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteSection(courseId, btn.dataset.id));
        });
    } catch (error) {
        console.error('Error loading sections:', error);
    }
}

// Hàm xóa một section
async function deleteSection(courseId, sectionId) {
    if (confirm('Are you sure you want to delete this section?')) {
        try {
            await api.deleteSection(sectionId);
            alert('Section deleted successfully!');
            loadSections(courseId); // Tải lại các section sau khi xóa
        } catch (error) {
            console.error('Error deleting section:', error);
            alert('An error occurred while deleting the section.');
        }
    }
}

// Hàm mở modal để chỉnh sửa hoặc thêm một section
function openSectionModal(sectionId = null) {
    const modal = document.getElementById('section-modal');
    document.getElementById('section-modal-title').textContent = sectionId ? 'Edit Section' : 'Add New Section';
    const form = document.getElementById('section-form');
    form.reset();
    document.getElementById('sectionId').value = sectionId || '';

    if (sectionId) {
        loadSection(sectionId); // Tải thông tin section nếu có sectionId
    }

    modal.style.display = 'block';
}

// Hàm tải thông tin chi tiết của một section
async function loadSection(sectionId) {
    try {
        const section = await api.getSection(sectionId);
        document.getElementById('sectionTitle').value = section.title;
        document.getElementById('sectionDescription').value = section.description || '';
    } catch (error) {
        console.error('Error loading section details:', error);
    }
}

// Xuất các hàm cần thiết
export { loadSections, openSectionModal };
