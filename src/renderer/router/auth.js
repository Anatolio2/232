import axios from 'axios';

export async function authGuard(to, from, next) {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Проверяем валидность токена через запрос на сервер
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data === true) {
        // Если токен валиден, продолжаем
        next();
      } else {
        // Если сервер возвращает ошибку, удаляем токен и перенаправляем
        localStorage.removeItem('token');
        next({ name: 'Login' });
      }
    } catch (error) {
      // Обработка ошибок
      console.error('Error validating token:', error.message);
      localStorage.removeItem('token'); // Удаляем токен, если запрос не удался
      next({ name: 'Login' });
    }
  } else {
    // Если токена нет, перенаправляем на страницу авторизации
    next({ name: 'Login' });
  }
}
