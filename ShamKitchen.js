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

// Both forms use the catering team's Formspree inbox.
function connectForm(form, successPanel) {
    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.querySelector('.btn-text');
    const loadingText = button.querySelector('.btn-loading');
    const errorMessage = form.querySelector('.form-error');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (button.disabled) return;

        button.disabled = true;
        buttonText.style.display = 'none';
        loadingText.style.display = 'inline';
        errorMessage.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error('Submission was rejected');

            form.hidden = true;
            successPanel.hidden = false;
            successPanel.focus();
        } catch {
            errorMessage.textContent = 'We couldn’t confirm your submission. Your answers are still here. Please try again.';
        } finally {
            button.disabled = false;
            buttonText.style.display = '';
            loadingText.style.display = 'none';
        }
    });
}

connectForm(document.getElementById('quoteForm'), document.getElementById('formSuccess'));
connectForm(document.getElementById('reviewForm'), document.getElementById('reviewSuccess'));

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

console.log('☘ Shamrock\'s Kitchen & Catering loaded');
