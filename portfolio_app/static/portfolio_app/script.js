/* =====================================================
   BOSE A M — Premium Portfolio Script
   Tech: GSAP + Draggable + ScrollTrigger + Lenis
   ===================================================== */

/* ─────────────────────────────────────────
   1. LENIS SMOOTH SCROLL
   ───────────────────────────────────────── */
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.8,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ─────────────────────────────────────────
   2. GSAP PLUGIN REGISTRATION
   ───────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, Draggable);

/* ─────────────────────────────────────────
   3. CUSTOM LENS RETICLE CURSOR
   ───────────────────────────────────────── */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (cursorDot && cursorOutline) {
    let dotX = 0, dotY = 0;
    let outX = 0, outY = 0;

    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        gsap.set(cursorDot, { x: dotX, y: dotY });

        outX += (dotX - outX) * 0.12;
        outY += (dotY - outY) * 0.12;
        gsap.set(cursorOutline, { x: outX, y: outY });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverTargets = document.querySelectorAll(
        'a, button, .magnetic-btn, .skill-tag, .social-card, .project-card, .highlight-item, .readme-btn'
    );

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', () => {
        gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });
    });
}

/* ─────────────────────────────────────────
   4. MAGNETIC BUTTONS
   ───────────────────────────────────────── */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * 0.22,
            y: y * 0.22,
            duration: 0.4,
            ease: 'power2.out',
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
});

/* ─────────────────────────────────────────
   5. FLOATING DUST PARTICLES
   ───────────────────────────────────────── */
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    const count = 25;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 3 + 1.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 25;

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: var(--gold);
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;
        container.appendChild(p);
    }
}
createParticles();

/* ─────────────────────────────────────────
   6. NAVBAR — Scroll active triggers
   ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navProgress = document.getElementById('navProgress');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

lenis.on('scroll', ({ scroll }) => {
    // Scrolled class
    if (scroll > 60) {
        navbar.classList.add('py-3', 'bg-obsidian/90');
        navbar.classList.remove('py-5', 'bg-obsidian/40');
    } else {
        navbar.classList.add('py-5', 'bg-obsidian/40');
        navbar.classList.remove('py-3', 'bg-obsidian/90');
    }

    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (scroll / docHeight) * 100);
    if (navProgress) navProgress.style.width = pct + '%';

    // Active nav highlight
    let current = '';
    sections.forEach(s => {
        if (scroll >= s.offsetTop - 160) {
            current = s.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active', 'text-cinematic-gold');
        link.classList.add('text-neutral-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-cinematic-gold');
            link.classList.remove('text-neutral-400');
        }
    });
});

/* ─────────────────────────────────────────
   7. HAMBURGER MOBILE NAVIGATION
   ───────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.querySelector('.nav-mobile-overlay');

if (hamburger) {
    // Create mobile menu overlay list dynamically if not hardcoded
    const navLinksList = document.querySelectorAll('.nav-link');
    const overlayMenu = document.createElement('ul');
    overlayMenu.className = 'nav-mobile-overlay';
    
    navLinksList.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = 'nav-link';
        a.addEventListener('click', () => {
            overlayMenu.classList.remove('active');
            hamburger.classList.remove('open');
            lenis.start();
        });
        li.appendChild(a);
        overlayMenu.appendChild(li);
    });
    document.body.appendChild(overlayMenu);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        overlayMenu.classList.toggle('active');
        if (overlayMenu.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });
}

/* ─────────────────────────────────────────
   8. INTERACTIVE PLAY-PULL LANYARD CARD
   ───────────────────────────────────────── */
const cardContainer = document.getElementById('heroImageContainer');
const lanyardCard = document.getElementById('heroImage');
const lanyardPath = document.getElementById('lanyardPath');

if (cardContainer && lanyardCard && lanyardPath) {
    
    function updateLanyard() {
        const containerRect = cardContainer.getBoundingClientRect();
        const cardRect = lanyardCard.getBoundingClientRect();
        
        // Origin coordinates at top-center of container
        const startX = containerRect.width / 2;
        const startY = 10;
        
        // Connector coordinates at top-center of the card
        const endX = (cardRect.left + cardRect.width / 2) - containerRect.left;
        const endY = cardRect.top - containerRect.top + 6;
        
        // Control point calculations for elegant sag/pull curve
        const ctrlX = (startX + endX) / 2;
        const ctrlY = (startY + endY) / 2 + Math.abs(endX - startX) * 0.15 + 10;
        
        lanyardPath.setAttribute('d', `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`);
    }

    // Initialize Draggable interface on ID card
    Draggable.create(lanyardCard, {
        type: 'x,y',
        edgeResistance: 0.5,
        bounds: cardContainer,
        throwProps: false,
        onDragStart: function() {
            document.body.classList.add('dragging-badge');
        },
        onDrag: function() {
            updateLanyard();
            // Twist rotation based on drag movement velocity & displacement
            gsap.set(lanyardCard, {
                rotateZ: this.x * 0.09,
                rotateY: this.x * 0.05,
                rotateX: -this.y * 0.04
            });
        },
        onDragEnd: function() {
            document.body.classList.remove('dragging-badge');
            // Elastic spring back to home anchor point
            gsap.to(lanyardCard, {
                x: 0,
                y: 0,
                rotateZ: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 1.4,
                ease: 'elastic.out(1, 0.4)',
                onUpdate: updateLanyard
            });
        }
    });

    // Run first time to align path coordinate
    setTimeout(updateLanyard, 300);
    window.addEventListener('resize', updateLanyard);
}

/* ─────────────────────────────────────────
   9. HERO ENTRANCE SEQUENCES
   ───────────────────────────────────────── */
const heroTL = gsap.timeline({ delay: 0.3 });

heroTL
    .to('.greeting', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    })
    .to('.name', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.4')
    .to('.title', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, '-=0.5')
    .to('.hero-description', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, '-=0.4')
    .to('.hero-cta', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    }, '-=0.4')
    .to('.status-badge', {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
    }, '-=0.3')
    .to('#scrollIndicator', {
        opacity: 0.7, duration: 0.5, ease: 'power2.out',
    }, '-=0.2');

/* ─────────────────────────────────────────
   10. TYPING EFFECT
   ───────────────────────────────────────── */
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'];
const typingDelay = 90;
const erasingDelay = 45;
const newTextDelay = 2200;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1000);
    }
}

// Start typing trigger
setTimeout(type, 2600);

/* ─────────────────────────────────────────
   11. PARALLAX FLOATING ELEMENTS
   ───────────────────────────────────────── */
const floatIcons = document.querySelectorAll('.float-icon');

window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floatIcons.forEach(icon => {
        const depth = parseFloat(icon.dataset.depth || 0.35);
        const xMove = dx * depth * 40;
        const yMove = dy * depth * 40;
        gsap.to(icon, {
            x: xMove,
            y: yMove,
            duration: 0.8,
            ease: 'power2.out',
        });
    });
});

/* ─────────────────────────────────────────
   12. SKILLS CLOUD MOUSE PARALLAX
   ───────────────────────────────────────── */
const cloudIcons = document.querySelectorAll('.skill-cloud-icon');

window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    cloudIcons.forEach(icon => {
        const depth = parseFloat(icon.dataset.depth || 0.3);
        const xMove = dx * depth * 35;
        const yMove = dy * depth * 22;
        gsap.to(icon, {
            x: xMove,
            y: yMove,
            duration: 1.0,
            ease: 'power2.out',
        });
    });
});

// Stagger entrance for skills cloud icons
gsap.from('.skill-cloud-icon', {
    scrollTrigger: {
        trigger: '#skills',
        start: 'top 80%',
    },
    opacity: 0,
    scale: 0,
    duration: 0.6,
    stagger: {
        each: 0.07,
        from: 'random',
    },
    ease: 'back.out(2)',
});

/* ─────────────────────────────────────────
   13. CARD GLOW EFFECT MOUSE BIND
   ───────────────────────────────────────── */
document.querySelectorAll('.skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

/* ─────────────────────────────────────────
   14. SCROLLTRIGGER SECTION ANIMATIONS
   ───────────────────────────────────────── */

// Section titles
gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
        },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
    });
});

// Fades
gsap.utils.toArray('.gsap-reveal').forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 82%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
    });
});

// Highlights stagger
gsap.utils.toArray('.gsap-reveal-stagger').forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power3.out',
    });
});

// Skill categories
gsap.utils.toArray('.gsap-card').forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: (i % 4) * 0.12,
        ease: 'power3.out',
    });
});

// Skill tag entrance pop-ups
document.querySelectorAll('.skill-category').forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');
    ScrollTrigger.create({
        trigger: category,
        start: 'top 80%',
        onEnter: () => {
            gsap.from(tags, {
                opacity: 0,
                scale: 0.6,
                y: 15,
                stagger: 0.05,
                duration: 0.5,
                ease: 'back.out(2)',
            });
        },
    });
});

// Timeline elements
gsap.utils.toArray('.gsap-timeline-item').forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
    });

    gsap.from(el.querySelector('.timeline-content'), {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    });
});

// Timeline dots
gsap.utils.toArray('.timeline-dot').forEach(dot => {
    ScrollTrigger.create({
        trigger: dot,
        start: 'top 85%',
        onEnter: () => {
            gsap.from(dot, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(3)',
            });
        },
    });
});

// Contact section reveal
gsap.to('.contact-container', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
});

// Footer social links
gsap.from('.social-links a', {
    scrollTrigger: { trigger: 'footer', start: 'top 95%' },
    opacity: 0,
    y: 15,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power3.out',
});

/* ─────────────────────────────────────────
   15. HERO IMAGE & TEXT SCROLL PARALLAX
   ───────────────────────────────────────── */
gsap.to('#heroImageContainer', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
    },
    y: 60,
    ease: 'none',
});

gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: -30,
    opacity: 0.6,
    ease: 'none',
});

/* ─────────────────────────────────────────
   16. SKILL TAG LETTER GLOW
   ───────────────────────────────────────── */
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        gsap.fromTo(tag, 
            { boxShadow: '0 0 0px rgba(226,168,80,0)' },
            { 
                boxShadow: '0 0 15px rgba(226,168,80,0.3)',
                duration: 0.4,
                ease: 'power2.out'
            }
        );
    });
    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            boxShadow: '0 0 0px rgba(226,168,80,0)',
            duration: 0.4,
        });
    });
});

/* ─────────────────────────────────────────
   17. TILT ON HOVER (Project / Social Cards)
   ───────────────────────────────────────── */
document.querySelectorAll('.project-card, .social-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 5,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
        });
    });
});

/* ─────────────────────────────────────────
   18. LOGO SHIMMER HOVER
   ───────────────────────────────────────── */
const logo = document.getElementById('navLogo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        gsap.to(logo, { letterSpacing: '1px', duration: 0.4, ease: 'power2.out' });
    });
    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { letterSpacing: '-0.5px', duration: 0.4, ease: 'power2.out' });
    });
}

/* ─────────────────────────────────────────
   19. BACKGROUND BLOB TRIGGER TRANSITIONS
   ───────────────────────────────────────── */
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

ScrollTrigger.create({
    trigger: '#skills',
    start: 'top center',
    onEnter: () => {
        gsap.to(blob1, { left: '55%', top: '25%', duration: 3, ease: 'power2.inOut' });
    },
    onLeaveBack: () => {
        gsap.to(blob1, { left: '-10%', top: '-10%', duration: 2.5, ease: 'power2.inOut' });
    },
});

ScrollTrigger.create({
    trigger: '#projects',
    start: 'top center',
    onEnter: () => {
        gsap.to(blob2, { right: '15%', bottom: '8%', duration: 3, ease: 'power2.inOut' });
    },
});

/* ─────────────────────────────────────────
   20. SCROLL INDICATOR DISPLAY
   ───────────────────────────────────────── */
ScrollTrigger.create({
    trigger: '#about',
    start: 'top 90%',
    onEnter: () => {
        gsap.to('#scrollIndicator', { opacity: 0, duration: 0.4 });
    },
    onLeaveBack: () => {
        gsap.to('#scrollIndicator', { opacity: 0.7, duration: 0.4 });
    },
});

/* ─────────────────────────────────────────
   21. CONTACT CTA BUTTON SCALE
   ───────────────────────────────────────── */
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => {
        gsap.to(contactBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    contactBtn.addEventListener('mouseleave', () => {
        gsap.to(contactBtn, {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    });
}

/* ─────────────────────────────────────────
   22. PROJECT README MODAL FUNCTIONALITY
   ───────────────────────────────────────── */
const readmeModal = document.getElementById('readme-modal');
const modalBodyContent = document.getElementById('modal-body-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Preserve all original readme markdown/HTML content completely
const projectReadmes = {
    nexus: `
<div class="readme-content">
    <h1>🌌 Nexus — Premium Django AI Voice Assistant Platform</h1>
    <p>Nexus is a state-of-the-art, full-stack web application that combines the robust server-side capabilities of Django 6.0 with a high-end, premium Glassmorphism UI and interactive AI features. Designed with sleek futuristic aesthetics and micro-animations, Nexus offers a complete ecosystem including secure authentication, persistent neural link states, conversation session management, speech recognition (voice-to-text), and text-to-speech capabilities.</p>

    <h2>🎨 Design &amp; Aesthetic Highlights</h2>
    <p>Nexus is engineered to provide a mesmerizing user experience from the first interaction:</p>
    <ul>
        <li><strong>Neural Glassmorphism:</strong> High-fidelity translucent UI panels with subtle frosted glass filters, glowing borders, and modern depth perception.</li>
        <li><strong>Vibrant Cosmic Gradients:</strong> Dark theme aesthetics utilizing dark navy backgrounds, electric blue/cyan active accents, and shimmering text titles.</li>
        <li><strong>Animated Orbs &amp; Backdrops:</strong> Smoothly floating decorative glowing background orbs that bring the screen to life.</li>
        <li><strong>Seamless Responsiveness:</strong> Fully fluid design optimized for multi-platform operation (Desktop, Tablet, and Mobile devices) with an advanced collapsible dashboard sidebar.</li>
    </ul>

    <h2>✨ Core Features</h2>
    
    <h3>🔐 Modern Django Security &amp; Authentication</h3>
    <ul>
        <li><strong>Robust Session Auth:</strong> Integrated with Django's native authentication framework for secure login, registration, and logout operations.</li>
        <li><strong>Dynamic Auth UI:</strong> A single-page, gorgeous dual-mode authorization interface with sliding transitions to switch between Login and Signup modes seamlessly.</li>
        <li><strong>Identity Validation:</strong> Complete frontend and backend validation for passwords, neural signature matching, and username availability.</li>
    </ul>

    <h3>🧠 Intelligent Chat &amp; Conversation Ecosystem</h3>
    <ul>
        <li><strong>Simulated Intelligent Response:</strong> A robust local processing pipeline with custom simulated latency, built as a plug-and-play architecture ready for direct LLM integration.</li>
        <li><strong>Persistent Neural Sessions:</strong> Session histories are dynamically stored in browser localStorage, allowing users to create, switch between, and permanently delete past chat sessions from the sidebar.</li>
        <li><strong>Typing &amp; Connection Indicators:</strong> High-fidelity micro-animations showing connection statuses and loading states.</li>
        <li><strong>Advanced Markdown Rendering:</strong> Powered by Marked.js to render beautifully styled headers, bulleted lists, and tables inside chat messages.</li>
        <li><strong>Interactive Code Highlighting:</strong> Uses Prism.js for syntax-highlighted blocks of code, complete with single-click "Copy Code" header banners.</li>
    </ul>

    <h3>🎙️ Human-Machine Vocal Interfaces</h3>
    <ul>
        <li><strong>Vocal Interface Switch:</strong> Toggle neural voice synthesizers on or off as desired.</li>
        <li><strong>Web Speech Recognition:</strong> Real-time microphone input enabling hands-free conversation with hands-free form submissions.</li>
        <li><strong>Text-to-Speech Output:</strong> Integrated voice synthesizer reading responses back to the user utilizing premium English speech models.</li>
    </ul>

    <h3>📥 Utility Features</h3>
    <ul>
        <li><strong>Export Chats:</strong> Single-click download function allowing users to export their entire conversational log as a cleanly formatted .txt transcript.</li>
        <li><strong>Interactive Controls:</strong> Ability to copy or delete individual chat messages directly inside the stream with smooth fade-out animations.</li>
    </ul>

    <h2>🛠️ Technology Stack</h2>
    <h3>Backend</h3>
    <ul>
        <li><strong>Django 6.0.3:</strong> High-performance, secure Python web framework.</li>
        <li><strong>WhiteNoise 6.12.0:</strong> Direct, highly-optimized serving of static assets.</li>
        <li><strong>Gunicorn 25.3.0:</strong> Production-ready WSGI HTTP Server.</li>
        <li><strong>SQLite:</strong> Lightweight, zero-configuration local database engine.</li>
    </ul>
    <h3>Frontend</h3>
    <ul>
        <li><strong>HTML5 &amp; CSS3:</strong> Modern semantic layout structure with intensive custom CSS variable styling.</li>
        <li><strong>Vanilla JS (ES6+):</strong> High-performance, lightweight UI control logic.</li>
        <li><strong>Marked.js:</strong> Markdown parser.</li>
        <li><strong>Prism.js:</strong> Code block syntax highlighter.</li>
        <li><strong>Font Awesome 6.4:</strong> Premium vector icons.</li>
        <li><strong>Google Fonts:</strong> "Outfit" typography configuration for a sleek tech typeface.</li>
    </ul>

    <h2>🚀 Installation &amp; Local Execution</h2>
    <p>Follow these straightforward steps to run the Nexus platform on your local machine:</p>
    
    <h3>1. Prerequisites</h3>
    <ul>
        <li>Python 3.10 or higher</li>
        <li>Git</li>
    </ul>

    <h3>2. Clone and Setup Environment</h3>
    <pre><code># Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate</code></pre>

    <h3>3. Install Dependencies</h3>
    <pre><code>pip install -r requirements.txt</code></pre>

    <h3>4. Apply Database Migrations</h3>
    <pre><code>python manage.py migrate</code></pre>

    <h3>5. Spin Up the Development Server</h3>
    <pre><code>python manage.py runserver</code></pre>
    <p>Once initialized, open your browser and navigate to: 👉 <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000/</a></p>
</div>
`,
    gaming: `
<div class="readme-content">
    <h1>🎮 Gaming Website — Premium Django Virtual Game Store</h1>
    <p>A futuristic, feature-rich gaming platform and virtual storefront built with Django. This platform provides an immersive, state-of-the-art experience for gamers to explore, purchase, and read the latest reviews and news about video games, designed with dynamic glassmorphism and modern responsiveness.</p>

    <h2>✨ Key Features</h2>
    <ul>
        <li><strong>Storefront Catalog:</strong> Browse available games with detailed pricing, images, and descriptions.</li>
        <li><strong>Checkout System:</strong> Seamlessly place orders for different game editions (Standard, Deluxe, etc.).</li>
        <li><strong>User Library:</strong> A personal space where authenticated users can view, launch, and manage their purchased games.</li>
        <li><strong>Gaming Blog:</strong> Read and interact with the latest articles and news in the gaming world.</li>
        <li><strong>User Authentication:</strong> Secure user registration, login, and logout functionalities ("Neural ID" login system).</li>
        <li><strong>Responsive UI:</strong> A modern, dark-themed, glassmorphic design tailored specifically for modern gamers.</li>
    </ul>

    <h2>🛠️ Technology Stack</h2>
    <h3>Backend &amp; Database</h3>
    <ul>
        <li><strong>Python &amp; Django:</strong> High-performance Python web framework for robust server side logic.</li>
        <li><strong>SQLite3:</strong> Lightweight, zero-configuration local database.</li>
    </ul>
    <h3>Frontend &amp; Design</h3>
    <ul>
        <li><strong>HTML5 &amp; CSS3:</strong> Modern semantic layout with rich custom styles.</li>
        <li><strong>Bootstrap:</strong> Responsive component framework for layout structures.</li>
        <li><strong>Vanilla JS:</strong> High-performance, lightweight frontend interactive handlers.</li>
    </ul>

    <h2>🚀 Setup &amp; Local Execution</h2>
    <p>Follow these straightforward steps to run the Gaming Website on your local machine:</p>
    
    <h3>1. Prerequisites</h3>
    <ul>
        <li>Python 3.8 or higher</li>
        <li>pip (Python package installer)</li>
    </ul>

    <h3>2. Virtual Environment Setup</h3>
    <pre><code>python -m venv venv

# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate</code></pre>

    <h3>3. Install Dependencies</h3>
    <pre><code>pip install -r requirements.txt</code></pre>

    <h3>4. Run Database Migrations</h3>
    <pre><code>python manage.py migrate</code></pre>

    <h3>5. Populate Sample Data (Optional)</h3>
    <pre><code>python populate_data.py</code></pre>

    <h3>6. Start the Development Server</h3>
    <pre><code>python manage.py runserver</code></pre>
    <p>Once initialized, open your web browser and navigate to: 👉 <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000/</a></p>
</div>
`
};

document.querySelectorAll('.readme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-project');
        const html = projectReadmes[key];
        if (html) {
            modalBodyContent.innerHTML = html;
            readmeModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            lenis.stop();
        }
    });
});

function closeModal() {
    readmeModal.classList.remove('open');
    document.body.style.overflow = '';
    lenis.start();
    setTimeout(() => { modalBodyContent.innerHTML = ''; }, 400);
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

readmeModal.addEventListener('click', (e) => {
    if (e.target === readmeModal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readmeModal.classList.contains('open')) closeModal();
});

/* ─────────────────────────────────────────
   23. SMOOTH ANCHOR LINK CLICK ROUTING
   ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
        }
    });
});

/* ─────────────────────────────────────────
   24. CORE SKILLS LIST STAGGER OUT
   ───────────────────────────────────────── */
ScrollTrigger.create({
    trigger: '#skillCore',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('#skillCore .core-skills-list li', {
            opacity: 0,
            x: -25,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
        });
    },
});

/* ─────────────────────────────────────────
   25. PAGE REFRESH TRIGGERS
   ───────────────────────────────────────── */
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
