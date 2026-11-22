
// FREE CONTACT FORM: FormSubmit
// Replace this with your email address.
const CONTACT_EMAIL = "gourav.ecommercedeveloper@gmail.com";

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Dynamic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (CONTACT_EMAIL === "YOUR_EMAIL@gmail.com") {
      formStatus.textContent =
        "Please configure your email address in assets/js/main.js.";
      return;
    }

    const submitButton = contactForm.querySelector(
      "button[type='submit']"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
      const formData = new FormData(contactForm);

      // Email subject
      formData.append(
        "_subject",
        "New Project Inquiry - Ecommerce Portfolio"
      );

      // AJAX submission
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (!response.ok || result.success === "false") {
        throw new Error(result.message || "Form submission failed");
      }

      contactForm.reset();

      formStatus.textContent =
        "Thank you! Your inquiry has been sent successfully.";

    } catch (error) {
      console.error("Contact form error:", error);

      formStatus.textContent =
        "Sorry, your message could not be sent. Please try again or contact me by email.";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Project Inquiry";
    }
  });
}
