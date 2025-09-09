// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#1c1c1c'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#fffafa',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Carousel functionality
function initCarousel(carouselId, navId) {
    const carousel = document.getElementById(carouselId);
    const nav = document.getElementById(navId);
    const items = carousel.querySelectorAll('.carousel-item');
    
    // Create navigation dots
    items.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-nav-btn');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToItem(i);
        });
        nav.appendChild(dot);
    });
    
    const dots = nav.querySelectorAll('.carousel-nav-btn');
    
    function scrollToItem(index) {
        const item = items[index];
        carousel.scrollTo({
            left: item.offsetLeft - carousel.offsetLeft,
            behavior: 'smooth'
        });
    }
    
    // Update active dot on scroll
    carousel.addEventListener('scroll', () => {
        const scrollPos = carousel.scrollLeft;
        let activeIndex = 0;
        let minDistance = Infinity;
        
        items.forEach((item, i) => {
            const distance = Math.abs(item.offsetLeft - carousel.offsetLeft - scrollPos);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = i;
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });
    
    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('grabbing');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('grabbing');
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('grabbing');
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        isDown = false;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });
    
    // Auto-scroll
    let autoScrollInterval = setInterval(() => {
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (currentScroll >= maxScroll - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }, 4000);
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            const currentScroll = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            if (currentScroll >= maxScroll - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 4000);
    });
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('products-carousel', 'products-nav');
    initCarousel('reviews-carousel', 'reviews-nav');
});