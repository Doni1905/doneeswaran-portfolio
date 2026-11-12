(() => {
  const progress = document.querySelector(".progress");
  const updateProgress = () => {
    if (!progress) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = percentage + "%";
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".site-header nav");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const cards = document.querySelectorAll(".work-card");
  if ("IntersectionObserver" in window && cards.length) {
    try {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("seen");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      cards.forEach((card) => observer.observe(card));
      document.body.classList.add("js-ready");
    } catch (error) {
      console.warn("Project reveal animation was skipped:", error);
    }
  }
})();