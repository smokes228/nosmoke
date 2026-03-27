// Генерация анонимного ID пользователя (сохраняем в localStorage)
function getUserId() {
  let userId = localStorage.getItem('smokingCounterUserId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('smokingCounterUserId', userId);
  }
  return userId;
}

// Функция для получения данных счётчика с сервера
async function fetchCounter() {
  const userId = getUserId();
  try {
    const response = await fetch(`/api/counter/${userId}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    updateDisplay(data.days, data.startDate);
  } catch (error) {
    console.error('Ошибка загрузки счётчика:', error);
    document.getElementById('days').textContent = 'Ошибка';
  }
}

// Функция для сброса счётчика
async function resetCounter() {
  if (!confirm('Вы уверены, что хотите сбросить счётчик?')) return;
  const userId = getUserId();
  try {
    await fetch(`/api/reset/${userId}`, { method: 'POST' });
    fetchCounter(); // Обновляем отображение после сброса
  } catch (error) {
    console.error('Ошибка сброса счётчика:', error);
  }
}

// Обновление отображения
function updateDisplay(days, startDate) {
  document.getElementById('days').textContent = days;
  const dayWord = getDayWord(days);
  document.getElementById('message').textContent =
    `Вы не курите уже ${days} ${dayWord} с ${new Date(startDate).toLocaleDateString()}! Продолжайте в том же духе!`;
}

// Функция для правильного склонения слова «день»
function getDayWord(days) {
  if (days % 10 === 1 && days % 100 !== 11) return 'день';
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
  return 'дней';
}

// Обработчики событий
document.getElementById('reset').addEventListener('click', resetCounter);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchCounter);
