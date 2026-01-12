const roles = [
  "Content Strategist",
  "UGC Creator",
  "Podcast Host"
];

const roleText = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!deleting) {
    roleText.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => deleting = true, 1400);
    }
  } else {
    roleText.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

const statNumbers = document.querySelectorAll(".stat-number");
let statsStarted = false;

function animateStats() {
  if (statsStarted) return;
  statsStarted = true;

  statNumbers.forEach(stat => {
    const target = +stat.dataset.target;
    let current = 0;
    const increment = target / 120;

    function update() {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        stat.textContent = target.toLocaleString();
      }
    }

    update();
  });
}

const statsSection = document.querySelector(".stats-section");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    },
    { threshold: 0.4 }
  );

  statsObserver.observe(statsSection);
}

const aboutCard = document.querySelector(".about-card");

if (aboutCard) {
  document.addEventListener("mousemove", e => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    aboutCard.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });
}

const fadeElements = document.querySelectorAll(".fade");

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => fadeObserver.observe(el));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    const offset = 80; // navbar height
    const top = targetSection.offsetTop - offset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  });
});

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.35 
  }
);

sections.forEach(section => navObserver.observe(section));

const openResumeBtn = document.getElementById("openResume");
const resumeModal = document.getElementById("resumeModal");
const closeResumeBtn = document.getElementById("closeResume");

if (openResumeBtn && resumeModal && closeResumeBtn) {
  openResumeBtn.addEventListener("click", e => {
    e.preventDefault();
    resumeModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeResumeBtn.addEventListener("click", () => {
    resumeModal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  resumeModal.addEventListener("click", e => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});
