/* ================================================
   NEXUS PORTFOLIO - Main JavaScript
   Interactive Functionality
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavigation();
  initScrollReveal();
  initTypingEffect();
  initHeroParticles();
  initPortfolioFilter();
  initModal();
  initForms();
  initFAQ();
  initPricingToggle();
  initSkillsAnimation();
});

/* ================================================
   CUSTOM CURSOR
   ================================================ */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-dot');
  
  if (!cursorDot || !cursorOutline) return;
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card, .portfolio-item, .blog-card, .hexagon');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('hovered');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('hovered');
    });
  });
}

/* ================================================
   NAVIGATION
   ================================================ */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav) nav.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    });
  });
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ================================================
   SCROLL REVEAL ANIMATIONS
   ================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length === 0) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* ================================================
   TYPING EFFECT
   ================================================ */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Security Expert',
    'Creative Coder'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  typeEffect();
}

/* ================================================
   HERO PARTICLE BACKGROUND
   ================================================ */
function initHeroParticles() {
  const canvas = document.querySelector('.hero-bg canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#00f0ff' : '#8b5cf6';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = 0.1 * (1 - distance / 150);
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
}

/* ================================================
   PORTFOLIO FILTER
   ================================================ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ================================================
   MODAL
   ================================================ */
function initModal() {
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!modal || portfolioItems.length === 0) return;
  
  const projectData = {
    1: {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern technologies for optimal performance.',
      client: 'Retail Corp',
      year: '2025',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://picsum.photos/800/450?random=1'
    },
    2: {
      title: 'Analytics Dashboard',
      category: 'UI/UX Design',
      description: 'A comprehensive analytics dashboard providing real-time data visualization, custom report generation, and predictive analytics. Features an intuitive drag-and-drop interface.',
      client: 'DataTech Inc',
      year: '2025',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      image: 'https://picsum.photos/800/450?random=2'
    },
    3: {
      title: 'Security Audit Tool',
      category: 'Security',
      description: 'An advanced security auditing tool that identifies vulnerabilities, generates comprehensive reports, and provides remediation recommendations. Used by Fortune 500 companies.',
      client: 'SecureNet',
      year: '2024',
      technologies: ['Go', 'Python', 'AWS', 'Docker'],
      image: 'https://picsum.photos/800/450?random=3'
    }
  };
  
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.dataset.project;
      const data = projectData[projectId];
      
      if (data) {
        document.querySelector('.modal-image img').src = data.image;
        document.querySelector('.modal-category').textContent = data.category;
        document.querySelector('.modal-title').textContent = data.title;
        document.querySelector('.modal-description').textContent = data.description;
        
        const metaItems = document.querySelectorAll('.meta-item');
        metaItems[0].querySelector('.meta-value').textContent = data.client;
        metaItems[1].querySelector('.meta-value').textContent = data.year;
        metaItems[2].querySelector('.meta-value').textContent = data.technologies.join(', ');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ================================================
   FORMS
   ================================================ */
function initForms() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;
  
  const form = contactForm;
  const formSuccess = document.querySelector('.form-success');
  const formFields = form.querySelectorAll('.form-input, .form-textarea');
  
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  
  const validators = {
    name: (value) => value.trim().length >= 2 ? '' : 'Name must be at least 2 characters',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email',
    message: (value) => value.trim().length >= 10 ? '' : 'Message must be at least 10 characters'
  };
  
  formFields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });
  
  function validateField(field) {
    const validator = validators[field.id];
    if (!validator) return true;
    
    const error = validator(field.value);
    const errorElement = field.parentElement.querySelector('.form-error');
    
    if (error) {
      field.classList.add('error');
      if (errorElement) errorElement.classList.add('show');
      if (errorElement) errorElement.textContent = error;
      return false;
    } else {
      field.classList.remove('error');
      if (errorElement) errorElement.classList.remove('show');
      return true;
    }
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    formFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        timestamp: new Date().toISOString()
      };
      
      let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push(formData);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      form.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    }
  });
  
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.project;
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (favorites.includes(projectId)) {
        favorites = favorites.filter(id => id !== projectId);
        btn.classList.remove('active');
      } else {
        favorites.push(projectId);
        btn.classList.add('active');
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
}

/* ================================================
   FAQ ACCORDION
   ================================================ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  const faqSearch = document.querySelector('.faq-search input');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* ================================================
   PRICING TOGGLE
   ================================================ */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabels = document.querySelectorAll('.toggle-label');
  
  if (!toggle) return;
  
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const yearlyPrices = document.querySelectorAll('.price-yearly');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    
    const isYearly = toggle.classList.contains('active');
    
    monthlyLabels.forEach((label, index) => {
      if (index === 0) {
        label.classList.toggle('active', !isYearly);
      } else {
        label.classList.toggle('active', isYearly);
      }
    });
    
    if (isYearly) {
      monthlyPrices.forEach(price => price.style.display = 'none');
      yearlyPrices.forEach(price => price.style.display = 'block');
    } else {
      monthlyPrices.forEach(price => price.style.display = 'block');
      yearlyPrices.forEach(price => price.style.display = 'none');
    }
  });
}

/* ================================================
   SKILLS ANIMATION
   ================================================ */
function initSkillsAnimation() {
  const skillFills = document.querySelectorAll('.skill-fill');
  
  if (skillFills.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  skillFills.forEach(fill => observer.observe(fill));
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

/* ================================================
   LOAD BLOG POSTS FROM JSON
   ================================================ */
async function loadBlogPosts() {
  const blogGrid = document.querySelector('.blog-grid');
  if (!blogGrid) return;
  
  try {
    const response = await fetch('data/projects.json');
    const data = await response.json();
    
    const blogPosts = data.blog || [];
    
    blogGrid.innerHTML = blogPosts.map(post => `
      <article class="blog-card">
        <div class="blog-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span class="blog-category">${post.category}</span>
            <span>${post.date}</span>
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="#" class="blog-link">Read More →</a>
        </div>
      </article>
    `).join('');
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

if (document.querySelector('.blog-grid')) {
  loadBlogPosts();
}