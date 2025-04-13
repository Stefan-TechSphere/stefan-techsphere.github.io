// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('showing');
});

// Close menu when link is clicked (mobile)
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('showing');
    });
});

// Sticky Nav Scroll Effect
window.addEventListener('scroll', () => {
    const navBar = document.querySelector('nav');
    navBar.classList.toggle('scrolled', window.scrollY > 50);
});

// Global Scroll Animation Observer with Staggered Effect
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('section, header, footer, .portfolio-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                const delayClass = `animate-delay-${(index % 5) + 1}`;
                entry.target.classList.add(delayClass);
            } else {
                entry.target.classList.remove('animate');
                for (let i = 1; i <= 5; i++) {
                    entry.target.classList.remove(`animate-delay-${i}`);
                }
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
});

// Smooth Scroll for Nav Links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('show', window.scrollY > 300);
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submission
function showSpinner(event) {
    event.preventDefault();

    const form = event.target;
    const spinner = form.querySelector('.loading-spinner');
    const button = form.querySelector('.button');
    const successMessage = form.querySelector('.form-message.success');
    const errorMessage = form.querySelector('.form-message.error');

    if (button.disabled) return;

    hideMessage(successMessage);
    hideMessage(errorMessage);

    spinner.style.display = 'block';
    spinner.classList.remove('hide');
    button.disabled = true;
    button.textContent = 'Sending...';

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        finalizeForm(data.status === 'success', form, spinner, button, successMessage, errorMessage);
    })
    .catch(() => {
        finalizeForm(false, form, spinner, button, successMessage, errorMessage);
    });
}

function finalizeForm(isSuccess, form, spinner, button, successMessage, errorMessage) {
    spinner.classList.add('hide');

    setTimeout(() => {
        spinner.style.display = 'none';
        spinner.classList.remove('hide');
        button.disabled = false;
        button.textContent = 'Send Message';

        showMessage(isSuccess ? successMessage : errorMessage, form);
    }, 500);
}

function showMessage(element, form = null) {
    element.style.display = 'block';

    // Force reflow (clean method)
    element.getBoundingClientRect();

    element.classList.add('show');

    element.style.animation = element.classList.contains('success') ? 'popIn 0.6s ease' : 'shake 0.6s ease';

    setTimeout(() => {
        hideMessage(element);
        if (element.classList.contains('success') && form) {
            setTimeout(() => {
                form.reset();
            }, 500);
        }
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }, 5000);
}

function hideMessage(element) {
    element.classList.remove('show');
    setTimeout(() => {
        element.style.display = 'none';
    }, 500);
}

// Image fade-in on load
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.fade-in-image');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });
});
