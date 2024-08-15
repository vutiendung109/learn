// Thêm route này vào routes của bạn, ví dụ: routes/payment.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Đảm bảo đã thiết lập kết nối cơ sở dữ liệu
const { isAuthenticated } = require('../middleware/auth'); // Middleware kiểm tra đăng nhập
const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const config = {
  app_id: "2553", // Thay thế bằng App ID của bạn
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL", // Thay thế bằng Key 1 của bạn
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz", // Thay thế bằng Key 2 của bạn
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

// Route để bắt đầu thanh toán
router.post('/create-payment', isAuthenticated, async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id; // Giả sử bạn có middleware để lấy thông tin người dùng

    // Lấy thông tin khóa học từ database
    const course = await db.query("SELECT * FROM courses WHERE course_id = ?", [courseId]);

    if (!course) {
        return res.status(404).json({ error: 'Khóa học không tồn tại' });
    }

    // Khởi tạo thông tin thanh toán
    const transID = Math.floor(Math.random() * 1000000);
    const embedData = { userId, courseId };
    const items = [{ itemid: courseId, itemname: course.title }];
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: userId,
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embedData),
        amount: course.regular_price,
        description: `Payment for course #${courseId}`,
        bank_code: "",
        callback_url: "https://yourdomain.com/api/payment/callback", // Thay bằng URL thực tế của bạn
    };

    const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        res.json(result.data); // Trả về URL thanh toán cho người dùng
    } catch (error) {
        console.error('Payment error:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
});

//xử lí callback thanh toán
router.post('/callback', async (req, res) => {
    let result = {};
    try {
        const dataStr = req.body.data;
        const reqMac = req.body.mac;
        const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        // Kiểm tra tính hợp lệ của callback từ ZaloPay
        if (reqMac !== mac) {
            result.return_code = -1;
            result.return_message = "mac not equal";
        } else {
            // Thanh toán thành công
            const dataJson = JSON.parse(dataStr);
            const { userId, courseId } = JSON.parse(dataJson.embed_data);

            // Cập nhật quyền truy cập khóa học cho người dùng
            await db.query("INSERT INTO enrollments (user_id, course_id, status) VALUES (?, ?, 'active')", [userId, courseId]);

            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0;
        result.return_message = ex.message;
    }

    res.json(result); // Trả về kết quả cho ZaloPay
});

//kiểm tra trạng thái đơn hàng
router.post('/order-status/:app_trans_id', async (req, res) => {
    const app_trans_id = req.params.app_trans_id;
    const postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id,
    };

    const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post('https://sb-openapi.zalopay.vn/v2/query', qs.stringify(postData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.status(200).json(result.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while checking order status' });
    }
});


module.exports = router;
