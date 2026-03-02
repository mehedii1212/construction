document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    const brandSlider = new Swiper('.brand-slider', {
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true
        },
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 2000,
        direction: 'horizontal',
        grabCursor: false,
        mousewheel: false,
        breakpoints: {
            320: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 }
        }
    });

    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        slidesPerView: 1,
        spaceBetween: 30
    });

    const counters = document.querySelectorAll('.counter');
    const counterSection = document.querySelector('.counter-section');
    let started = false;

    function startCounting() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCounter();
        });
    }

    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    startCounting();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counterSection);
    }

    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
});
