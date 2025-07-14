document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.createElement('button')
      const body = document.body;
    toggleBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  left: 30px;
  background-color: #00e5ff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.3);
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;
  document.body.appendChild(toggleBtn);

      // Load saved mode from localStorage
      if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark');
        toggleBtn.textContent = '🌙';
      } else {
        toggleBtn.textContent = '☀️';
      }

      toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
          localStorage.setItem('darkMode', 'enabled');
          toggleBtn.textContent = '️🌙';
        } else {
          localStorage.setItem('darkMode', 'disabled');
          toggleBtn.textContent = '☀️';
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