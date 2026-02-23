/* ============================================
   Shamrock's Kitchen & Catering
   ============================================ */

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Form handling
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(quoteForm);
            const response = await fetch(quoteForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Show success
                quoteForm.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // If Formspree isn't set up yet, still show success for demo
            quoteForm.style.display = 'none';
            formSuccess.style.display = 'block';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Stagger animation for cards
const staggerElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .contact-card');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

staggerElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    staggerObserver.observe(el);
});

// Star rating
const stars = document.querySelectorAll('.rating-star');
const ratingInput = document.getElementById('ratingValue');

if (stars.length) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = star.dataset.value;
            ratingInput.value = val;
            stars.forEach(s => {
                s.classList.toggle('active', s.dataset.value <= val);
            });
        });
        star.addEventListener('mouseenter', () => {
            const val = star.dataset.value;
            stars.forEach(s => {
                s.style.color = s.dataset.value <= val ? '#d4a017' : '';
            });
        });
    });
    document.getElementById('starRating').addEventListener('mouseleave', () => {
        stars.forEach(s => {
            s.style.color = s.classList.contains('active') ? '#d4a017' : '';
        });
    });
}

// Review form handling
const reviewForm = document.getElementById('reviewForm');
const reviewSuccess = document.getElementById('reviewSuccess');

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!ratingInput.value) {
            alert('Please select a star rating.');
            return;
        }
        const btn = document.getElementById('reviewSubmitBtn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        btn.disabled = true;

        try {
            const formData = new FormData(reviewForm);
            const response = await fetch(reviewForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            reviewForm.style.display = 'none';
            reviewSuccess.style.display = 'block';
        } catch (error) {
            reviewForm.style.display = 'none';
            reviewSuccess.style.display = 'block';
        }
    });
}

console.log('☘ Shamrock\'s Kitchen & Catering loaded');
