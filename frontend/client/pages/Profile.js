// Profile.js

export const getUserInfo = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        console.log('User Info retrieved:', userInfo);
        return userInfo;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error.message);

        return {
            username: 'N/A',
            email: 'N/A',
            full_name: 'N/A',
            avatar: '/shared/assets/img/default-avatar.png',
            role: 'N/A'
        };
    }
};

// Giả sử bạn có hàm để cập nhật thông tin người dùng
export const updateUserInfo = async (newUserInfo) => {
    try {
        // Giả sử bạn có một API để cập nhật thông tin người dùng, thay vì chỉ cập nhật trong localStorage
        // const response = await fetch('/api/updateUserInfo', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newUserInfo)
        // });
        // const data = await response.json();

        // Giả sử cập nhật thành công, lưu lại thông tin vào localStorage
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
        return {
            success: true,
            message: 'Thông tin người dùng đã được cập nhật thành công'
        };
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error.message);
        return {
            success: false,
            message: 'Cập nhật thông tin người dùng thất bại'
        };
    }
};
