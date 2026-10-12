(() => {
  "use strict";
  const HOTEL_WHATSAPP = "919939217115"; // Confirm this number with the hotel before launch.
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }));
  document.getElementById("year").textContent = new Date().getFullYear();

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const checkin = document.querySelector('[name="checkin"]');
  const checkout = document.querySelector('[name="checkout"]');
  const eventDate = document.querySelector('#event-form [name="date"]');
  checkin.min = localDate;
  checkout.min = localDate;
  eventDate.min = localDate;
  checkin.addEventListener("change", () => {
    checkout.min = checkin.value || localDate;
    if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
  });

  function openWhatsApp(message) {
    const url = `https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
  document.getElementById("booking-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("checkout") <= data.get("checkin")) {
      checkout.setCustomValidity("Check-out must be after check-in.");
      checkout.reportValidity();
      checkout.setCustomValidity("");
      return;
    }
    const message = [
      "Hello Jiya Grand Hotel, I'd like to enquire about a room.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Check-in: ${data.get("checkin")}`,
      `Check-out: ${data.get("checkout")}`,
      `Guests: ${data.get("guests")}`,
      `Room preference: ${data.get("room")}`,
      `Special requests: ${data.get("requests") || "None"}`,
      "Please confirm availability, current tariff, taxes and applicable offer terms. I understand this is an enquiry, not a confirmed reservation."
    ].join("\n");
    document.getElementById("booking-message").textContent = "Opening WhatsApp with your enquiry. Please send the prefilled message to contact the hotel.";
    openWhatsApp(message);
  });
  document.getElementById("event-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Jiya Grand Hotel, I'd like to enquire about an event.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Event type: ${data.get("type")}`,
      `Event date: ${data.get("date")}`,
      `Expected guests: ${data.get("guests")}`,
      "Please confirm hall options, capacity, availability and current pricing. This is an enquiry only."
    ].join("\n");
    document.getElementById("event-message").textContent = "Opening WhatsApp with your event enquiry. Please send the prefilled message to contact the hotel.";
    openWhatsApp(message);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector("img")?.alt || "Expanded gallery image";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.querySelector("button").focus();
  }));
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox(); });

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".section-heading, .room-card, .event-card, .amenity, .gallery-item, .intro-main").forEach(el => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  // External stock photography can fail when offline; provide a neutral fallback rather than a broken icon.
  document.querySelectorAll("img").forEach(img => img.addEventListener("error", () => {
    img.style.background = "linear-gradient(135deg,#292821,#5b503b)";
    img.alt = `${img.alt} (image unavailable; replace with approved hotel photography)`;
  }, { once: true }));
})();