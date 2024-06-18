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

    // FormData nesnesini oluştur
    const formData = new FormData(form);

    // FormData nesnesini JSON formatına çevir
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
    } catch (error) {
      console.error("Hata:", error);
    }
  });
}

showPasswordRegister();
sendRegisterForm();
