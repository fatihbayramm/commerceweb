console.log("register page");

function showPasswordRegister() {
  document
    .getElementById("js-register-show-password")
    .addEventListener("click", (event) => {
      const passwordInput = document.getElementById("js-register-password");
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    });
}

function validateEmail(email) {
  const errorMessage = document.getElementById("error-message");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkEmail = emailPattern.test(email);

  if (!checkEmail.value) {
    errorMessage.textContent = "Geçersiz e-posta formatı!";
    return;
  }
}

function validatePassword(password, passwordConfirm) {
  const errorMessage = document.getElementById("error-message");
  if (password.value !== passwordConfirm.value) {
    errorMessage.textContent = "Şifreler eşleşmiyor!";
    return;
  }
}

function sendRegisterForm() {
  const form = document.getElementById("js-register-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("js-register-email");
    const password = document.getElementById("js-register-password");
    const passwordConfirm = document.getElementById(
      "js-register-password-confirm"
    );

    validateEmail(email);
    validatePassword(password, passwordConfirm);

    const formData = new FormData(form);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log(formDataObj);

    try {
      const response = await fetch("/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }

      const data = await response.json();
      console.log("Başarılı:", data);

      // alert("Kayıt İşlemi Başarılı");
    } catch (error) {
      console.error("Hata:", error);
    }
  });
}

showPasswordRegister();
sendRegisterForm();
