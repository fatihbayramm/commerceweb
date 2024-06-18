console.log("login page");

function showPasswordLogin() {
  document
    .getElementById("js-login-show-password")
    .addEventListener("click", () => {
      const passwordInput = document.getElementById("js-login-password");
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    });
}

showPasswordLogin();
