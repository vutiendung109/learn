//Sử dụng main.js làm điểm bắt đầu:
// Trong main.js, bạn chỉ cần import app.js và gọi phương thức init của nó để bắt đầu ứng dụng.

import { App } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
