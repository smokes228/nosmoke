// Ключ для хранения даты в localStorage
const START_DATE_KEY = 'smoking_stop_date';

// Функция для получения правильной формы слова «день»
function getDayWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
    return 'дней';
}

// Функция для обновления счётчика
function updateCounter() {
    // Получаем сохранённую дату или устанавливаем текущую, если её нет
    let startDate = localStorage.getItem(START_DATE_KEY);
    if (!startDate) {
        startDate = new Date().toISOString();
        localStorage.setItem(START_DATE_KEY, startDate);
    }

    // Вычисляем количество дней
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Обновляем отображение
    document.getElementById('days').textContent = days;

    // Формируем и обновляем сообщение
    const dayWord = getDayWord(days);
    document.getElementById('message').textContent = `Вы не курите уже ${days} ${dayWord}! Продолжайте в том же духе!`;
}

// Обработчик сброса счётчика
document.getElementById('reset').addEventListener('click', function() {
    if (confirm('Вы уверены, что хотите сбросить счётчик?')) {
        localStorage.removeItem(START_DATE_KEY);
        updateCounter();
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCounter);
