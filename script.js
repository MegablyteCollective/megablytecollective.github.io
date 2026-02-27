// Initialize Lucide icons
lucide.createIcons();

// Carousel Drag Functionality
const carousel = document.getElementById('projectCarousel');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');

let isDown = false;
let startX;
let scrollLeft;

// Mouse Events for Drag
carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});

// Button Controls
leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -420, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 420, behavior: 'smooth' });
});

// Touch Support
carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchend', () => {
    isDown = false;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});