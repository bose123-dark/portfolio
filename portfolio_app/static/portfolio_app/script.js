// ==========================================
// Typing Effect for Hero Section
// ==========================================
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer", "AI Enthusiast", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// ==========================================
// Advanced Scroll Animations (IntersectionObserver)
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-scroll');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe all elements with hidden-scroll class
document.querySelectorAll('.hidden-scroll').forEach((el) => {
    observer.observe(el);
});

// Initial hero animations
window.addEventListener('load', () => {
    document.querySelectorAll('.hidden-initial').forEach((el) => {
        setTimeout(() => {
            el.classList.add('show-scroll');
        }, 100);
    });
});

// ==========================================
// Navbar Scroll Effect & Active Links
// ==========================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar styling on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// README Modals Logic
// ==========================================
const readmeModal = document.getElementById('readme-modal');
const modalBodyContent = document.getElementById('modal-body-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

const projectReadmes = {
    nexus: `
     🌌 Nexus — Premium Django AI Voice Assistant Platform
Nexus is a state-of-the-art, full-stack web application that combines the robust server-side capabilities of Django 6.0 with a high-end, premium Glassmorphism UI and interactive AI features. Designed with sleek futuristic aesthetics and micro-animations, Nexus offers a complete ecosystem including secure authentication, persistent neural link states, conversation session management, speech recognition (voice-to-text), and text-to-speech capabilities.

🎨 Design & Aesthetic Highlights
Nexus is engineered to provide a mesmerizing user experience from the first interaction:

Neural Glassmorphism: High-fidelity translucent UI panels with subtle frosted glass filters, glowing borders, and modern depth perception.
Vibrant Cosmic Gradients: Dark theme aesthetics utilizing dark navy backgrounds, electric blue/cyan active accents, and shimmering text titles.
Animated Orbs & Backdrops: Smoothly floating decorative glowing background orbs that bring the screen to life.
Seamless Responsiveness: Fully fluid design optimized for multi-platform operation (Desktop, Tablet, and Mobile devices) with an advanced collapsible dashboard sidebar.
✨ Core Features
🔐 Modern Django Security & Authentication
Robust Session Auth: Integrated with Django's native authentication framework for secure login, registration, and logout operations.
Dynamic Auth UI: A single-page, gorgeous dual-mode authorization interface with sliding transitions to switch between Login and Signup modes seamlessly.
Identity Validation: Complete frontend and backend validation for passwords, neural signature matching, and username availability.
🧠 Intelligent Chat & Conversation Ecosystem
Simulated Intelligent Response: A robust local processing pipeline with custom simulated latency, built as a plug-and-play architecture ready for direct LLM integration.
Persistent Neural Sessions: Session histories are dynamically stored in browser localStorage, allowing users to create, switch between, and permanently delete past chat sessions from the sidebar.
Typing & Connection Indicators: High-fidelity micro-animations showing connection statuses and loading states.
Advanced Markdown Rendering: Powered by Marked.js to render beautifully styled headers, bulleted lists, and tables inside chat messages.
Interactive Code Highlighting: Uses Prism.js for syntax-highlighted blocks of code, complete with single-click "Copy Code" header banners.
🎙️ Human-Machine Vocal Interfaces
Vocal Interface Switch: Toggle neural voice synthesizers on or off as desired.
Web Speech Recognition: Real-time microphone input enabling hands-free conversation with hands-free form submissions.
Text-to-Speech Output: Integrated voice synthesizer reading responses back to the user utilizing premium English speech models.
📥 Utility Features
Export Chats: Single-click download function allowing users to export their entire conversational log as a cleanly formatted .txt transcript.
Interactive Controls: Ability to copy or delete individual chat messages directly inside the stream with smooth fade-out animations.
🛠️ Technology Stack
Backend
Django 6.0.3: High-performance, secure Python web framework.
WhiteNoise 6.12.0: Direct, highly-optimized serving of static assets.
Gunicorn 25.3.0: Production-ready WSGI HTTP Server.
SQLite: Lightweight, zero-configuration local database engine.
Frontend
HTML5 & CSS3: Modern semantic layout structure with intensive custom CSS variable styling.
Vanilla JS (ES6+): High-performance, lightweight UI control logic.
Marked.js: Markdown parser.
Prism.js: Code block syntax highlighter.
Font Awesome 6.4: Premium vector icons.
Google Fonts: "Outfit" typography configuration for a sleek tech typeface.
📁 Repository Directory Structure
ai-chatgpt-project/
├── core/
│   ├── static/
│   │   ├── script.js          # Core application logic & UI handlers
│   │   └── style.css           # Premium glassmorphic styles & keyframe animations
│   ├── templates/
│   │   ├── auth.html          # Dual login/registration interface
│   │   ├── index.html         # Main dashboard and chat view
│   │   └── splash.html        # Futuristic entry screen
│   ├── migrations/            # Django database migrations
│   ├── admin.py               # Django admin configurations
│   ├── apps.py                # Core application declaration
│   ├── models.py              # Custom models structure
│   ├── urls.py                # App routing configuration
│   └── views.py               # Authentication and page controllers
├── nexus_project/             # Main Django Project Configuration
│   ├── asgi.py
│   ├── settings.py            # Global settings (WhiteNoise, auth configs)
│   ├── urls.py                # Core system router
│   └── wsgi.py
├── age_calculator.py          # Utility script for computing exact age
├── age_difference.py          # Utility script for comparing ages
├── build.sh                   # Deployment automation script
├── db.sqlite3                 # Local database storage
├── manage.py                  # Django CLI entrypoint
├── Procfile                   # Production process runner definition
└── requirements.txt           # Python dependency file
🚀 Installation & Local Execution
Follow these straightforward steps to run the Nexus platform on your local machine:

1. Prerequisites
Ensure you have the following installed:

Python 3.10 or higher
Git
2. Clone and Setup Environment
Navigate to the directory in your terminal and create a Python virtual environment:

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
3. Install Dependencies
Install all required libraries specified in the project manifest:

pip install -r requirements.txt
4. Apply Database Migrations
Initialize your database and apply all default schemas:

python manage.py migrate
5. Create a Superuser (Optional)
To access the Django Admin Dashboard at /admin/, register an administrator:

python manage.py createsuperuser
6. Spin Up the Development Server
Run the local server:

python manage.py runserver
Once initialized, open your browser and navigate to: 👉 http://127.0.0.1:8000/

☁️ Production Deployment
Nexus is fully configured for continuous integration and direct cloud deployment platforms like Render, Heroku, or Railway:

Build Script (build.sh)
When deploying, the host platform executes build.sh automatically to manage build phases:

#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
Production WSGI (Procfile)
The application includes a Procfile designating Gunicorn to orchestrate the web worker processes:

web: gunicorn nexus_project.wsgi
⚙️ Configuration & Key Settings
nexus_project/settings.py highlights:
Static Asset Handling: WhiteNoiseMiddleware is positioned directly below SecurityMiddleware for lightning-fast compression and caching of frontend resources.
Security Features: Includes configurable CSRF_TRUSTED_ORIGINS and redirects for standard django authentication variables:
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'index'
LOGOUT_REDIRECT_URL = 'login'
📖 Feature Walkthrough & Operations
Welcome: Navigate to http://127.0.0.1:8000/ to experience the beautiful splash screen. Click Initialize Connection to enter the Auth terminal.
Authentication: Switch between login and signup in auth.html using the smooth toggle slider. Register a new user profile and log in.
Neural Interface: Once loaded, click the Neural Link toggle on the bottom left sidebar to connect. This simulates an neural alignment and unlocks the prompt console!
Hands-Free Chatting: Click the Microphone icon to grant browser permissions, speak your message, and watch it auto-submit when you finish talking. Toggle the Vocal Interface switch to have the assistant read its output back to you.
Export Logs: At any point, hit the Download Chat button on the bottom of the page to download your session transcripts.
`,
    gaming: `
<div class="readme-content">
    <h1>Gaming Website</h1>
    <p>A futuristic gaming website built with Django. This platform provides an immersive experience for gamers to browse, purchase, and read the latest news about video games.</p>

    <h2>✨ Features</h2>
    <ul>
        <li><strong>Store:</strong> Browse available games for purchase.</li>
        <li><strong>Checkout System:</strong> Seamlessly place orders for different game editions (Standard, Deluxe, etc.).</li>
        <li><strong>User Library:</strong> A personal space where authenticated users can view their purchased games.</li>
        <li><strong>Gaming Blog:</strong> Read the latest articles and news in the gaming world.</li>
        <li><strong>User Authentication:</strong> Secure user registration, login, and logout functionalities ("Neural ID" login system).</li>
        <li><strong>Responsive UI:</strong> A modern, dark-themed, glassmorphic design tailored for gamers.</li>
    </ul>

    <h2>🛠️ Technologies Used</h2>
    <ul>
        <li><strong>Backend:</strong> Python, Django</li>
        <li><strong>Database:</strong> SQLite3 (default for Django)</li>
        <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript</li>
        <li><strong>Deployment:</strong> Configured for deployment (includes Procfile and build.sh)</li>
    </ul>

    <h2>📁 Project Structure</h2>
    <pre><code>gamingproject/       # Main Django project configuration
gameapp/             # Core application (models, views, templates)
├── models.py        # Post (blog) and Order (purchases) models
├── views.py         # Views logic (index, store, blog, login, library, etc.)
├── templates/       # HTML templates for the website
└── static/          # Static files (CSS, JS, images)
populate_data.py     # Script to populate the database with initial sample data</code></pre>

    <h2>🚀 Setup Instructions</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Python 3.8+</li>
        <li>pip (Python package installer)</li>
    </ul>
    <h3>Installation</h3>
    <ol>
        <li>Navigate to the project directory:
            <pre><code>cd "Gaming Website"</code></pre>
        </li>
        <li>Create a virtual environment:
            <pre><code>python -m venv venv</code></pre>
        </li>
        <li>Activate the virtual environment:
            <pre><code># On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>pip install -r requirements.txt</code></pre>
        </li>
        <li>Apply database migrations:
            <pre><code>python manage.py migrate</code></pre>
        </li>
        <li>(Optional) Populate sample data:
            <pre><code>python populate_data.py</code></pre>
        </li>
        <li>(Optional) Create a superuser for admin access:
            <pre><code>python manage.py createsuperuser</code></pre>
        </li>
        <li>Run development server:
            <pre><code>python manage.py runserver</code></pre>
        </li>
        <li>Access application: Open browser and go to <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000/</a></li>
    </ol>

    <h2>⚙️ Admin Panel</h2>
    <p>You can access the Django admin panel by navigating to <a href="http://127.0.0.1:8000/admin/" target="_blank">http://127.0.0.1:8000/admin/</a> and logging in with your superuser credentials. From there, you can manage users, blog posts, and orders.</p>
</div>
`
};

document.querySelectorAll('.readme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectKey = btn.getAttribute('data-project');
        const readmeHTML = projectReadmes[projectKey];
        if (readmeHTML) {
            modalBodyContent.innerHTML = readmeHTML;
            readmeModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Stop page scrolling
        }
    });
});

function closeModal() {
    readmeModal.classList.remove('open');
    document.body.style.overflow = ''; // Restore page scrolling
    setTimeout(() => {
        modalBodyContent.innerHTML = '';
    }, 400); // Wait for transition animation to end
}

modalCloseBtn.addEventListener('click', closeModal);

// Close on clicking backdrop
readmeModal.addEventListener('click', (e) => {
    if (e.target === readmeModal) {
        closeModal();
    }
});

// Close on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readmeModal.classList.contains('open')) {
        closeModal();
    }
});
