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
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
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
let doodleCanvas, doodleCtx;
let doodle = {
    x: 200,
    y: 400,
    width: 40,
    height: 40,
    velocityY: 0,
    velocityX: 0,
    onGround: false,
    direction: 1, // 1 for right, -1 for left
    hasJetpack: false,
    hasSpringShoes: false,
    jetpackFuel: 0,
    springShoeTime: 0
};

let platforms = [];
let monsters = [];
let jetpacks = [];
let springShoes = [];
let score = 0;
let gameOver = false;
let keys = {};
let gameSpeed = 2;
let cameraY = 0;

// Sprite images
let sprites = {
    doodle: null,
    doodleLeft: null,
    doodleRight: null,
    doodleJetpack: null,
    doodleSpring: null,
    platform: null,
    monster: null,
    jetpack: null,
    springShoes: null,
    background: null,
    cloud: null
};

// Load sprites
function loadSprites() {
    const spritePromises = [
        loadImage('Doodle Jump/Doodle Jump/puca.png'),
        loadImage('Doodle Jump/Doodle Jump/puca-odskok.png'),
        loadImage('Doodle Jump/Doodle Jump/jetpack-puca.png'),
        loadImage('Doodle Jump/Doodle Jump/springshoes-up.png'),
        loadImage('Doodle Jump/Doodle Jump/game-tiles.png'),
        loadImage('Doodle Jump/Doodle Jump/ach-monster-chopper.png'),
        loadImage('Doodle Jump/Doodle Jump/jetpack.png'),
        loadImage('Doodle Jump/Doodle Jump/springshoes-side.png'),
        loadImage('Doodle Jump/Doodle Jump/bck.png'),
        loadImage('Doodle Jump/Doodle Jump/space-bck.png'),
        loadImage('Doodle Jump/Doodle Jump/space-puca.png'),
        loadImage('Doodle Jump/Doodle Jump/space-puca-odskok.png'),
        loadImage('Doodle Jump/Doodle Jump/space-right.png'),
        loadImage('Doodle Jump/Doodle Jump/space-right-odskok.png'),
        loadImage('Doodle Jump/Doodle Jump/space-left.png'),
        loadImage('Doodle Jump/Doodle Jump/space-left-odskok.png')
    ];

    Promise.all(spritePromises).then((images) => {
        sprites.doodle = images[0];
        sprites.doodleLeft = images[1];
        sprites.doodleRight = images[1];
        sprites.doodleJetpack = images[2];
        sprites.doodleSpring = images[3];
        sprites.platform = images[4];
        sprites.monster = images[5];
        sprites.jetpack = images[6];
        sprites.springShoes = images[7];
        sprites.background = images[8];
        sprites.spaceBackground = images[9];
        sprites.spaceDoodle = images[10];
        sprites.spaceDoodleJump = images[11];
        sprites.spaceRight = images[12];
        sprites.spaceRightJump = images[13];
        sprites.spaceLeft = images[14];
        sprites.spaceLeftJump = images[15];
        
        // Start the game once sprites are loaded
        initDoodleJump();
    }).catch(error => {
        console.error('Error loading sprites:', error);
        // Fallback to basic game if sprites fail to load
        initDoodleJump();
    });
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

function initDoodleJump() {
    doodleCanvas = document.getElementById('doodle-canvas');
    if (!doodleCanvas) return;
    
    doodleCtx = doodleCanvas.getContext('2d');
    doodleCanvas.width = 400;
    doodleCanvas.height = 600;
    
    // Initialize platforms
    for (let i = 0; i < 12; i++) {
        platforms.push({
            x: Math.random() * (doodleCanvas.width - 80),
            y: doodleCanvas.height - 100 - i * 70,
            width: 80,
            height: 15,
            type: Math.random() < 0.2 ? 'moving' : 'static',
            moveDirection: Math.random() < 0.5 ? 1 : -1,
            moveSpeed: 1 + Math.random() * 2
        });
    }
    
    // Initialize monsters
    for (let i = 0; i < 3; i++) {
        monsters.push({
            x: Math.random() * (doodleCanvas.width - 30),
            y: doodleCanvas.height - 200 - i * 150,
            width: 30,
            height: 30,
            direction: Math.random() < 0.5 ? 1 : -1,
            speed: 1 + Math.random() * 2
        });
    }
    
    // Initialize power-ups
    for (let i = 0; i < 2; i++) {
        jetpacks.push({
            x: Math.random() * (doodleCanvas.width - 20),
            y: doodleCanvas.height - 300 - i * 200,
            width: 20,
            height: 20,
            collected: false
        });
        
        springShoes.push({
            x: Math.random() * (doodleCanvas.width - 20),
            y: doodleCanvas.height - 400 - i * 200,
            width: 20,
            height: 20,
            collected: false
        });
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    // Click to restart
    doodleCanvas.addEventListener('click', () => {
        if (gameOver) {
            resetGame();
        }
    });
    
    // Start game loop
    gameLoop();
}

function resetGame() {
    doodle.x = 200;
    doodle.y = 400;
    doodle.velocityY = 0;
    doodle.velocityX = 0;
    doodle.hasJetpack = false;
    doodle.hasSpringShoes = false;
    doodle.jetpackFuel = 0;
    doodle.springShoeTime = 0;
    score = 0;
    gameOver = false;
    gameSpeed = 2;
    cameraY = 0;
    
    // Reset platforms
    platforms = [];
    for (let i = 0; i < 12; i++) {
        platforms.push({
            x: Math.random() * (doodleCanvas.width - 80),
            y: doodleCanvas.height - 100 - i * 70,
            width: 80,
            height: 15,
            type: Math.random() < 0.2 ? 'moving' : 'static',
            moveDirection: Math.random() < 0.5 ? 1 : -1,
            moveSpeed: 1 + Math.random() * 2
        });
    }
    
    // Reset monsters
    monsters = [];
    for (let i = 0; i < 3; i++) {
        monsters.push({
            x: Math.random() * (doodleCanvas.width - 30),
            y: doodleCanvas.height - 200 - i * 150,
            width: 30,
            height: 30,
            direction: Math.random() < 0.5 ? 1 : -1,
            speed: 1 + Math.random() * 2
        });
    }
    
    // Reset power-ups
    jetpacks = [];
    springShoes = [];
    for (let i = 0; i < 2; i++) {
        jetpacks.push({
            x: Math.random() * (doodleCanvas.width - 20),
            y: doodleCanvas.height - 300 - i * 200,
            width: 20,
            height: 20,
            collected: false
        });
        
        springShoes.push({
            x: Math.random() * (doodleCanvas.width - 20),
            y: doodleCanvas.height - 400 - i * 200,
            width: 20,
            height: 20,
            collected: false
        });
    }
}

function updateGame() {
    if (gameOver) return;
    
    // Handle input
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        doodle.velocityX = -5;
        doodle.direction = -1;
    } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        doodle.velocityX = 5;
        doodle.direction = 1;
    } else {
        doodle.velocityX *= 0.8; // Friction
    }
    
    // Jetpack control
    if (doodle.hasJetpack && doodle.jetpackFuel > 0 && (keys['ArrowUp'] || keys['w'] || keys['W'])) {
        doodle.velocityY = -8;
        doodle.jetpackFuel--;
        if (doodle.jetpackFuel <= 0) {
            doodle.hasJetpack = false;
        }
    }
    
    // Update doodle position
    doodle.x += doodle.velocityX;
    
    // Wrap around screen
    if (doodle.x < -doodle.width) doodle.x = doodleCanvas.width;
    if (doodle.x > doodleCanvas.width) doodle.x = -doodle.width;
    
    // Apply gravity
    doodle.velocityY += 0.5;
    doodle.y += doodle.velocityY;
    
    // Update spring shoe timer
    if (doodle.springShoeTime > 0) {
        doodle.springShoeTime--;
        if (doodle.springShoeTime <= 0) {
            doodle.hasSpringShoes = false;
        }
    }
    
    // Check platform collisions
    doodle.onGround = false;
    for (let platform of platforms) {
        if (doodle.x < platform.x + platform.width &&
            doodle.x + doodle.width > platform.x &&
            doodle.y + doodle.height > platform.y &&
            doodle.y + doodle.height < platform.y + platform.height + 10 &&
            doodle.velocityY > 0) {
            
            doodle.y = platform.y - doodle.height;
            doodle.velocityY = doodle.hasSpringShoes ? -18 : -12; // Higher jump with spring shoes
            doodle.onGround = true;
            break;
        }
    }
    
    // Update platforms
    for (let platform of platforms) {
        platform.y -= gameSpeed;
        
        // Move moving platforms
        if (platform.type === 'moving') {
            platform.x += platform.moveDirection * platform.moveSpeed;
            if (platform.x <= 0 || platform.x >= doodleCanvas.width - platform.width) {
                platform.moveDirection *= -1;
            }
        }
        
        // Remove platforms that are off screen
        if (platform.y < -platform.height) {
            platform.y = doodleCanvas.height;
            platform.x = Math.random() * (doodleCanvas.width - platform.width);
            platform.type = Math.random() < 0.2 ? 'moving' : 'static';
            platform.moveDirection = Math.random() < 0.5 ? 1 : -1;
            platform.moveSpeed = 1 + Math.random() * 2;
        }
    }
    
    // Update monsters
    for (let monster of monsters) {
        monster.y -= gameSpeed;
        monster.x += monster.direction * monster.speed;
        
        // Bounce off walls
        if (monster.x <= 0 || monster.x >= doodleCanvas.width - monster.width) {
            monster.direction *= -1;
        }
        
        // Remove monsters that are off screen
        if (monster.y < -monster.height) {
            monster.y = doodleCanvas.height + Math.random() * 200;
            monster.x = Math.random() * (doodleCanvas.width - monster.width);
        }
        
        // Check collision with monster
        if (doodle.x < monster.x + monster.width &&
            doodle.x + doodle.width > monster.x &&
            doodle.y < monster.y + monster.height &&
            doodle.y + doodle.height > monster.y) {
            gameOver = true;
        }
    }
    
    // Update power-ups
    for (let jetpack of jetpacks) {
        if (!jetpack.collected) {
            jetpack.y -= gameSpeed;
            
            // Check collision with jetpack
            if (doodle.x < jetpack.x + jetpack.width &&
                doodle.x + doodle.width > jetpack.x &&
                doodle.y < jetpack.y + jetpack.height &&
                doodle.y + doodle.height > jetpack.y) {
                jetpack.collected = true;
                doodle.hasJetpack = true;
                doodle.jetpackFuel = 100;
            }
            
            // Remove jetpacks that are off screen
            if (jetpack.y < -jetpack.height) {
                jetpack.y = doodleCanvas.height + Math.random() * 300;
                jetpack.x = Math.random() * (doodleCanvas.width - jetpack.width);
                jetpack.collected = false;
            }
        }
    }
    
    for (let springShoe of springShoes) {
        if (!springShoe.collected) {
            springShoe.y -= gameSpeed;
            
            // Check collision with spring shoes
            if (doodle.x < springShoe.x + springShoe.width &&
                doodle.x + doodle.width > springShoe.x &&
                doodle.y < springShoe.y + springShoe.height &&
                doodle.y + doodle.height > springShoe.y) {
                springShoe.collected = true;
                doodle.hasSpringShoes = true;
                doodle.springShoeTime = 300; // 5 seconds at 60fps
            }
            
            // Remove spring shoes that are off screen
            if (springShoe.y < -springShoe.height) {
                springShoe.y = doodleCanvas.height + Math.random() * 300;
                springShoe.x = Math.random() * (doodleCanvas.width - springShoe.width);
                springShoe.collected = false;
            }
        }
    }
    
    // Update camera and score based on height
    if (doodle.y < doodleCanvas.height / 2) {
        const heightGained = doodleCanvas.height / 2 - doodle.y;
        cameraY += heightGained;
        score += heightGained * 2; // Score based on height gained
        doodle.y = doodleCanvas.height / 2;
        
        // Increase game speed based on height
        if (cameraY > 1000 && cameraY % 500 === 0) {
            gameSpeed += 0.5;
        }
    }
    
    // Check game over - fall below screen
    if (doodle.y > doodleCanvas.height) {
        gameOver = true;
    }
}

function drawGame() {
    // Clear canvas
    doodleCtx.fillStyle = '#000033'; // Dark blue space background
    doodleCtx.fillRect(0, 0, doodleCanvas.width, doodleCanvas.height);
    
    // Draw space background with parallax effect
    if (sprites.spaceBackground) {
        const bgY = (cameraY * 0.3) % sprites.spaceBackground.height;
        doodleCtx.drawImage(sprites.spaceBackground, 0, bgY - sprites.spaceBackground.height, doodleCanvas.width, sprites.spaceBackground.height);
        doodleCtx.drawImage(sprites.spaceBackground, 0, bgY, doodleCanvas.width, sprites.spaceBackground.height);
    }
    
    // Draw stars
    drawStars();
    
    // Draw platforms
    for (let platform of platforms) {
        if (sprites.platform) {
            doodleCtx.drawImage(sprites.platform, platform.x, platform.y, platform.width, platform.height);
        } else {
            // Fallback to rectangle
            doodleCtx.fillStyle = '#228B22';
            doodleCtx.fillRect(platform.x, platform.y, platform.width, platform.height);
        }
    }
    
    // Draw monsters
    for (let monster of monsters) {
        if (sprites.monster) {
            doodleCtx.save();
            if (monster.direction < 0) {
                doodleCtx.scale(-1, 1);
                doodleCtx.drawImage(sprites.monster, -monster.x - monster.width, monster.y, monster.width, monster.height);
            } else {
                doodleCtx.drawImage(sprites.monster, monster.x, monster.y, monster.width, monster.height);
            }
            doodleCtx.restore();
        } else {
            // Fallback to rectangle
            doodleCtx.fillStyle = '#FF0000';
            doodleCtx.fillRect(monster.x, monster.y, monster.width, monster.height);
        }
    }
    
    // Draw power-ups
    for (let jetpack of jetpacks) {
        if (!jetpack.collected && sprites.jetpack) {
            doodleCtx.drawImage(sprites.jetpack, jetpack.x, jetpack.y, jetpack.width, jetpack.height);
        }
    }
    
    for (let springShoe of springShoes) {
        if (!springShoe.collected && sprites.springShoes) {
            doodleCtx.drawImage(sprites.springShoes, springShoe.x, springShoe.y, springShoe.width, springShoe.height);
        }
    }
    
    // Draw doodle
    drawDoodle();
    
    // Draw UI
    drawUI();
    
    // Draw game over screen
    if (gameOver) {
        drawGameOver();
    }
}

function drawStars() {
    doodleCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    const starPositions = [
        { x: 50, y: 100 - cameraY * 0.2 },
        { x: 300, y: 150 - cameraY * 0.2 },
        { x: 200, y: 80 - cameraY * 0.2 },
        { x: 350, y: 120 - cameraY * 0.2 },
        { x: 150, y: 200 - cameraY * 0.2 },
        { x: 250, y: 60 - cameraY * 0.2 }
    ];
    
    for (let star of starPositions) {
        if (star.y > -20 && star.y < doodleCanvas.height + 20) {
            doodleCtx.beginPath();
            doodleCtx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            doodleCtx.fill();
        }
    }
}

function drawDoodle() {
    let spriteToUse = sprites.spaceDoodle;
    
    if (doodle.hasJetpack && sprites.doodleJetpack) {
        spriteToUse = sprites.doodleJetpack;
    } else if (doodle.hasSpringShoes && sprites.doodleSpring) {
        spriteToUse = sprites.doodleSpring;
    } else if (doodle.velocityY < 0 && sprites.spaceDoodleJump) {
        // Use jumping sprite when moving upward
        spriteToUse = sprites.spaceDoodleJump;
    }
    
    if (spriteToUse) {
        doodleCtx.save();
        if (doodle.direction < 0) {
            doodleCtx.scale(-1, 1);
            doodleCtx.drawImage(spriteToUse, -doodle.x - doodle.width, doodle.y, doodle.width, doodle.height);
        } else {
            doodleCtx.drawImage(spriteToUse, doodle.x, doodle.y, doodle.width, doodle.height);
        }
        doodleCtx.restore();
    } else {
        // Fallback to rectangle
        doodleCtx.fillStyle = '#FF6B6B';
        doodleCtx.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);
        
        // Draw face
        doodleCtx.fillStyle = 'white';
        doodleCtx.fillRect(doodle.x + 8, doodle.y + 8, 8, 8);
        doodleCtx.fillRect(doodle.x + 24, doodle.y + 8, 8, 8);
        
        doodleCtx.fillStyle = 'black';
        doodleCtx.fillRect(doodle.x + 10, doodle.y + 10, 4, 4);
        doodleCtx.fillRect(doodle.x + 26, doodle.y + 10, 4, 4);
    }
}

function drawUI() {
    // Draw score
    doodleCtx.fillStyle = 'white';
    doodleCtx.font = 'bold 24px Arial';
    doodleCtx.fillText(`Score: ${Math.floor(score / 10)}`, 10, 30);
    
    // Draw power-up indicators
    if (doodle.hasJetpack) {
        doodleCtx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        doodleCtx.fillRect(10, 40, 20, 20);
        doodleCtx.fillStyle = 'black';
        doodleCtx.font = '12px Arial';
        doodleCtx.fillText('J', 15, 55);
        
        // Draw fuel bar
        doodleCtx.fillStyle = 'red';
        doodleCtx.fillRect(35, 40, 50, 10);
        doodleCtx.fillStyle = 'green';
        doodleCtx.fillRect(35, 40, (doodle.jetpackFuel / 100) * 50, 10);
    }
    
    if (doodle.hasSpringShoes) {
        doodleCtx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        doodleCtx.fillRect(10, 70, 20, 20);
        doodleCtx.fillStyle = 'black';
        doodleCtx.font = '12px Arial';
        doodleCtx.fillText('S', 15, 85);
    }
}

function drawGameOver() {
    doodleCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    doodleCtx.fillRect(0, 0, doodleCanvas.width, doodleCanvas.height);
    
    doodleCtx.fillStyle = 'white';
    doodleCtx.font = 'bold 32px Arial';
    doodleCtx.textAlign = 'center';
    doodleCtx.fillText('Game Over!', doodleCanvas.width / 2, doodleCanvas.height / 2 - 40);
    doodleCtx.font = '24px Arial';
    doodleCtx.fillText(`Final Score: ${Math.floor(score / 10)}`, doodleCanvas.width / 2, doodleCanvas.height / 2);
    doodleCtx.font = '18px Arial';
    doodleCtx.fillText('Click to restart', doodleCanvas.width / 2, doodleCanvas.height / 2 + 40);
    doodleCtx.textAlign = 'left';
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
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
    loadSprites(); // Initialize Doodle Jump sprites
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
