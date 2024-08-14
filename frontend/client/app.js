import { Router } from './utils/router.js';
import { Home } from './pages/Home.js';
import { CourseList } from './pages/CourseList.js';
import { CourseDetail } from './pages/CourseDetail.js';
// import { Profile } from './pages/Profile.js';
import { Login } from './pages/Login.js';
import Header from './components/Header.js'; // Import Header
import { CourseLearning } from './pages/CourseLearning.js';
import { Payment } from './pages/Payment.js';
import { Register } from './pages/Register.js';
// Nếu có Footer thì import tương tự
import Footer from './components/Footer.js';

const routes = {
    '/': Home,
    '/courses': CourseList,
    '/course/:id': CourseDetail,
    '/course/:id/view': CourseLearning,
    // '/profile': Profile,
    '/login': Login,
    '/payment': Payment, // Thêm route cho trang thanh toán
    '/register': Register,
};

export class App {
    constructor() {
        this.router = new Router(document.getElementById('app'), routes);
    }

    init() {
        // Render Header trước khi khởi tạo router
        Header(); // Render Header vào vị trí thích hợp trong DOM
        
        // Nếu có Footer thì render Footer vào vị trí thích hợp
        Footer();

        this.router.init();
          window.addEventListener('hashchange', () => this.router.handleRouteChange());
    }
}
