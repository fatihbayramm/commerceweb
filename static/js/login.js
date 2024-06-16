console.log("login page");

function showPasswordLogin() {
  document
    .querySelector(".js-login-show-password")
    .addEventListener("click", () => {
      const loginPassword = document.querySelector("#js-login-password");
      const showPswrdBtn = document.querySelector(".js-bi-eye-fill");
      const isPassword = loginPassword.type === "password";

      loginPassword.type = isPassword ? "text" : "password";
      showPswrdBtn.classList.toggle("bi-eye-slash-fill", isPassword);
      showPswrdBtn.classList.toggle("bi-eye-fill", !isPassword);
    });
}

showPasswordLogin();
