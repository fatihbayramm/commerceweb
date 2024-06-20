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
        // TODO: save token to cookie
        let token = data.token;

        setCookie("authToken", token, 7);

        // window.location.href = "/list/";
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  });
}

function displayErrors(errorData) {
  const errorMessageContainer = document.getElementById("error-message");
  errorMessageContainer.innerHTML = "";

  for (const [key, value] of Object.entries(errorData)) {
    const errorItem = document.createElement("p");
    errorItem.textContent = `${value}`;
    errorMessageContainer.appendChild(errorItem);

    setTimeout(() => {
      errorMessageContainer.innerHTML = "";
    }, 5000);
  }
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

showPasswordRegister();
sendRegisterForm();
