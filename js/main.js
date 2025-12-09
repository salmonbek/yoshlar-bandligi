// Raqamni 0 dan boshlab sanash
function animateCounter(el, duration = 1200) {
  const target = +el.dataset.target;
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value.toLocaleString("ru-RU");
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Horizontal bar-chart animatsiyasi
function animateBar(barEl, duration = 900) {
  const fill = barEl.querySelector(".metric-bar-fill");
  const label = barEl.querySelector(".bar-percent");
  const percent = parseFloat(barEl.dataset.percent) || 0;

  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = percent * progress;

    fill.style.width = current + "%";
    label.textContent = Math.round(current) + "%";

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".youth-header");
  const wrappers = document.querySelectorAll(".metric-wrapper");
  const counters = document.querySelectorAll(".counter");
  const bars = document.querySelectorAll(".metric-bar");

  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;

          // Kartalar ketma-ket chiqadi
          wrappers.forEach((wrapper) => {
            const card = wrapper.querySelector(".metric-card");
            const delay = parseInt(wrapper.dataset.delay || "0", 10);
            setTimeout(() => {
              card.classList.add("visible");
            }, delay);
          });

          // Raqamlar animatsiyasi
          counters.forEach((counter) => {
            animateCounter(counter, 1300);
          });

          // Bar-chartlar ketma-ket animatsiya
          bars.forEach((bar, index) => {
            const delay = 300 * index;
            setTimeout(() => {
              animateBar(bar, 900);
            }, delay);
          });

          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(header);
});
