// ===================================
// THEME SWITCHER
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // ===================================
    // SIDEBAR TOGGLE
    // ===================================
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
    });

    // Close sidebar with close button
    sidebarClose.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
        }
    });

    // Close sidebar when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
        });
    });

    // ===================================
    // THEME SWITCHER
    // ===================================
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Update active button
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Theme button click handlers
    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');

            // Update body attribute
            document.body.setAttribute('data-theme', theme);

            // Save to localStorage
            localStorage.setItem('portfolio-theme', theme);

            // Update active state
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===================================
    // SMOOTH SCROLLING NAVIGATION
    // ===================================
    // navLinks already declared above for sidebar toggle
    const sections = document.querySelectorAll('.section');

    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll and handle sidebar scroll behavior
    // sidebar already declared above for toggle functionality

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add scrolled class to sidebar when scrolling down
        if (window.pageYOffset > 100) {
            sidebar.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
        }
    });

    // ===================================
    // GAMING/PUZZLE ANIMATED BACKGROUND
    // ===================================
    const puzzleBackground = document.getElementById('puzzleBackground');
    const numPieces = 15; // Number of puzzle pieces

    // Create puzzle pieces
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';

        // Random properties for each piece
        const size = Math.random() * 60 + 30; // 30-90px
        const startX = Math.random() * 100; // 0-100%
        const startY = Math.random() * 100; // 0-100%
        const rotation = Math.random() * 360; // 0-360deg
        const duration = Math.random() * 10 + 8; // 8-18s
        const delay = Math.random() * 5; // 0-5s

        // Random shape (square, triangle, circle, hexagon)
        const shapes = ['square', 'triangle', 'circle', 'hexagon'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.width = `${size}px`;
        piece.style.height = `${size}px`;
        piece.style.left = `${startX}%`;
        piece.style.top = `${startY}%`;
        piece.style.animationDuration = `${duration}s`;
        piece.style.animationDelay = `${delay}s`;
        piece.setAttribute('data-shape', shape);

        puzzleBackground.appendChild(piece);
    }

    // Add CSS for puzzle pieces dynamically
    const style = document.createElement('style');
    style.textContent = `
        .puzzle-piece {
            position: absolute;
            background: linear-gradient(135deg, rgba(142, 68, 173, 0.3), rgba(106, 27, 154, 0.3));
            border: 2px solid rgba(142, 68, 173, 0.5);
            animation: float 10s infinite ease-in-out, rotate 15s infinite linear;
            opacity: 0.6;
            backdrop-filter: blur(2px);
        }
        
        .puzzle-piece[data-shape="square"] {
            border-radius: 8px;
        }
        
        .puzzle-piece[data-shape="circle"] {
            border-radius: 50%;
        }
        
        .puzzle-piece[data-shape="triangle"] {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .puzzle-piece[data-shape="hexagon"] {
            clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            25% {
                transform: translate(20px, -30px) scale(1.1);
            }
            50% {
                transform: translate(-15px, 20px) scale(0.9);
            }
            75% {
                transform: translate(30px, 10px) scale(1.05);
            }
        }
        
        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        .puzzle-piece:nth-child(odd) {
            animation-direction: alternate;
        }
        
        .puzzle-piece:nth-child(even) {
            animation-direction: alternate-reverse;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // CONTACT FORM VALIDATION
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate individual field
    function validateField(input, errorElement, validationFn, errorMsg) {
        if (!validationFn(input.value)) {
            errorElement.textContent = errorMsg;
            input.style.borderColor = '#e74c3c';
            return false;
        } else {
            errorElement.textContent = '';
            input.style.borderColor = 'rgba(142, 68, 173, 0.3)';
            return true;
        }
    }

    // Real-time validation on input
    nameInput.addEventListener('blur', function () {
        validateField(
            nameInput,
            nameError,
            (value) => value.trim().length >= 2,
            'Name must be at least 2 characters long'
        );
    });

    emailInput.addEventListener('blur', function () {
        validateField(
            emailInput,
            emailError,
            (value) => emailRegex.test(value.trim()),
            'Please enter a valid email address'
        );
    });

    messageInput.addEventListener('blur', function () {
        validateField(
            messageInput,
            messageError,
            (value) => value.trim().length >= 10,
            'Message must be at least 10 characters long'
        );
    });

    // Form submission with Google Sheets integration
    // REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbE15fRSGf0joTyOeNJutTyoaZRKpqA3S1F5xObS7hSzI4U4Te7fwdckpr2qvfCrNH5g/exec';

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous messages
        successMessage.classList.remove('show');

        // Validate all fields
        const isNameValid = validateField(
            nameInput,
            nameError,
            (value) => value.trim().length >= 2,
            'Name must be at least 2 characters long'
        );

        const isEmailValid = validateField(
            emailInput,
            emailError,
            (value) => emailRegex.test(value.trim()),
            'Please enter a valid email address'
        );

        const isMessageValid = validateField(
            messageInput,
            messageError,
            (value) => value.trim().length >= 10,
            'Message must be at least 10 characters long'
        );

        // If all fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            // Disable submit button temporarily
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Create form data object
            const formData = new FormData();
            formData.append('name', nameInput.value.trim());
            formData.append('email', emailInput.value.trim());
            formData.append('message', messageInput.value.trim());
            formData.append('timestamp', new Date().toISOString());

            // Send data to Google Sheets script
            // mode: 'no-cors' is required for Google Apps Script Web Apps to avoid CORS errors
            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
                .then(() => {
                    // With no-cors, we get an opaque response, so we assume success if the fetch completes
                    // Show success message
                    successMessage.textContent = 'Thank you! Your message has been saved.';
                    successMessage.classList.add('show');
                    successMessage.style.color = '#28a745'; // Green color

                    // Reset form
                    contactForm.reset();

                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error!', error.message);

                    // Show error message
                    successMessage.textContent = 'Something went wrong. Please try again.';
                    successMessage.classList.add('show');
                    successMessage.style.color = '#dc3545'; // Red color

                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.parentElement.querySelector('input, textarea').focus();
            }
        }
    });

    // ===================================
    // ADDITIONAL MICRO-INTERACTIONS
    // ===================================

    // Add hover effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add click effect to project buttons
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Placeholder action - you can add actual project links here
            console.log('Project button clicked!');
        });
    });

    // Add ripple animation to stylesheet
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Parallax effect removed - image now scrolls normally

    // ===================================
    // MOBILE-SPECIFIC ENHANCEMENTS
    // ===================================

    // Fix viewport height on mobile browsers (accounts for address bar)
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Prevent body scroll when sidebar is open on mobile
    const body = document.body;
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                if (sidebar.classList.contains('active') && window.innerWidth <= 768) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            }
        });
    });

    observer.observe(sidebar, { attributes: true });

    // Improve touch scrolling on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }

    // Add active state for touch devices
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.nav-link, .cta-button, .project-button, .submit-button');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function () {
                this.style.opacity = '0.8';
            });
            element.addEventListener('touchend', function () {
                this.style.opacity = '1';
            });
        });
    }

    // Close sidebar on orientation change
    window.addEventListener('orientationchange', function () {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
        }
    });

    // Smooth scroll polyfill for older mobile browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Portfolio website initialized successfully! 🚀');
});
