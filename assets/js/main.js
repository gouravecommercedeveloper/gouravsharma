// Replace this with your Formspree form endpoint after creating a form at https://formspree.io/
const FORMSPREE_ENDPOINT = "";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

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

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!FORMSPREE_ENDPOINT) {
    formStatus.textContent = "The form is not connected yet. Please configure your Formspree endpoint in assets/js/main.js.";
    return;
  }

  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Form submission failed");

    contactForm.reset();
    formStatus.textContent = "Thank you! Your inquiry has been sent successfully.";
  } catch (error) {
    formStatus.textContent = "Sorry, your message could not be sent. Please try again or contact me by email.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Project Inquiry";
  }
});
