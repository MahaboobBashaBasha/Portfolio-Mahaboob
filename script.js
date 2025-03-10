// Navigation scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    this.reset();
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Scroll reveal animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
}); 

// Form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message';
    form.appendChild(statusMessage);

    // Disable submit button and show loading state
    submitButton.disabled = true;
    statusMessage.textContent = 'Sending message...';

    try {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Replace this URL with your actual backend endpoint
        const response = await fetch('YOUR_BACKEND_API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Success message
       /* The code snippet `statusMessage.textContent = 'Message sent successfully!'; statusMessage.style.color = 'green'; form.reset();` is performing the following actions: */
        statusMessage.textContent = 'Message sent successfully!';
        statusMessage.style.color = 'green';
        form.reset();

    } catch (error) {
        // Error message
        statusMessage.textContent = 'Failed to send message. Please try again later.';
        statusMessage.style.color = 'red';
        console.error('Error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = true;
        
        // Remove status message after 5 seconds
        setTimeout(() => {
            statusMessage.remove();
        }, 5000);
    }
});
// Add this to your existing script.js

// Project cards animation on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Enhanced form submission with better feedback
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;
    }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// AI Chat Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-message');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            // Simulate AI response
            setTimeout(() => {
                addMessage('Thanks for your message! This is a demo response.');
            }, 1000);
        }
    }

    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});

// Scroll to top functionality
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chat Widget Functions
// Chat functionality
function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatTrigger = document.querySelector('.chat-trigger');
    
    chatWidget.classList.toggle('active');
    
    if (chatWidget.classList.contains('active')) {
        chatTrigger.style.display = 'none';
    } else {
        chatTrigger.style.display = 'flex';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('user-message');
    const message = messageInput.value.trim().toLowerCase();
    
    if (message) {
        addMessage(messageInput.value.trim(), 'user-message');
        messageInput.value = '';
        
        // Generate contextual AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addMessage(aiResponse, 'ai-message');
        }, 800);
    }
}

function generateAIResponse(message) {
    // Basic conversation
    if (message.match(/^(hi|hello|hey|greetings)/i)) {
        return "Hello! I'm happy to see you. How can I assist you today?";
    }
    
    if (message.match(/how are you/i)) {
        return "I'm doing great, thank you for asking! How can I help you today?";
    }
    
    if (message.match(/what('s| is) your name/i)) {
        return "I'm the AI Assistant for Shaik Mahaboob Basha's portfolio. Nice to meet you!";
    }
    
    if (message.match(/who (created|made) you/i)) {
        return "I was created to assist visitors with Shaik Mahaboob Basha's portfolio website.";
    }

    if (message.match(/what can you do/i)) {
        return "I can help you learn about Shaik's projects, skills, experience, and education. I can also help you find his resume or contact information. What would you like to know?";
    }

    if (message.match(/good (morning|afternoon|evening|night)/i)) {
        return "Good day! How may I assist you with exploring the portfolio?";
    }

    if (message.match(/bye|goodbye|see you/i)) {
        return "Goodbye! Feel free to come back if you have more questions. Have a great day!";
    }

    // Existing responses for projects, skills, etc...
    if (message.includes('project') || message.includes('projects')) {
        return "I can see you have several impressive projects including an E-commerce Website, Responsive Fruits and Vegetables site, TODO-LIST Application, and a Calculator Application. Which one would you like to know more about?";
    }
    
    // Skills related queries
    if (message.includes('skill') || message.includes('skills')) {
        return "Your skills include HTML, CSS, JavaScript, Java, MySQL, and Spring Boot. Would you like to know more about any specific technology?";
    }
    
    // Contact related queries
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
        return "You can get in touch through the contact form at the bottom of the page. Would you like me to scroll there for you?";
    }
    
    // Resume related queries
    if (message.includes('resume') || message.includes('cv')) {
        return "You can view or download the resume from the navigation menu. Would you like me to help you locate it?";
    }
    
    // Experience related queries
    if (message.includes('experience') || message.includes('work') || message.includes('internship')) {
        return "You have valuable experience from internships at ExcelR and TAP Academy, where you worked on scalable web applications and database integration. Would you like more specific details?";
    }
    
    // Education related queries
    if (message.includes('education') || message.includes('study') || message.includes('degree')) {
        return "You are a final-year B.Tech student in Computer Science Engineering. Would you like to know more about your academic background?";
    }
    
    // Thank you messages
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Default response for unrecognized queries
    return "I understand you're interested in knowing more. Could you please be more specific about what information you're looking for? I can tell you about the projects, skills, experience, or help you get in touch.";
}

function addMessage(text, className) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Allow sending message with Enter key
document.getElementById('user-message')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function closeChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatTrigger = document.querySelector('.chat-trigger');
    
    chatWidget.classList.remove('active');
    chatTrigger.style.display = 'flex';
    
    // Reset chat messages
    document.getElementById('chat-messages').innerHTML = `
        <div class="message ai-message">
            <p>Hi! I'm your AI assistant. How can I help you today?</p>
        </div>
    `;
}
