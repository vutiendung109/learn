const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const enrollmentRoutes = require('./routes/enrollments');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');

//them
const userRoutes = require('./routes/user');

const path = require('path');
const db = require('./config/db');

const bodyParser = require('body-parser');

const router = express.Router();
const adminController = require('./controllers/adminController');
const authMiddleware = require('./middleware/auth');
const checkAdminRole = require('./middleware/checkAdminRole');



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const courseRoutes = require('./routes/course');
const sectionRoutes = require('./routes/section');
const lessonRoutes = require('./routes/lesson');

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

//Routes
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/lessons', lessonRoutes);

app.get('/api/auth/login', (req, res) => {
  res.send('Login endpoint is working');
});
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/reviews', reviewRoutes);








// Phục vụ các file tĩnh từ thư mục frontend
// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../frontend')));
// app.use(express.static(path.join(__dirname, '../../frontend/client/public')));
// Serve static files from assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Route for admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/index.html'));
});

// Route for client page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/client/index.html'));
});

// app.use(express.static(path.join(__dirname, '../../frontend/client')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const db = require('./config/db');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const enrollmentRoutes = require('./routes/enrollments');
// const reviewRoutes = require('./routes/reviews');
// const adminRoutes = require('./routes/admin');
// const courseRoutes = require('./routes/course');
// const sectionRoutes = require('./routes/section');
// const lessonRoutes = require('./routes/lesson');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5000', // hoặc domain của bạn
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// // Middleware để đặt MIME type cho các file JavaScript
// app.use((req, res, next) => {
//   if (req.url.endsWith('.js')) {
//     res.type('application/javascript');
//   }
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/sections', sectionRoutes);
// app.use('/api/lessons', lessonRoutes);
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/reviews', reviewRoutes);

// app.get('/api/auth/login', (req, res) => {
//   res.send('Login endpoint is working');
// });

// // Serve static files
// app.use(express.static(path.join(__dirname, '../../frontend/client/public')));

// // Route for admin page
// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/admin/index.html'));
// });

// // Catch-all route to serve the SPA
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/client/public/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


