const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Sử dụng controller admin hiện tại

// Lấy tất cả người dùng
router.get('/', adminController.getAllUsers);

// Lấy thông tin người dùng cụ thể
router.get('/:userId', adminController.getUserById);

// Tạo người dùng mới
router.post('/', adminController.createUser);

// Cập nhật thông tin người dùng
router.put('/:userId', adminController.updateUser);

// Xóa người dùng
router.delete('/:userId', adminController.deleteUser);

router.put('/:userId/permissions', adminController.updatePermissions);
router.delete('/:userId/permissions/:courseId', adminController.removePermission);
router.get('/:userId/permissions', adminController.getUserPermissions);

router.get('/:userId/permissions/:courseId', adminController.hasPermission);

module.exports = router;
