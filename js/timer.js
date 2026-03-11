/**
 * COUNTDOWN TIMER - ДО 13 МАРТА
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minutesEl = document.getElementById('minutes');
        var secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.log('Timer elements not found');
            return;
        }

        function getDeadline() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            var day = now.getDate();
            
            // Если сегодня уже 13 марта или позже - ставим на следующий месяц
            if (month === 2 && day >= 13) {
                year = month === 11 ? year + 1 : year;
                month = month === 11 ? 0 : month + 1;
            }
            
            // Дата: 13 марта, 23:59:59
            var deadline = new Date(year, 2, 12, 23, 59, 59, 999);
            
            if (deadline.getTime() < new Date().getTime()) {
                deadline = new Date(year + 1, 2, 13, 23, 59, 59, 999);
            }
            
            return deadline.getTime();
        }

        var endDate = getDeadline();
        var interval = null;

        function update() {
            var now = new Date().getTime();
            var distance = endDate - now;

            if (distance < 0) {
                endDate = getDeadline();
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

        update();
        interval = setInterval(update, 1000);

        window.timerInterval = interval;
    });
})();