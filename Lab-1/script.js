const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const bmiBtn = document.getElementById('calculateBmi');
const membershipBtn = document.getElementById('calculateMembership');
const faqQuestions = document.querySelectorAll('.faq-question');
const testimonials = document.querySelectorAll('.testimonial');
const animatedElements = document.querySelectorAll('[data-animate]');
const counters = document.querySelectorAll('.counter');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const navAnchors = document.querySelectorAll('.nav-links a');
navAnchors.forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
  });
}

if (bmiBtn) {
  bmiBtn.addEventListener('click', () => {
    const weight = Number(document.getElementById('weight').value);
    const heightCm = Number(document.getElementById('height').value);
    const result = document.getElementById('bmiResult');

    if (!weight || !heightCm) {
      result.textContent = 'Please enter valid values for both fields.';
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese';
    result.textContent = `Your BMI is ${bmi.toFixed(1)} — ${category}.`;
  });
}

if (membershipBtn) {
  membershipBtn.addEventListener('click', () => {
    const planPrice = Number(document.getElementById('planSelect').value);
    const months = Number(document.getElementById('monthsInput').value);
    const result = document.getElementById('membershipResult');

    if (!months || months < 1) {
      result.textContent = 'Please enter a valid number of months.';
      return;
    }

    const total = planPrice * months;
    result.textContent = `Total for ${months} month(s): ₹${total.toLocaleString('en-IN')}`;
  });
}

faqQuestions.forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    parent.classList.toggle('active');
  });
});

if (testimonials.length) {
  let testimonialIndex = 0;
  setInterval(() => {
    testimonials[testimonialIndex].classList.remove('active');
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].classList.add('active');
  }, 3000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

animatedElements.forEach((el) => observer.observe(el));

counters.forEach((counter) => {
  const target = Number(counter.dataset.target || 0);
  const count = () => {
    const increment = Math.ceil(target / 50);
    const current = Number(counter.textContent);
    if (current < target) {
      counter.textContent = Math.min(current + increment, target);
    } else {
      counter.textContent = target;
      clearInterval(timer);
    }
  };
  const timer = setInterval(count, 40);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTop?.classList.add('show');
  } else {
    scrollTop?.classList.remove('show');
  }
});

scrollTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 10);
const countdownEl = document.getElementById('countdown');

if (countdownEl) {
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownTarget - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    countdownEl.innerHTML = `<span>${days}d</span><span>${hours}h</span><span>${minutes}m</span><span>${seconds}s</span>`;
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img alt="Expanded gallery image" />';
document.body.appendChild(lightbox);

const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightboxImage = lightbox.querySelector('img');

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightbox.classList.add('open');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing to FitnessHub updates!');
    form.reset();
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your request has been submitted successfully.');
    contactForm.reset();
  });
}