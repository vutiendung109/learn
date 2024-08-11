// import Router from './utils/router.js';
// import Header from './components/Header.js';
// import Footer from './components/Footer.js';
// import Home from './pages/Home.js';
// import CourseList from './pages/CourseList.js';
// import CourseDetail from './pages/CourseDetail.js';
// import CourseLearning from './pages/CourseLearning.js';
// import Payment from './pages/Payment.js';
// import Profile from './pages/Profile.js';
// import Login from './pages/Login.js';
// import Register from './pages/Register.js';
// import { isAuthenticated } from './utils/auth.js';

// export default class App {
//   constructor() {
//     this.router = new Router();
//     this.header = new Header();
//     this.footer = new Footer();
//   }

//   init() {
//     this.router.addRoute('/', Home);
//     this.router.addRoute('/courses', CourseList);
//     this.router.addRoute('/course/:id', CourseDetail);
//     this.router.addRoute('/learn/:id', CourseLearning, true);
//     this.router.addRoute('/payment', Payment, true);
//     this.router.addRoute('/profile', Profile, true);
//     this.router.addRoute('/login', Login);
//     this.router.addRoute('/register', Register);

//     const app = document.getElementById('app');
//     app.innerHTML = `
//       ${this.header.render()}
//       <main id="main-content"></main>
//       ${this.footer.render()}
//     `;

//     this.router.navigate(window.location.pathname);

//     window.addEventListener('popstate', () => {
//       this.router.navigate(window.location.pathname);
//     });
//   }
// }

// // sang phần mới 

// import Router from './utils/router.js';
// import Header from './components/Header.js';
// import Footer from './components/Footer.js';
// import Home from './pages/Home.js';
// import Courses from './pages/Courses.js';
// import About from './pages/About.js';

// export default class App {
//   constructor() {
//     this.router = new Router();
//     this.header = new Header();
//     this.footer = new Footer();
//   }

//   init() {
//     this.router.addRoute('/', Home);
//     this.router.addRoute('/courses', Courses);
//     this.router.addRoute('/about', About);

//     const app = document.getElementById('app');
//     app.innerHTML = `
//       ${this.header.render()}
//       <main id="main-content"></main>
//       ${this.footer.render()}
//     `;

//     this.router.navigate(window.location.pathname);

//     window.addEventListener('popstate', () => {
//       this.router.navigate(window.location.pathname);
//     });
//   }
// }


//gpt

// const App = () => {
//   document.getElementById('app').innerHTML = `
//     <nav>
//       <a href="/" data-link>Home</a>
//       <a href="/about" data-link>About</a>
//     </nav>
//     <div id="view"></div>
//   `;
// };

// export default App;



//new
// import Router from './utils/router.js';
// import Header from './components/Header.js';
// import Footer from './components/Footer.js';
// import Home from './pages/Home.js';
// import CourseList from './pages/CourseList.js';
// import CourseDetail from './pages/CourseDetail.js';
// import CourseLearning from './pages/CourseLearning.js';

// const router = new Router();

// // Khởi tạo header và footer
// const header = new Header();
// const footer = new Footer();

// document.getElementById('main-header').innerHTML = header.render();
// document.getElementById('main-footer').innerHTML = footer.render();

// // Định nghĩa các route
// router.addRoute('/', Home);
// router.addRoute('/khoahoc', CourseList);
// router.addRoute('/xemkh/:id', CourseDetail);
// router.addRoute('/ctkh/:id', CourseLearning);

// // Xử lý sự kiện click trên các liên kết
// document.addEventListener('click', e => {
//     if (e.target.matches('[data-link]')) {
//         e.preventDefault();
//         history.pushState(null, null, e.target.href);
//         router.navigate(new URL(e.target.href).pathname);
//     }
// });

// // Xử lý sự kiện popstate (khi người dùng sử dụng nút back/forward của trình duyệt)
// window.addEventListener('popstate', () => {
//     router.navigate(window.location.pathname);
// });

// // Khởi chạy router với đường dẫn hiện tại
// router.navigate(window.location.pathname);


import { Router } from './utils/router.js';
import { Home } from './pages/Home.js';
import { CourseList } from './pages/CourseList.js';
import { CourseDetail } from './pages/CourseDetail.js';
import { CourseLearning } from './pages/CourseLearning.js'; 
import { Profile } from './pages/Profile.js';
import { Login } from './pages/Login.js'; 

const routes = {
    '/': Home,
    '/courses': CourseList,
    '/course/:id': CourseDetail,
    '/course-learning/:id': CourseLearning,
    '/profile': Profile,
    '/login': Login,
};

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const router = new Router(app, routes);
    router.init();
});


