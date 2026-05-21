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
<div class="readme-content">
    <h1>Nexus – AI Voice Assistant Platform</h1>
    <h2>📋 Project Overview</h2>
    <p>Nexus is a modern, full-stack AI voice assistant web application that integrates cutting-edge AI capabilities with a sleek, responsive user interface. Powered by Groq's high-performance AI API, Nexus provides users with an intelligent conversational partner that supports voice input, code syntax highlighting, and advanced file management features.</p>
    
    <h2>✨ Key Features</h2>
    <h3>🤖 AI Capabilities</h3>
    <ul>
        <li><strong>Groq AI Integration:</strong> High-speed AI responses using Groq's API.</li>
        <li><strong>Code Syntax Highlighting:</strong> Automatic formatting for Python, JavaScript, and CSS code blocks.</li>
        <li><strong>Markdown Support:</strong> Rich text rendering with marked.js library.</li>
        <li><strong>Tool Integration:</strong> AI can execute custom tools:
            <ul>
                <li>Read files from the system</li>
                <li>Write files to the system</li>
                <li>Execute system commands</li>
            </ul>
        </li>
    </ul>

    <h3>🎙️ Voice & Interface</h3>
    <ul>
        <li><strong>Vocal Interface Toggle:</strong> Enable/disable voice-based interactions.</li>
        <li><strong>Speech Recognition:</strong> Microphone input for hands-free queries.</li>
        <li><strong>Text-to-Speech:</strong> Voice output for responses.</li>
        <li><strong>Neural Link Mode:</strong> Premium AI feature toggle for enhanced processing.</li>
    </ul>

    <h3>💬 Chat Management</h3>
    <ul>
        <li><strong>Chat History:</strong> Persistent conversation history in sidebar.</li>
        <li><strong>Clear Conversations:</strong> Reset chat history anytime.</li>
        <li><strong>Download Chat:</strong> Export conversation logs as files.</li>
        <li><strong>New Chat:</strong> Start fresh conversations.</li>
        <li><strong>Real-time Typing Indicator:</strong> Visual feedback during AI processing.</li>
    </ul>

    <h3>🎨 User Experience</h3>
    <ul>
        <li><strong>Dark/Light Theme:</strong> Toggle between theme modes.</li>
        <li><strong>Glassmorphism Design:</strong> Modern frosted glass UI elements.</li>
        <li><strong>Animated Backgrounds:</strong> Dynamic animated orb effects.</li>
        <li><strong>Responsive Layout:</strong> Works on desktop, tablet, and mobile.</li>
        <li><strong>Settings Modal:</strong> Manage API keys and preferences.</li>
    </ul>

    <h3>🔐 Authentication</h3>
    <ul>
        <li><strong>User Authentication:</strong> Login/signup system with validation.</li>
        <li><strong>Session Management:</strong> Local storage for logged-in state.</li>
        <li><strong>Secure API Key Storage:</strong> Store Groq API keys locally.</li>
    </ul>

    <h2>🛠️ Technology Stack</h2>
    <h3>Frontend</h3>
    <ul>
        <li>HTML5 - Semantic markup structure</li>
        <li>CSS3 - Modern styling with animations and transitions</li>
        <li>JavaScript (ES6+) - Vanilla JavaScript for dynamic interactions</li>
        <li>Prism.js - Code syntax highlighting library</li>
        <li>Marked.js - Markdown rendering</li>
        <li>Font Awesome 6.4 - Icon library</li>
        <li>Google Fonts - Custom typography (Outfit font family)</li>
    </ul>
    <h3>Backend</h3>
    <ul>
        <li>Python 3.x - Server-side logic</li>
        <li>Flask - Lightweight web framework</li>
        <li>Flask-CORS - Cross-Origin Resource Sharing support</li>
        <li>Groq Python SDK - AI API client</li>
        <li>Subprocess - System command execution</li>
    </ul>
    <h3>External APIs</h3>
    <ul>
        <li>Groq API - Advanced AI model inference</li>
        <li>Web Speech API - Browser voice recognition</li>
    </ul>

    <h2>📁 Project Structure</h2>
    <pre><code>ai chatgpt project/
├── index.html              # Main chat interface
├── login.html              # User authentication page
├── splash.html             # Splash/welcome screen
├── style.css               # Global styling
├── script.js               # Main application logic
├── login.js                # Authentication handler
├── test.js                 # Testing utilities
├── app.py                  # Flask backend server
├── age_calculator.py       # Age calculation utility
├── age_difference.py       # Age comparison utility
└── README.md               # Project documentation</code></pre>

    <h2>📂 File Descriptions</h2>
    <h3>Frontend Files</h3>
    <ul>
        <li><strong>index.html:</strong> Main application interface with chat box, sidebar, and settings modal. Contains glassmorphism UI components with animated background orbs. Integrates Prism.js for code highlighting and Marked.js for markdown rendering.</li>
        <li><strong>login.html:</strong> User authentication interface with form slider. Supports login and signup functionality. Styled with modern glassmorphism design.</li>
        <li><strong>splash.html:</strong> Welcome/splash screen displayed before login. First-time user experience. Redirects to login page for authentication.</li>
        <li><strong>style.css:</strong> Comprehensive styling for all pages. Responsive design breakpoints. Animations: shimmer effects, typing indicators, orb animations. Glassmorphism effects and neural design elements. Theme variables for dark/light mode.</li>
        <li><strong>script.js:</strong> Core application logic. Chat message handling and rendering. API communication with Flask backend. Voice recognition and synthesis. Settings management (theme, API keys). Chat history management. Modal interactions.</li>
        <li><strong>login.js:</strong> Authentication logic, form validation, login/signup handling, and session management with localStorage.</li>
        <li><strong>test.js:</strong> Testing utilities for development and debugging helpers.</li>
    </ul>
    <h3>Backend Files</h3>
    <ul>
        <li><strong>app.py:</strong> Flask application with REST API endpoints, CORS configuration, Groq API integration for AI chat processing, tool execution logic, and error handling. Defines tools: read_file(), write_file(), run_command().</li>
    </ul>
    <h3>Utility Files</h3>
    <ul>
        <li><strong>age_calculator.py:</strong> Calculates user age from birth date. Input: birth year, month, day. Output: Current age in years.</li>
        <li><strong>age_difference.py:</strong> Calculates age difference between two people. Utility for age comparisons.</li>
    </ul>

    <h2>🚀 Installation & Setup</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Python 3.8+</li>
        <li>Modern web browser with JavaScript enabled</li>
        <li>Groq API key</li>
    </ul>
    <h3>Backend Setup</h3>
    <ol>
        <li>Install Python Dependencies:
            <pre><code>pip install flask flask-cors groq</code></pre>
        </li>
        <li>Set Environment Variables:
            <pre><code># On Unix-like systems:
export GROQ_API_KEY="your-api-key-here"
# On Windows:
set GROQ_API_KEY=your-api-key-here</code></pre>
        </li>
        <li>Run Flask Server:
            <pre><code>python app.py</code></pre>
            Server runs on http://localhost:5000 by default.
        </li>
    </ol>
    <h3>Frontend Setup</h3>
    <ol>
        <li>Serve HTML Files:
            <pre><code>python -m http.server 8000</code></pre>
            Access at http://localhost:8000.
        </li>
        <li>Configure API Endpoint: Update the fetch URL in script.js to point to your backend. Default: http://localhost:5000/chat.</li>
    </ol>

    <h2>💻 Usage</h2>
    <ol>
        <li>Start Backend Server: <code>python app.py</code></li>
        <li>Serve Frontend: <code>python -m http.server 8000</code> (or use VS Code Live Server extension)</li>
        <li>Open in Browser: Navigate to http://localhost:8000/splash.html, complete authentication, and start chatting.</li>
    </ol>
    <h3>User Features</h3>
    <ul>
        <li><strong>Send Message:</strong> Type in input box and press Enter or click Send button.</li>
        <li><strong>Voice Chat:</strong> Click microphone icon to speak queries.</li>
        <li><strong>Theme Toggle:</strong> Use sun/moon icon to switch themes.</li>
        <li><strong>Settings:</strong> Click gear icon to manage API key.</li>
        <li><strong>Chat History:</strong> Access previous conversations from sidebar.</li>
        <li><strong>Download Chat:</strong> Export current conversation as text file.</li>
        <li><strong>Clear Chat:</strong> Remove all messages from current session.</li>
        <li><strong>Logout:</strong> End session and return to login.</li>
    </ul>

    <h2>🔌 API Endpoints</h2>
    <h3>POST /chat</h3>
    <p>Chat with AI.</p>
    <p>Request Body:</p>
    <pre><code>{
  "messages": [
    {
      "role": "user",
      "content": "Your message here"
    }
  ],
  "api_key": "your-groq-api-key"
}</code></pre>
    <p>Response:</p>
    <pre><code>{
  "response": "AI's response text",
  "tool_calls": []
}</code></pre>

    <h2>🛠️ AI Tools Available</h2>
    <ol>
        <li><strong>read_file:</strong> Reads file contents from the system. Parameters: filepath (string). Returns: File contents or error.</li>
        <li><strong>write_file:</strong> Writes or creates files on the system. Parameters: filepath (string), content (string). Returns: Success/failure.</li>
        <li><strong>run_command:</strong> Executes system commands. Parameters: command (string). Returns: Command output (STDOUT/STDERR). Timeout: 15s.</li>
    </ol>

    <h2>⚙️ Configuration</h2>
    <h3>LocalStorage Settings</h3>
    <ul>
        <li>isLoggedIn - Authentication status (true/false)</li>
        <li>groqApiKey - Stored Groq API key</li>
        <li>chatHistory - Previous conversations</li>
        <li>userTheme - Selected theme (dark/light)</li>
        <li>neuralLinkEnabled - Neural Link feature status</li>
        <li>vocalInterfaceEnabled - Voice interface status</li>
    </ul>

    <h2>🎨 Design Elements</h2>
    <h3>Color Scheme</h3>
    <ul>
        <li>Primary Background: Dark navy/black with gradient</li>
        <li>Accent Color: Cyan/electric blue for neural elements</li>
        <li>Glassmorphism: Semi-transparent frosted panels</li>
        <li>Animated Orbs: Floating background decorations</li>
    </ul>
    <h3>Typography</h3>
    <ul>
        <li>Font Family: "Outfit" from Google Fonts</li>
        <li>Weights: 300, 400, 600</li>
    </ul>
    <h3>Animations</h3>
    <ul>
        <li>Shimmer Effect: Text shimmer on titles</li>
        <li>Typing Indicator: Animated dots during processing</li>
        <li>Orb Animation: Floating background elements</li>
        <li>Transitions: Smooth CSS transitions on interactions</li>
    </ul>

    <h2>📝 Recent Features</h2>
    <ul>
        <li>Groq AI integration with function calling</li>
        <li>Voice recognition and speech synthesis</li>
        <li>Code syntax highlighting with Prism.js</li>
        <li>Chat history management</li>
        <li>Dark/light theme support</li>
        <li>Settings modal for API key management</li>
        <li>File I/O and command execution capabilities</li>
        <li>Responsive mobile design</li>
        <li>Session persistence with localStorage</li>
    </ul>

    <h2>🐛 Troubleshooting</h2>
    <ul>
        <li><strong>Issue: "API Key Invalid"</strong> - Verify your Groq API key is correct and has sufficient quota.</li>
        <li><strong>Issue: Voice Input Not Working</strong> - Enable microphone permissions in browser and ensure Web Speech API support.</li>
        <li><strong>Issue: Backend Connection Error</strong> - Verify Flask server is running and check CORS settings.</li>
        <li><strong>Issue: Messages Not Sending</strong> - Clear browser cache/localStorage and check developer console.</li>
    </ul>
</div>
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
