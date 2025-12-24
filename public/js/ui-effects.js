// UI Effects: scroll reveal, magnetic buttons, add-to-cart fly animation
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("revealed"));
  }

  // Magnetic button hover effect
  const magnets = document.querySelectorAll(".btn-magnetic");
  magnets.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.06}px, ${
        y * 0.06
      }px) scale(1.02)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });

  // Add-to-cart fly animation
  const cartIcon =
    document.querySelector('a[href="/cart"]') ||
    document.querySelector(".bi-cart3")?.closest("a");
  document
    .querySelectorAll('form[action^="/cart/add"] button, .add-to-cart-btn')
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        try {
          const form = btn.closest("form");
          const img = form
            ? form.closest(".product-card")?.querySelector("img")
            : document.querySelector(".product-card img");
          if (!img || !cartIcon) return;
          const fly = img.cloneNode(true);
          const rect = img.getBoundingClientRect();
          fly.style.position = "fixed";
          fly.style.left = rect.left + "px";
          fly.style.top = rect.top + "px";
          fly.style.width = rect.width + "px";
          fly.style.height = rect.height + "px";
          fly.classList.add("fly-image");
          document.body.appendChild(fly);
          const cartRect = cartIcon.getBoundingClientRect();
          requestAnimationFrame(() => {
            fly.style.transform = `translate(${
              cartRect.left - rect.left + cartRect.width / 2
            }px, ${
              cartRect.top - rect.top + cartRect.height / 2
            }px) scale(0.15)`;
            fly.style.opacity = "0.3";
          });
          setTimeout(() => fly.remove(), 800);
        } catch (err) {
          // ignore animation errors
        }
      });
    });
});
