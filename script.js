
/* =========================================================
   JIYA GRAND HOTEL
   Premium Luxury Website — Main JavaScript
   ========================================================= */

/* Enable scroll-reveal styles when JavaScript is available. */
document.documentElement.classList.add("lux-js");

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. CONFIGURATION
       ===================================================== */

    /*
       Use the hotel's confirmed WhatsApp number.
       Country code included; do not include + or spaces.
    */

    const HOTEL_WHATSAPP_NUMBER = "919939217115";


    /* =====================================================
       2. COMMON ELEMENTS
       ===================================================== */

    const body = document.body;

    const header = document.getElementById("lux-header");

    const loader = document.getElementById("lux-loader");

    const menuToggle = document.getElementById("lux-menu-toggle");

    const navigation = document.getElementById("lux-navigation");


    /* =====================================================
       3. PAGE LOADER
       ===================================================== */

    let loaderHidden = false;

    function hideLoader() {

        if (!loader || loaderHidden) return;

        loaderHidden = true;

        loader.classList.add("is-hidden");

        loader.setAttribute("aria-hidden", "true");

    }

    /*
       Hide when the page finishes loading.
       The timeout prevents the loader from staying visible
       indefinitely if an external image loads slowly.
    */

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener("load", hideLoader, {
            once: true
        });

        window.setTimeout(hideLoader, 2200);

    }


    /* =====================================================
       4. MOBILE NAVIGATION
       ===================================================== */

    function closeNavigation() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        body.classList.remove("lux-menu-open");

    }


    function openNavigation() {

        if (!menuToggle || !navigation) return;

        navigation.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        body.classList.add("lux-menu-open");

    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (expanded) {
                closeNavigation();
            } else {
                openNavigation();
            }

        });


        /*
           Close the menu when a navigation link is clicked.
        */

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeNavigation);

        });


        /*
           Close the menu when clicking outside it.
        */

        document.addEventListener("click", function (event) {

            const clickedMenu =
                navigation.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedMenu && !clickedToggle) {
                closeNavigation();
            }

        });


        /*
           Restore the desktop navigation state on resize.
        */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {
                closeNavigation();
            }

        });

    }


    /* =====================================================
       5. STICKY HEADER EFFECT
       ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add("is-scrolled");

        } else {

            header.classList.remove("is-scrolled");

        }

    }


    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       6. CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById("lux-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =====================================================
       7. LOCAL DATE HELPERS
       ===================================================== */

    function formatLocalDate(date) {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    function getToday() {

        return formatLocalDate(new Date());

    }


    function getTomorrow() {

        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        return formatLocalDate(tomorrow);

    }


    function getDayAfter(dateString) {

        const date = new Date(dateString + "T12:00:00");

        date.setDate(date.getDate() + 1);

        return formatLocalDate(date);

    }


    /* =====================================================
       8. ROOM BOOKING DATE VALIDATION
       ===================================================== */

    const bookingForm = document.getElementById("lux-booking-form");

    const bookingStatus = document.getElementById("lux-booking-status");


    if (bookingForm) {

        const checkinInput =
            bookingForm.elements.namedItem("checkin");

        const checkoutInput =
            bookingForm.elements.namedItem("checkout");


        function updateBookingDates() {

            const today = getToday();

            checkinInput.min = today;

            /*
               Check-out must be at least one day after check-in.
            */

            checkoutInput.min = checkinInput.value
                ? getDayAfter(checkinInput.value)
                : getTomorrow();


            if (
                checkinInput.value &&
                checkinInput.value < today
            ) {

                checkinInput.setCustomValidity(
                    "Arrival date cannot be in the past."
                );

            } else {

                checkinInput.setCustomValidity("");

            }


            if (
                checkoutInput.value &&
                checkinInput.value &&
                checkoutInput.value <= checkinInput.value
            ) {

                checkoutInput.setCustomValidity(
                    "Departure date must be after arrival date."
                );

            } else {

                checkoutInput.setCustomValidity("");

            }

        }


        checkinInput.addEventListener(
            "change",
            updateBookingDates
        );

        checkoutInput.addEventListener(
            "change",
            updateBookingDates
        );


        checkinInput.addEventListener("input", function () {

            checkinInput.setCustomValidity("");

        });


        checkoutInput.addEventListener("input", function () {

            checkoutInput.setCustomValidity("");

        });


        updateBookingDates();

    }


    /* =====================================================
       9. EVENT DATE VALIDATION
       ===================================================== */

    const eventForm = document.getElementById("lux-event-form");

    const eventStatus = document.getElementById("lux-event-status");


    if (eventForm) {

        const eventDateInput =
            eventForm.elements.namedItem("eventDate");


        eventDateInput.min = getToday();


        eventDateInput.addEventListener("change", function () {

            if (
                eventDateInput.value &&
                eventDateInput.value < getToday()
            ) {

                eventDateInput.setCustomValidity(
                    "Please select today or a future date."
                );

            } else {

                eventDateInput.setCustomValidity("");

            }

        });

    }


    /* =====================================================
       10. WHATSAPP MESSAGE BUILDER
       ===================================================== */

    function openWhatsApp(message, statusElement) {

        if (
            !/^[1-9]\d{7,14}$/.test(HOTEL_WHATSAPP_NUMBER)
        ) {

            if (statusElement) {

                statusElement.textContent =
                    "The hotel's WhatsApp number needs to be configured.";

            }

            return;

        }


        const whatsappURL =
            "https://wa.me/" +
            HOTEL_WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);


        /*
           Called directly from form submission so the browser
           can associate the new tab with the user interaction.
        */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        if (statusElement) {

            statusElement.textContent =
                "Your enquiry message has been prepared for WhatsApp. " +
                "Check the new tab, review the details, and press Send. " +
                "Your booking is not confirmed until the hotel confirms it.";

        }

    }


    /* =====================================================
       11. ROOM BOOKING FORM
       ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /*
               Always check the browser's built-in validation.
            */

            if (!bookingForm.checkValidity()) {

                bookingForm.reportValidity();

                return;

            }


            const formData = new FormData(bookingForm);


            const name =
                String(formData.get("name") || "").trim();

            const phone =
                String(formData.get("phone") || "").trim();

            const checkin =
                String(formData.get("checkin") || "");

            const checkout =
                String(formData.get("checkout") || "");

            const guests =
                String(formData.get("guests") || "");

            const room =
                String(formData.get("room") || "");

            const requests =
                String(formData.get("requests") || "").trim();


            /*
               Secondary date validation.
            */

            if (checkin < getToday() || checkout <= checkin) {

                if (bookingStatus) {

                    bookingStatus.textContent =
                        "Please choose a valid arrival and departure date.";

                }

                updateBookingDates();

                bookingForm.reportValidity();

                return;

            }


            const message = [
                "Hello Jiya Grand Hotel,",
                "",
                "I would like to enquire about room availability.",
                "",
                "Guest Name: " + name,
                "Contact Number: " + phone,
                "Arrival Date: " + checkin,
                "Departure Date: " + checkout,
                "Number of Guests: " + guests,
                "Room Preference: " + room,
                "Special Requests: " + (requests || "None"),
                "",
                "Please confirm:",
                "- Room availability",
                "- Final room tariff and taxes",
                "- Applicable offers and booking terms",
                "",
                "This is a booking enquiry, not a confirmed reservation."
            ].join("\n");


            openWhatsApp(message, bookingStatus);

        });

    }


    /* =====================================================
       12. EVENT ENQUIRY FORM
       ===================================================== */

    if (eventForm) {

        eventForm.addEventListener("submit", function (event) {

            event.preventDefault();


            if (!eventForm.checkValidity()) {

                eventForm.reportValidity();

                return;

            }


            const formData = new FormData(eventForm);


            const name =
                String(formData.get("name") || "").trim();

            const phone =
                String(formData.get("phone") || "").trim();

            const eventType =
                String(formData.get("eventType") || "");

            const eventGuests =
                String(formData.get("eventGuests") || "");

            const eventDate =
                String(formData.get("eventDate") || "");


            if (eventDate < getToday()) {

                if (eventStatus) {

                    eventStatus.textContent =
                        "Please select today or a future event date.";

                }

                return;

            }


            const message = [
                "Hello Jiya Grand Hotel,",
                "",
                "I would like to enquire about an event.",
                "",
                "Name: " + name,
                "Contact Number: " + phone,
                "Event Type: " + eventType,
                "Preferred Date: " + eventDate,
                "Expected Guests: " + eventGuests,
                "",
                "Please share information about:",
                "- Suitable event spaces",
                "- Availability and capacity",
                "- Menus and event packages",
                "- Prices and booking terms",
                "",
                "This is an enquiry, not a confirmed event booking."
            ].join("\n");


            openWhatsApp(message, eventStatus);

        });

    }


    /* =====================================================
       13. GALLERY LIGHTBOX
       ===================================================== */

    const lightbox = document.getElementById("lux-lightbox");

    const lightboxImage =
        document.getElementById("lux-lightbox-image");

    const lightboxClose =
        document.getElementById("lux-lightbox-close");

    const galleryButtons =
        document.querySelectorAll("[data-lightbox]");


    let lastFocusedElement = null;


    function openLightbox(imageURL, imageAlt) {

        if (!lightbox || !lightboxImage) return;

        if (!imageURL) return;


        lastFocusedElement = document.activeElement;

        lightboxImage.src = imageURL;

        lightboxImage.alt = imageAlt || "Gallery photograph";


        lightbox.classList.add("is-open");

        lightbox.setAttribute("aria-hidden", "false");

        body.classList.add("lux-lightbox-open");


        if (lightboxClose) {
            lightboxClose.focus();
        }

    }


    function closeLightbox() {

        if (!lightbox || !lightboxImage) return;


        lightbox.classList.remove("is-open");

        lightbox.setAttribute("aria-hidden", "true");

        body.classList.remove("lux-lightbox-open");


        /*
           Remove the image only after the closing animation
           has started.
        */

        window.setTimeout(function () {

            if (!lightbox.classList.contains("is-open")) {

                lightboxImage.removeAttribute("src");

            }

        }, 300);


        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {

            lastFocusedElement.focus();

        }

    }


    galleryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const imageURL =
                button.getAttribute("data-lightbox");

            const thumbnail =
                button.querySelector("img");

            const altText = thumbnail
                ? thumbnail.alt
                : "Gallery photograph";


            openLightbox(imageURL, altText);

        });

    });


    if (lightbox && lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        /*
           Click outside the image to close.
        */

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });


        if (lightboxImage) {

            lightboxImage.addEventListener("click", function (event) {

                event.stopPropagation();

            });

        }

    }


    /* =====================================================
       14. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeNavigation();


            if (
                lightbox &&
                lightbox.classList.contains("is-open")
            ) {

                closeLightbox();

            }

        }

    });


    /* =====================================================
       15. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".lux-reveal");


    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }

        );


        revealElements.forEach(function (element, index) {

            /*
               Subtle stagger on repeated cards.
            */

            const repeatedCard = element.matches(
                ".lux-room-card, .lux-experience, .lux-gallery-item"
            );


            if (repeatedCard) {

                const delay = (index % 3) * 90;

                element.style.setProperty(
                    "--lux-delay",
                    delay + "ms"
                );

            }


            revealObserver.observe(element);

        });

    } else {

        /*
           Show all content if reduced motion is requested
           or IntersectionObserver is unavailable.
        */

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       16. WHATSAPP CONTACT LINK
       ===================================================== */

    const contactWhatsApp =
        document.getElementById("lux-contact-whatsapp");


    if (contactWhatsApp) {

        contactWhatsApp.href =
            "https://wa.me/" + HOTEL_WHATSAPP_NUMBER;

    }


    /* =====================================================
       17. EXTERNAL LINK SAFETY
       ===================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(
        function (link) {

            link.rel = "noopener noreferrer";

        }
    );


    /* =====================================================
       18. LAUNCH CHECK MESSAGE
       ===================================================== */

    console.info(
        "Jiya Grand Hotel luxury website JavaScript loaded."
    );

});
