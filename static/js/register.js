console.log("register page");

function showPasswordRegister() {
  document
    .querySelector(".js-register-show-password")
    .addEventListener("click", () => {
      const registerPassword = document.querySelector("#js-register-password");
      const showPswrdBtn = document.querySelector(".js-bi-eye");
      const isPassword = registerPassword.type === "password";

      registerPassword.type = isPassword ? "text" : "password";
      showPswrdBtn.classList.toggle("bi-eye-slash", isPassword);
      showPswrdBtn.classList.toggle("bi-eye", !isPassword);
    });
}

showPasswordRegister();
