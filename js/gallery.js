/**
 * GALLERY WITH LIGHTBOX
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var lightbox = document.getElementById('lightbox');
        var lightboxImg = document.getElementById('lightbox-img');
        var lightboxCaption = document.getElementById('lightbox-caption');
        var lightboxCounter = document.getElementById('lightbox-counter');
        var closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
        var prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
        var nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;
        
        var galleryItems = document.querySelectorAll('.gallery-item');
        var currentIndex = 0;
        var images = [];

        galleryItems.forEach(function(item, index) {
            var img = item.querySelector('img');
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt
                });
            }
            
            item.addEventListener('click', function() {
                openLightbox(index);
            });
        });

        function openLightbox(index) {
            if (index < 0 || index >= images.length) return;
            
            currentIndex = index;
            updateLightbox();
            
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeLightbox() {
            if (lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        function updateLightbox() {
            if (!images[currentIndex]) return;
            
            if (lightboxImg) {
                lightboxImg.src = images[currentIndex].src;
                lightboxImg.alt = images[currentIndex].alt;
            }
            
            if (lightboxCaption) {
                lightboxCaption.textContent = images[currentIndex].alt;
            }
            
            if (lightboxCounter) {
                lightboxCounter.textContent = (currentIndex + 1) + ' из ' + images.length;
            }
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                prevImage();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nextImage();
            });
        }

        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }

        document.addEventListener('keydown', function(e) {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        });

        var touchStartX = 0;
        var touchEndX = 0;

        if (lightbox) {
            lightbox.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            lightbox.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            var threshold = 50;
            var diff = touchStartX - touchEndX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        }
    });
})();