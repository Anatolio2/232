import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import { authGuard } from './auth'; // Импортируем миддлвар

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard // Применяем миддлвар для защищённого маршрута
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue')
    // Авторизация не требуется, но мы добавляем маршрут для регистрации
  }
];

const router = createRouter({
  history: createWebHistory('http://localhost:5173'),
  routes
});

export default router;
