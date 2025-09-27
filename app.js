// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.9)';
  }
});

// Intersection Observer for scroll animations
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

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
  // Service cards animation
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Stats animation
  document.querySelectorAll('.stat-item').forEach((stat, index) => {
    stat.classList.add('fade-in');
    stat.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(stat);
  });

  // Section headers animation
  document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('fade-in');
    observer.observe(header);
  });

  // About content animation
  const aboutText = document.querySelector('.about-text');
  const aboutVisual = document.querySelector('.about-visual');
  
  if (aboutText && aboutVisual) {
    aboutText.classList.add('slide-in-left');
    aboutVisual.classList.add('slide-in-right');
    observer.observe(aboutText);
    observer.observe(aboutVisual);
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const formButton = contactForm.querySelector('button[type="submit"]');
  const originalText = formButton.textContent;
  
  // Show loading state
  formButton.textContent = 'Sending...';
  formButton.disabled = true;
  
  // Simulate form submission (replace with actual form handling)
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    // Reset form styles
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.classList.remove('form-success', 'form-error');
    });
    
  } catch (error) {
    // Show error message
    showNotification('There was an error sending your message. Please try again.', 'error');
  } finally {
    // Reset button
    formButton.textContent = originalText;
    formButton.disabled = false;
  }
});

// Form field validation
const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');

formFields.forEach(field => {
  field.addEventListener('blur', validateField);
  field.addEventListener('input', clearFieldError);
});

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing classes
  field.classList.remove('form-success', 'form-error');
  
  // Basic validation
  if (field.required && !value) {
    field.classList.add('form-error');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.classList.add('form-error');
      return false;
    }
  }
  
  // Success state
  if (value) {
    field.classList.add('form-success');
  }
  
  return true;
}

function clearFieldError(e) {
  const field = e.target;
  if (field.classList.contains('form-error')) {
    field.classList.remove('form-error');
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-tertiary);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-lg);
      padding: var(--spacing-4) var(--spacing-6);
      z-index: 9999;
      min-width: 300px;
      box-shadow: var(--shadow-xl);
      transform: translateX(400px);
      transition: transform 0.3s ease;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-success {
      border-left: 4px solid var(--success-color);
    }
    
    .notification-error {
      border-left: 4px solid var(--error-color);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4);
    }
    
    .notification-message {
      color: var(--text-primary);
      font-size: var(--font-size-sm);
    }
    
    .notification-close {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-close:hover {
      color: var(--text-primary);
    }
  `;
  
  // Add styles and notification to page
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Close button functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  });
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 300);
    }
  }, 5000);
}

// Animate counter numbers
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, 20);
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect(); // Only animate once
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// Add scroll-to-top functionality
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
`;

document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.opacity = '1';
    scrollToTopButton.style.transform = 'translateY(0)';
  } else {
    scrollToTopButton.style.opacity = '0';
    scrollToTopButton.style.transform = 'translateY(100px)';
  }
});

// Scroll to top functionality
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add hover effect to scroll to top button
scrollToTopButton.addEventListener('mouseenter', () => {
  scrollToTopButton.style.transform = 'translateY(0) scale(1.1)';
});

scrollToTopButton.addEventListener('mouseleave', () => {
  scrollToTopButton.style.transform = 'translateY(0) scale(1)';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.gradient-blob');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Initialize tooltips for service features
document.querySelectorAll('.service-features li').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    // Add subtle glow effect
    e.target.style.color = 'var(--success-color)';
    e.target.style.transform = 'translateX(5px)';
    e.target.style.transition = 'all 0.2s ease';
  });
  
  item.addEventListener('mouseleave', (e) => {
    e.target.style.color = 'var(--text-secondary)';
    e.target.style.transform = 'translateX(0)';
  });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Preload images for better performance (placeholder for future image additions)
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('SmartDevil website loaded successfully! 🚀');
  
  // Add smooth reveal animation to page elements
  const revealElements = document.querySelectorAll('h1, h2, h3, p, .btn, .service-card, .contact-item');
  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});