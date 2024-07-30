const express = require('express');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/course');
// const enrollmentRoutes = require('./routes/enrollments');
// const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const path = require('path');
const db = require('./config/db');

// const router = express.Router();
// const adminController = require('./controllers/adminController');
// const authMiddleware = require('./middleware/auth');
// const checkAdminRole = require('./middleware/checkAdminRole');



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/reviews', reviewRoutes);



// Phục vụ các file tĩnh từ thư mục frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Route cho trang admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/index.html'));
});

// Route mặc định cho client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/client/index.html'));
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});