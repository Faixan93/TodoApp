const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showBtn = document.querySelector(".input-group-text");
const loginBtn = document.getElementById("login-btn");

//save email and password to localStorage
function saveLogin() {
  const email = emailInput.value;
  const password = passwordInput.value;

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
}

//Load saved data from localStorage
function loadLogin() {
  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");

  if (savedEmail) {
    emailInput.value = savedEmail;
  }
  if (savedPassword) {
    passwordInput.value = savedPassword;
  }
  if (savedEmail && savedPassword) {
    window.location.assign("new-task.html");
  }
}

showBtn.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    showBtn.textContent = "Hide";
  } else {
    password.type = "password";
    showBtn.textContent = "Show";
  }
});
document.addEventListener("DOMContentLoaded", loadLogin);
/* 
loginBtn.addEventListener("click", saveLogin); */
