// Ключ для хранения времени старта в localStorage
const START_TIME_KEY = 'timer_start_time';

// Элементы DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMessage = document.getElementById('statusMessage');

// Функция для форматирования чисел (добавление нуля впереди)
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Функция обновления отображения времени
function updateTimerDisplay(days, hours, minutes) {
    daysEl.textContent = formatNumber(days);
    hoursEl.textContent = formatNumber(hours);
    minutesEl.textContent = formatNumber(minutes);
}

// Функция расчёта разницы во времени
function calculateTimeDifference(startDate) {
    const now = new Date();
    const diffMs = now - startDate;

    // Расчёт дней, часов, минут
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}

// Функция запуска таймера
function startTimer() {
    // Получаем сохранённое время старта или устанавливаем текущее
    let startTime = localStorage.getItem(START_TIME_KEY);

    if (!startTime) {
        // Первый запуск — сохраняем текущее время
        startTime = new Date().toISOString();
        localStorage.setItem(START_TIME_KEY, startTime);
        statusMessage.textContent = 'Таймер запущен! Отсчёт начался.';
    } else {
        statusMessage.textContent = 'Таймер уже работает! Продолжаем отсчёт...';
    }

    // Запускаем обновление каждые секунду
    updateTimer();
    setInterval(updateTimer, 1000);

    // Отключаем кнопку «Старт» после запуска
    startBtn.disabled = true;
    startBtn.textContent = 'Работает...';
}

// Функция сброса таймера
function resetTimer() {
    if (confirm('Вы уверены, что хотите сбросить таймер?')) {
        localStorage.removeItem(START_TIME_KEY);
        updateTimerDisplay(0, 0, 0);
        statusMessage.textContent = 'Таймер сброшен. Нажмите «Старт» для нового отсчёта.';

        // Включаем кнопку «Старт»
        startBtn.disabled = false;
        startBtn.textContent = 'Старт';
    }
}

// Основная функция обновления таймера
function updateTimer() {
    const startTimeStr = localStorage.getItem(START_TIME_KEY);
    if (!startTimeStr) return;

    const startTime = new Date(startTimeStr);
    const { days, hours, minutes } = calculateTimeDifference(startTime);
    updateTimerDisplay(days, hours, minutes);
}

// Обработчики событий
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Если есть сохранённое время старта, сразу показываем счётчик
    if (localStorage.getItem(START_TIME_KEY)) {
        updateTimer();
        startBtn.disabled = true;
        startBtn.textContent = 'Работает...';
        statusMessage.textContent = 'Таймер продолжает работу. Отсчёт идёт...
