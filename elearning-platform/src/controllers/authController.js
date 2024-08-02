const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password, full_name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create({ username, email, password: hashedPassword, full_name });
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    console.log('Received login request:', req.body);
    try {
        const { username, password } = req.body;
        
        // Kiểm tra xem username có được cung cấp không
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        
        const user = await User.findByUsername(username);
        console.log('User found:', user); // Log thông tin user tìm được
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = (password === user.password);

        console.log('Password match:', isMatch); // Log kết quả so sánh password
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({ token, userId: user.user_id, role: user.role });
    } catch (error) {
        console.error('Login error:', error); // Log chi tiết lỗi
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};