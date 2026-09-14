// Progressive enhancement flag — reveal hiding only applies when JS is alive
document.documentElement.classList.add("js");

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });
  document.querySelectorAll(".nav-links a").forEach(a =>
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    })
  );
}

// Scroll reveals (skipped for reduced motion)
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll(".reveal");
if (reduced || !("IntersectionObserver" in window)) {
  items.forEach(el => el.classList.add("in"));
} else {
  const shine = el => {
    const t = el.classList.contains("chrome") ? el : el.querySelector(".chrome:not(.sheen)");
    if (t && !t.classList.contains("sheen") && !t.classList.contains("shine-once")) {
      t.classList.add("shine-once");
    }
  };
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); shine(e.target); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach(el => io.observe(el));
}

// Before/after sliders
document.querySelectorAll(".ba-slider").forEach(sl => {
  const range = sl.querySelector(".ba-range");
  if (!range) return;
  const set = v => sl.style.setProperty("--pos", v + "%");
  range.addEventListener("input", () => set(range.value));
  set(range.value);
});

// Lightbox for gallery and pair images
(function () {
  const imgs = document.querySelectorAll(".g-slot img, .pair-card img");
  if (!imgs.length) return;
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.innerHTML = '<img alt=""><button class="lb-close">Close</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  imgs.forEach(img => img.addEventListener("click", () => {
    lbImg.src = img.src; lbImg.alt = img.alt;
    lb.classList.add("open"); document.body.style.overflow = "hidden";
  }));
  lb.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
