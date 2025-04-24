// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const currentYearEl = document.getElementById('current-year');
const contactForm = document.getElementById('contactForm');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Set current year in the footer
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Theme toggle functionality
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Initialize theme
if (themeToggle) {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  }
  
  // Theme toggle event
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
}

// Smooth scrolling
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Add active class to the clicked nav link
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
      
      // Scroll to the target section
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    }
  });
});

// Handle scroll events
function handleScroll() {
  // Change navbar style on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
  
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Animate elements on scroll
  animatedElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    if (elementPosition < windowHeight - elementVisible) {
      element.classList.add('active');
      
      // Apply delay if specified
      const delay = element.getAttribute('data-delay');
      if (delay) {
        element.style.transitionDelay = `${delay}ms`;
      }
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // This would normally send data to a backend service
    console.log('Form submitted with:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll handling
  handleScroll();
  
  // Initial animation for elements already in viewport
  setTimeout(() => {
    animatedElements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('active');
        
        // Apply delay if specified
        const delay = element.getAttribute('data-delay');
        if (delay) {
          element.style.transitionDelay = `${delay}ms`;
        }
      }
    });
  }, 100);
});