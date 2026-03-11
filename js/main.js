/**
 * MAIN APPLICATION
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var scrollElements = document.querySelectorAll('.scroll-animate');
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        scrollElements.forEach(function(el) {
            observer.observe(el);
        });

        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        var elements = document.querySelectorAll('.tariff-card, .accordion-item');
        elements.forEach(function(el, index) {
            el.classList.add('animate-slide-up');
            el.style.animationDelay = (index * 0.1) + 's';
        });
    });
})();

var Cart = (function() {
    function Cart() {
        this.items = [];
        this.total = 0;
    }

    Cart.prototype.add = function(item) {
        this.items.push(item);
        this.calculateTotal();
        this.updateUI();
    };

    Cart.prototype.remove = function(index) {
        this.items.splice(index, 1);
        this.calculateTotal();
        this.updateUI();
    };

    Cart.prototype.calculateTotal = function() {
        this.total = this.items.reduce(function(sum, item) {
            return sum + item.price;
        }, 0);
    };

    Cart.prototype.updateUI = function() {
        var counter = document.querySelector('.js-carticon-counter');
        if (counter) {
            counter.textContent = this.items.length;
        }
    };

    Cart.prototype.clear = function() {
        this.items = [];
        this.total = 0;
        this.updateUI();
    };

    return Cart;
})();

window.cart = new Cart();