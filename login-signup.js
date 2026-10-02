document.getElementById("current-year").textContent = new Date().getFullYear();

const container = document.getElementById("container");

function goSignup(e) {
  document.title="Health Empire - Sign Up";
  e && e.preventDefault();
  container.classList.add("active");
}
function goLogin(e) {
  document.title="Health Empire - Login";
  e && e.preventDefault();
  container.classList.remove("active");
}

document.getElementById("signup").addEventListener("click", goSignup);
document.getElementById("login").addEventListener("click", goLogin);
document.getElementById("go-signup").addEventListener("click", goSignup);
document.getElementById("go-login").addEventListener("click", goLogin);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

function validateField(input, errorId, pattern, emptyMsg, errorMsg) {
  const value = input.value.trim();
  const errorEl = document.getElementById(errorId);
  if (value === "") {
    errorEl.textContent = emptyMsg;
    input.classList.add("error-border");
    input.classList.remove("success-border");
    return false;
  } else if (!pattern.test(value)) {
    errorEl.textContent = errorMsg;
    input.classList.add("error-border");
    input.classList.remove("success-border");
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.add("success-border");
    input.classList.remove("error-border");
    return true;
  }
}
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupUsername = document.getElementById("signup-username");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

loginEmail.addEventListener("input", () =>
  validateField(
    loginEmail,
    "login-username-error",
    usernamePattern,
    "",
    "Username must be 3-20 chars (letters, numbers, _)",
  ),
);
loginPassword.addEventListener("input", () =>
  validateField(
    loginPassword,
    "login-password-error",
    passwordPattern,
    "",
    "Password must be 6+ chars with a number",
  ),
);
signupUsername.addEventListener("input", () =>
  validateField(
    signupUsername,
    "signup-username-error",
    usernamePattern,
    "",
    "Username must be 3-20 chars (letters, numbers, _)",
  ),
);
signupEmail.addEventListener("input", () =>
  validateField(
    signupEmail,
    "signup-email-error",
    emailPattern,
    "",
    "Invalid email address",
  ),
);
signupPassword.addEventListener("input", () =>
  validateField(
    signupPassword,
    "signup-password-error",
    passwordPattern,
    "",
    "Password must be 6+ chars with a number",
  ),
);

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const u = validateField(
    loginEmail,
    "login-username-error",
    usernamePattern,
    "Username is required",
    "Username must be 3-20 chars",
  );
  const p = validateField(
    loginPassword,
    "login-password-error",
    passwordPattern,
    "Password is required",
    "Password must be 6+ chars with a number",
  );
  if (u && p) {
    console.log("Login successful ✅");
  }
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const u = validateField(
    signupUsername,
    "signup-username-error",
    usernamePattern,
    "Username is required",
    "Username must be 3-20 chars",
  );
  const em = validateField(
    signupEmail,
    "signup-email-error",
    emailPattern,
    "Email is required",
    "Invalid email address",
  );
  const p = validateField(
    signupPassword,
    "signup-password-error",
    passwordPattern,
    "Password is required",
    "Password must be 6+ chars with a number",
  );
  if (u && em && p) {
    console.log("Sign Up successful ✅");
  }
});
