/**
 * SLIDER - ИСПРАВЛЕННЫЕ СТРЕЛКИ
 * Без export - работает при открытии файла напрямую
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var container = document.querySelector('.slider-container');
        if (!container) return;

        var track = container.querySelector('.slider-track');
        var items = track.querySelectorAll('.slider-item');
        var dotsContainer = container.querySelector('.slider-dots');
        var prevBtn = container.querySelector('.slider-arrow-left');
        var nextBtn = container.querySelector('.slider-arrow-right');

        var currentIndex = 0;
        var totalSlides = items.length;
        var autoplayInterval = null;
        var isAnimating = false;

        // Создаём точки
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (var i = 0; i < totalSlides; i++) {
                var dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dotsContainer.appendChild(dot);
            }
        }

        // Обновление слайдера
        function updateSlider() {
            if (isAnimating) return;
            isAnimating = true;

            var offset = -currentIndex * 100;
            track.style.transform = 'translateX(' + offset + '%)';
            track.style.transition = 'transform 500ms ease-in-out';

            // Обновляем точки
            var dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.toggle('active', i === currentIndex);
            }

            setTimeout(function() {
                isAnimating = false;
            }, 500);
        }

        // Следующий слайд
        function next() {
            if (currentIndex >= totalSlides - 1) {
                currentIndex = 0; // Зацикливание
            } else {
                currentIndex++;
            }
            updateSlider();
        }

        // Предыдущий слайд
        function prev() {
            if (currentIndex <= 0) {
                currentIndex = totalSlides - 1; // Зацикливание
            } else {
                currentIndex--;
            }
            updateSlider();
        }

        // Перейти к слайду
        function goTo(index) {
            if (index < 0 || index >= totalSlides) return;
            currentIndex = index;
            updateSlider();
        }

        // Автоплей
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(next, 5000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        // Инициализация
        createDots();
        updateSlider();
        startAutoplay();

        // События кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prev();
                stopAutoplay();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                next();
                stopAutoplay();
                startAutoplay();
            });
        }

        // События точек
        if (dotsContainer) {
            dotsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('slider-dot')) {
                    var index = parseInt(e.target.getAttribute('data-index'));
                    goTo(index);
                    stopAutoplay();
                    startAutoplay();
                }
            });
        }

        // Пауза при наведении
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
    });
})();