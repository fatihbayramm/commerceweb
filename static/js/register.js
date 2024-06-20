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

function sendRegisterForm() {
  const form = document.getElementById("js-register-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

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
        const errorData = await response.json();
        console.log(errorData);
        displayErrors(errorData);
      } else {
        const data = await response.json();
        console.log(data);
        window.location.href = "/login/";
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  });
}

function displayErrors(errorData) {
  const errorMessageContainer = document.getElementById("error-message");
  errorMessageContainer.innerHTML = ""; // Önceki hata mesajlarını temizle

  for (const [key, value] of Object.entries(errorData)) {
    const errorItem = document.createElement("p");
    errorItem.textContent = `${value}`;
    errorMessageContainer.appendChild(errorItem);

    setTimeout(() => {
      errorMessageContainer.innerHTML = "";
    }, 5000);
  }
}

showPasswordRegister();
sendRegisterForm();
