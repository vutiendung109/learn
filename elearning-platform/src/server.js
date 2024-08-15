const express = require('express');
const cors = require('cors');

const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs');

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
const { log } = require('console');

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

// APP INFO ( chỉ dùng trong môi trường sandbox )
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};


// thanh toán
app.use(express.urlencoded({ extended: false }));

//tạo tơn trong môi trường sanbox
app.post('/payments', async (req, res) => {
  try {
    const embed_data = {
      redirecturl: "https://lazada.vn"
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: "",

      callback_url: "https://bb96-42-118-57-32.ngrok-free.app/callback",
    };

    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const result = await axios.post(config.endpoint, null, { params: order });

    // Gửi kết quả về cho client
    res.json(result.data);
  } catch (error) {
    console.error('Payment error:', error.message);
    // Gửi thông báo lỗi về cho client
    res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
});

//callback xác nhận thanh toán thành công
app.post('/callback', async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);


    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    }
    else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

// check trạng thái
app.post('/order-status/:app_trans_id', async (req, res) => {
  const app_trans_id = req.params.app_trans_id;
  // const { app_trans_id } = req.body;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
}
  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


let postConfig = {
    method: 'post',
    url: 'https://sb-openapi.zalopay.vn/v2/query',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
};
try {
  const result = await axios(postConfig)

  // Gửi kết quả về cho client
  return res.status(200).json(result.data);

} catch (error) {
  console.log(error.message);
  
}
});



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





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


