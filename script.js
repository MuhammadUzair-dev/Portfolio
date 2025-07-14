document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'darkModeToggle';
  toggleBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(toggleBtn);

  // Function to apply dark mode
  function enableDarkMode() {
    body.classList.add('dark');
    toggleBtn.textContent = '🌙';
    localStorage.setItem('darkMode', 'enabled');
  }

  // Function to disable dark mode
  function disableDarkMode() {
    body.classList.remove('dark');
    toggleBtn.textContent = '☀️';
    localStorage.setItem('darkMode', 'disabled');
  }

  // Check localStorage for user preference
  const savedMode = localStorage.getItem('darkMode');

  if (savedMode === 'enabled') {
    enableDarkMode();
  } else if (savedMode === 'disabled') {
    disableDarkMode();
  } else {
    // No saved preference, detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }

  // Listen for toggle button click
  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Optional: Listen for system preference changes and update if no user override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
});

  // Fetch GitHub projects
  const githubProjectsContainer = document.getElementById('github-projects');
  const githubUsername = 'MuhammadUzair-dev'; // Replace with your GitHub username

  if (githubProjectsContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then(response => {
        if (!response.ok) {
          throw new Error('GitHub API error');
        }
        return response.json();
      })
      .then(repos => {
        githubProjectsContainer.innerHTML = ''; // Clear loading text
        if (repos.length === 0) {
          githubProjectsContainer.innerHTML = '<p>No projects found.</p>';
          return;
        }

        repos.forEach(repo => {
          const projectCard = document.createElement('a');
          projectCard.href = repo.html_url;
          projectCard.target = '_blank';
          projectCard.rel = 'noopener noreferrer';
          projectCard.className = 'project-card';
          projectCard.setAttribute('aria-label', `GitHub project: ${repo.name}`);

          projectCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : 'No description provided.'}</p>
            <span>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
          `;

          githubProjectsContainer.appendChild(projectCard);
        });
      })
      .catch(error => {
        githubProjectsContainer.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
      });
  }
  
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
  background-color: rgba(61, 33, 26, 0.7);
  color: #F5F5DC;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  display: none;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(61, 33, 26, 0.5);
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

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-up');

  // IntersectionObserver to add 'visible' class when element enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));

  // Handle nav link clicks to scroll and trigger animation after scroll ends
  const navLinks = document.querySelectorAll('.nav-bar a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // Scroll to the section with offset for sticky navbar
      const yOffset = -150; // Adjust to navbar height
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      // After scroll ends, trigger fade-up animations inside the target section
    });
  });
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const status = document.getElementById('form-status');

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        status.textContent ="Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "Failed to send message. Try again.";
      }
    })
    .catch(() => {
      status.textContent = "Error sending message.";
    });
  });
