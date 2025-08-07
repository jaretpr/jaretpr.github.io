// Three.js Scene Setup
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize Three.js
function initThreeJS() {
    const canvas = document.getElementById('threejs-canvas');
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    createParticleSystem();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create particle system
function createParticleSystem() {
    const particleCount = 300; // Reduced from 1000
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Random positions
        positions[i] = (Math.random() - 0.5) * 150;
        positions[i + 1] = (Math.random() - 0.5) * 150;
        positions[i + 2] = (Math.random() - 0.5) * 150;
        
        // Subtle colors
        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.1, 0.3, 0.7); // More subtle colors
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 1.5, // Smaller particles
        vertexColors: true,
        transparent: true,
        opacity: 0.4, // More transparent
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// Mouse move handler
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.01;
    mouseY = (event.clientY - windowHalfY) * 0.01;
}

// Window resize handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particle system
    if (particleSystem) {
        particleSystem.rotation.x += 0.0005; // Slower rotation
        particleSystem.rotation.y += 0.001; // Slower rotation
        
        // Subtle mouse interaction
        particleSystem.rotation.x += mouseY * 0.1; // Reduced sensitivity
        particleSystem.rotation.y += mouseX * 0.1; // Reduced sensitivity
    }
    
    renderer.render(scene, camera);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-content, .project-card, .skill-category, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const title = document.querySelector('.hero-title .gradient-text');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 500);
}

// Counter animation for stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero-stats');
    
    // If no stats section exists, don't run the animation
    if (!statsSection || counters.length === 0) {
        return;
    }
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = current.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observe stats section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Interactive skill tags
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project card interactions
function initProjectCards() {
    // Hover effects removed to keep project cards at a fixed size
}

// Contact form validation (if added later)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }
}

// Lightbox functionality for project images
function initLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <button class="lightbox-nav lightbox-prev">&lt;</button>
            <button class="lightbox-nav lightbox-next">&gt;</button>
            <div class="lightbox-image-container">
                <img class="lightbox-img" src="" alt="Full size image">
            </div>
            <div class="lightbox-counter">
                <span class="current-image">1</span> / <span class="total-images">1</span>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    let currentImageIndex = 0;
    let currentProjectImages = [];
    
    // Add click event to all project images
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const projectImages = card.querySelectorAll('.project-img');
        projectImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                // Get all images from this project
                currentProjectImages = Array.from(projectImages);
                currentImageIndex = index;
                openLightbox();
            });
        });
    });
    
    function openLightbox() {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const currentCounter = lightbox.querySelector('.current-image');
        const totalCounter = lightbox.querySelector('.total-images');
        
        lightboxImg.src = currentProjectImages[currentImageIndex].src;
        lightboxImg.alt = currentProjectImages[currentImageIndex].alt;
        currentCounter.textContent = currentImageIndex + 1;
        totalCounter.textContent = currentProjectImages.length;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Show/hide navigation buttons
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < currentProjectImages.length - 1 ? 'block' : 'none';
    }
    
    function nextImage() {
        if (currentImageIndex < currentProjectImages.length - 1) {
            currentImageIndex++;
            openLightbox();
        }
    }
    
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            openLightbox();
        }
    }
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
}

// Doodle Jump Game
// Simple Cookie Clicker
let cookies = 0;
let cookiesPerClick = 1;
let autoClickers = 0;
let gameWon = false;

function initCookieClicker() {
    const cookieBtn = document.getElementById('cookie');
    const countDisplay = document.getElementById('cookie-count');
    const shop = document.getElementById('shop');
    if (!cookieBtn || !countDisplay || !shop) return;

    function updateDisplay() {
        countDisplay.textContent = `Cookies: ${cookies.toLocaleString()}`;

        Array.from(shop.options).forEach(option => {
            const cost = parseInt(option.dataset.cost);
            if (!isNaN(cost)) {
                option.disabled = cookies < cost || option.dataset.purchased === 'true';
            }
        });

        if (!gameWon && cookies >= 1000000000) {
            alert('You beat the game!');
            gameWon = true;
        }
    }

    cookieBtn.addEventListener('click', () => {
        cookies += cookiesPerClick;
        updateDisplay();
    });

    shop.addEventListener('change', () => {
        const option = shop.options[shop.selectedIndex];
        const cost = parseInt(option.dataset.cost);
        const type = option.dataset.type;
        const increment = parseInt(option.dataset.increment);

        if (cookies >= cost) {
            cookies -= cost;

            if (type === 'click') {
                cookiesPerClick += increment;
            } else if (type === 'auto') {
                autoClickers += increment;
            }

            option.dataset.purchased = 'true';
            option.textContent += ' (Owned)';
        }

        shop.selectedIndex = 0;
        updateDisplay();
    });

    setInterval(() => {
        if (autoClickers > 0) {
            cookies += autoClickers;
            updateDisplay();
        }
    }, 1000);

    updateDisplay();
}

// Project Carousel
let currentProjectIndex = 0;
let projectCards = [];

function initProjectCarousel() {
    projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Found project cards:', projectCards.length); // Debug
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Prev clicked, current index:', currentProjectIndex); // Debug
            changeProject(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next clicked, current index:', currentProjectIndex); // Debug
            changeProject(1);
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToProject(index));
    });
    
    updateCarouselButtons();
}

function changeProject(direction) {
    const newIndex = currentProjectIndex + direction;
    console.log('Changing project:', currentProjectIndex, '->', newIndex, 'direction:', direction); // Debug
    if (newIndex >= 0 && newIndex < projectCards.length) {
        goToProject(newIndex);
    }
}

function goToProject(index) {
    console.log('Going to project:', index, 'total cards:', projectCards.length); // Debug
    if (index < 0 || index >= projectCards.length) return;
    
    // Remove all classes from all project cards
    projectCards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    // Update current index
    currentProjectIndex = index;
    
    // Add active class to new project
    if (projectCards[currentProjectIndex]) {
        projectCards[currentProjectIndex].classList.add('active');
    }
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentProjectIndex);
    });
    
    updateCarouselButtons();
    
    // Debug: Log the current state
    console.log('Current project index:', currentProjectIndex);
    projectCards.forEach((card, i) => {
        console.log(`Card ${i}:`, {
            hasActive: card.classList.contains('active'),
            hasPrev: card.classList.contains('prev'),
            opacity: window.getComputedStyle(card).opacity,
            transform: window.getComputedStyle(card).transform
        });
    });
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    
    if (prevBtn) prevBtn.disabled = currentProjectIndex === 0;
    if (nextBtn) nextBtn.disabled = currentProjectIndex === projectCards.length - 1;
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js
    initThreeJS();
    
    // Initialize other features
    initSmoothScrolling();
    initMobileNav();
    initScrollAnimations();
    initNavbarScroll();
    initTypingAnimation();
    initCounterAnimation();
    initParallaxEffect();
    initSkillTags();
    initProjectCards();
    initContactForm();
    initLightbox(); // Initialize lightbox
    initCookieClicker(); // Initialize cookie clicker game
    initProjectCarousel(); // Initialize project carousel
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Cursor trail effect (more subtle)
    let cursorTrail = [];
    const maxTrailLength = 8; // Reduced from 20
    
    document.addEventListener('mousemove', (e) => {
        // Only create trail occasionally
        if (Math.random() > 0.7) { // 30% chance
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.left = e.pageX + 'px';
            dot.style.top = e.pageY + 'px';
            document.body.appendChild(dot);
            
            cursorTrail.push(dot);
            
            if (cursorTrail.length > maxTrailLength) {
                const oldDot = cursorTrail.shift();
                oldDot.remove();
            }
            
            setTimeout(() => {
                dot.remove();
            }, 800);
        }
    });
    
    // Add CSS for cursor trail
    const style = document.createElement('style');
    style.textContent = `
        .cursor-trail {
            position: fixed;
            width: 2px;
            height: 2px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: fadeOut 0.8s ease-out forwards;
            opacity: 0.6;
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Add some Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Add some fun animation
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
});

// Add shake animation CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);
