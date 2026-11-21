document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.querySelector("#backToTop");
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener("click", event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("active") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) {
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector("button[type='submit']");
    if (!submitButton) return;
    const originalLabel = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    if (status) {
      status.textContent = "";
      status.classList.remove("error");
    }
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Message submission failed");
      form.reset();
      if (status) status.textContent = "Thanks for reaching out. Your message has been sent.";
    } catch (error) {
      if (status) {
        status.textContent = "Your message could not be sent. Please try again or email me directly.";
        status.classList.add("error");
      }
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalLabel;
    }
  });

  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach(link => {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
});