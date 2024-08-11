import { Router } from './utils/router.js';

// import routes from './routes.js';
import { Home } from './pages/Home.js';
import { CourseList } from './pages/CourseList.js';
import { CourseDetail } from './pages/CourseDetail.js';
import { Profile } from './pages/Profile.js';
import { Login } from './pages/Login.js'; 

const routes = {
    '/': Home,
    '/courses': CourseList,
    '/course/:id': CourseDetail,
    '/profile': Profile,
    '/login': Login,
};

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const router = new Router(app, routes);
    router.init();
});



