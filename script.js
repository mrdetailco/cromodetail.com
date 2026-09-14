
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

// One-shot chrome sheen when headlines scroll in
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const shine = el => {
    const t = el.classList.contains("chrome") ? el : el.querySelector(".chrome:not(.sheen)");
    if (t && !t.classList.contains("sheen")) t.classList.add("shine-once");
  };
  new MutationObserver(muts => muts.forEach(m => {
    if (m.target.classList.contains("in")) shine(m.target);
  })).observe(document.body, { subtree: true, attributeFilter: ["class"] });
})();
