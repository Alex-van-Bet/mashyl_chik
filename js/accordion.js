/**
 * ACCORDION
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var items = document.querySelectorAll('.accordion-item');

        items.forEach(function(item) {
            var header = item.querySelector('.accordion-header');
            var content = item.querySelector('.accordion-content');
            var icon = header ? header.querySelector('.accordion-icon') : null;

            if (header && content) {
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 300ms ease';
                content.style.opacity = '0';
                
                item.classList.remove('active');
                
                if (icon) icon.textContent = '+';

                header.addEventListener('click', function() {
                    var isOpen = item.classList.contains('active');

                    items.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            var otherContent = otherItem.querySelector('.accordion-content');
                            var otherIcon = otherItem.querySelector('.accordion-icon');
                            if (otherContent) {
                                otherContent.style.maxHeight = '0';
                                otherContent.style.opacity = '0';
                            }
                            if (otherIcon) otherIcon.textContent = '+';
                        }
                    });

                    if (isOpen) {
                        item.classList.remove('active');
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        if (icon) icon.textContent = '+';
                    } else {
                        item.classList.add('active');
                        content.style.opacity = '1';
                        content.style.maxHeight = content.scrollHeight + 'px';
                        if (icon) icon.textContent = '−';
                    }
                });
            }
        });
    });
})();