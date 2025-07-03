// script.js

// Smooth scroll polyfill for older browsers
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-bar a');

function activateNavLink() {
  let scrollPos = window.scrollY || window.pageYOffset;
  sections.forEach((section, index) => {
    if (
      scrollPos >= section.offsetTop - 60 &&
      scrollPos < section.offsetTop + section.offsetHeight - 60
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateNavLink);

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '↑ Top';
backToTopBtn.id = 'backToTop';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #00e5ff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  color: #003f4a;
  font-weight: bold;
  cursor: pointer;
  display: none;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,229,255,0.5);
`;
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Dark/Light mode toggle
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Toggle Light/Dark Mode';
toggleBtn.id = 'themeToggle';
toggleBtn.setAttribute('aria-label', 'Toggle light and dark mode');
toggleBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  left: 30px;
  background-color: #00e5ff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  color: #003f4a;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,229,255,0.5);
`;
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// typing.js
const text = "Muhammad Uzair";
const typedTextSpan = document.getElementById("typed-text");
const typingDelay = 150; // ms per character
let charIndex = 0;

function type() {
  if (charIndex < text.length) {
    typedTextSpan.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typedTextSpan.textContent = "";
  type();
});
