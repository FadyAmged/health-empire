// ================= COPYRIGHT YEAR =================
const currentYearEl = document.getElementById("current-year");

if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// ================= MOBILE MENU =================
const menu = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menu && navLinks) {
  menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ================= FORM VALIDATION =================
const form = document.getElementById("contact-form");
const email = document.getElementById("contact-email");
const message = document.getElementById("contact-message");
const alertMessage = document.querySelectorAll(".contact-alert");

if (email && message && form && alertMessage.length >= 2) {

  // -------- Email Validation --------
  function validateEmail() {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

    if (email.value.trim() === "") {
      alertMessage[0].innerText = "Email is required";
      return false;
    } 
    else if (email.value.trim().length < 5) {
      alertMessage[0].innerText = "Email must be at least 5 characters";
      return false;
    } 
    else if (!email.value.trim().includes("@")) {
      alertMessage[0].innerText = "Email must contain @";
      return false;
    } 
    else if (!emailPattern.test(email.value.trim())) {
      alertMessage[0].innerText = "Invalid email format";
      return false;
    } 
    else {
      alertMessage[0].innerText = "";
      return true;
    }
  }

  // -------- Message Validation --------
  function validateMessage() {
    if (message.value.trim() === "") {
      alertMessage[1].innerText = "Message is required";
      return false;
    } 
    else if (message.value.trim().length < 20) {
      alertMessage[1].innerText = "Message must be at least 20 characters";
      return false;
    } 
    else {
      alertMessage[1].innerText = "";
      return true;
    }
  }

  // -------- Live Validation --------
  email.addEventListener("input", validateEmail);
  message.addEventListener("input", validateMessage);

  // -------- Submit --------
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isEmailValid && isMessageValid) {
      alert("Message sent successfully!");
      form.reset();
    }
  });
}
