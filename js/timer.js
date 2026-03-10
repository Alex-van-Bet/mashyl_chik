/**
 * COUNTDOWN TIMER - ДО КОНЦА МЕСЯЦА
 * Без export - работает при открытии файла напрямую
 */

(function() {
    // Ждём загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minutesEl = document.getElementById('minutes');
        var secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.log('Timer elements not found');
            return;
        }

        // Получить дату конца текущего месяца
        function getEndOfMonth() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            // Последний день текущего месяца
            var lastDay = new Date(year, month + 1, 0);
            // Устанавливаем на 23:59:59
            lastDay.setHours(23, 59, 59, 999);
            return lastDay.getTime();
        }

        var endDate = getEndOfMonth();
        var interval = null;

        function update() {
            var now = new Date().getTime();
            var distance = endDate - now;

            if (distance < 0) {
                // Перезапуск на следующий месяц
                endDate = getEndOfMonth();
                return;
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = padNumber(days);
            hoursEl.textContent = padNumber(hours);
            minutesEl.textContent = padNumber(minutes);
            secondsEl.textContent = padNumber(seconds);
        }

        function padNumber(num) {
            return num < 10 ? '0' + num : num.toString();
        }

        // Запуск таймера
        update();
        interval = setInterval(update, 1000);

        // Сохраняем интервал для остановки при необходимости
        window.timerInterval = interval;
    });
})();