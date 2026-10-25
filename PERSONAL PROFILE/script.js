/* =========================================
   CSE STUDENT PORTFOLIO
   JavaScript Functionality
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. SELECT HTML ELEMENTS

    const themeToggle = document.getElementById("theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const contactForm = document.getElementById("contact-form");

    // 2. DARK MODE

    function applyTheme(theme) {

        document.documentElement.setAttribute("data-theme", theme);

        // Update the theme button text and accessible label.

        if (themeToggle) {

            if (theme === "dark") {
                themeToggle.textContent = "☀️ Light";
                themeToggle.setAttribute("aria-label", "Switch to light mode");
                themeToggle.setAttribute("aria-pressed", "true");
            } else {
                themeToggle.textContent = "🌙 Dark";
                themeToggle.setAttribute("aria-label", "Switch to dark mode");
                themeToggle.setAttribute("aria-pressed", "false");
            }
        }
    }

    // Load the previously saved theme.

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        console.warn("Theme preference could not be loaded.");
    }

    // Use the saved preference, or follow the device preference.

    const devicePrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme =
        savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : devicePrefersDark
                ? "dark"
                : "light";

    applyTheme(initialTheme);

    // Switch between dark and light mode.

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.getAttribute("data-theme") || "light";

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);

            // Save the selected theme.

            try {
                localStorage.setItem("portfolio-theme", newTheme);
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }
        });
    }


    // 3. MOBILE NAVIGATION

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the mobile menu after clicking a navigation link.

        const navigationItems = navLinks.querySelectorAll("a");

        navigationItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

                menuToggle.textContent = "☰";
            });
        });

        // Close the menu when the Escape key is pressed.

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

                menuToggle.textContent = "☰";
            }
        });
    }


    // 4. AUTOMATIC FOOTER YEAR

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // 5. CONTACT FORM VALIDATION

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Let the browser check required fields and input types.

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // This is a demonstration only.
            // It does not send messages to an email address or server.

            alert(
                "Thank you for your message! " +
                "This is a demo form and does not send messages yet."
            );

            contactForm.reset();
        });
    }


    // 6. CURRENT PAGE NAVIGATION HIGHLIGHT

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const pageLinks = document.querySelectorAll("#nav-links a");

    pageLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");
        }
    });

});