console.log("list page");

function getResult(newUrl) {
  fetch(newUrl)
    .then((resp) => resp.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContainer = doc.querySelector(".js-container");
      const currentContainer = document.querySelector(".js-container");
      if (!currentContainer) return;
      currentContainer.innerHTML = newContainer.innerHTML;
    })
    .catch((error) => {
      console.error("Fetch or parsing error:", error);
    });
}

function searchProduct() {
  const form = document.querySelector(".js-d-flex");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchValue = document.querySelector(".js-form-control").value;

    let params = new URLSearchParams();

    if (searchValue) {
      params.set("query", searchValue);
    }

    const newUrl = `/list/?${params.toString()}`;

    window.history.pushState({ path: newUrl }, "", newUrl);

    getResult(newUrl);
  });
}

function activateFilterBox() {
  document
    .querySelector(".filter-activate-btn")
    .addEventListener("click", () => {
      document
        .querySelector(".filter-box")
        .classList.toggle("filter-box-activate");
      document
        .querySelector(".filter-activate-btn")
        .classList.toggle("filter-activate-btn-act");
    });
}

function openFilterBoxes() {
  document.querySelectorAll(".js-ft-activate").forEach((activate) => {
    activate.addEventListener("click", (event) => {
      event.target.parentElement
        .querySelector(".js-filter-info-box")
        .classList.toggle("filter-info-box-act");
    });
  });
}

function filterProductsManual() {
  const form = document.querySelector(".js-ft-src-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let priceMinValue = document.querySelector(".js-input-min").value;
    let priceMaxValue = document.querySelector(".js-input-max").value;

    let params = new URLSearchParams();

    params.set("price_min", priceMinValue);

    params.set("price_max", priceMaxValue);

    const newUrl = `/list/?${params.toString()}`;

    window.history.pushState({ path: newUrl }, "", newUrl);

    getResult(newUrl);
  });
}

function filterProductsByChoice() {
  document.querySelectorAll(".js-choice").forEach((choice) => {
    choice.addEventListener("change", () => {
      document.querySelectorAll(".js-choice").forEach((cb) => {
        if (cb !== choice) {
          cb.checked = false;
        }
      });

      const isChecked = Array.from(
        document.querySelectorAll(".js-choice")
      ).some((cb) => cb.checked);

      if (isChecked) {
        let values = choice.value.split(",");

        let priceMinValue = values[0];
        let priceMaxValue = values[1];

        let params = new URLSearchParams();

        params.set("price_min", priceMinValue);
        params.set("price_max", priceMaxValue);

        const newUrl = `/list/?${params.toString()}`;

        window.history.pushState({ path: newUrl }, "", newUrl);

        getResult(newUrl);
      } else {
        const originalUrl = "/list/";
        window.history.pushState({ path: originalUrl }, "", originalUrl);

        getResult(originalUrl);
      }
    });
  });
}

function clearAllFilters() {
  document.querySelector(".js-clear-ft-btn").addEventListener("click", () => {
    let params = new URLSearchParams();

    const newUrl = `/list/?${params.toString()}`;

    window.history.pushState({ path: newUrl }, "", newUrl);

    document.querySelectorAll(".js-choice").forEach((cb) => {
      cb.checked = false;
    });

    document.querySelector(".js-input-min").value = "";
    document.querySelector(".js-input-max").value = "";

    getResult(newUrl);
  });
}

searchProduct();
activateFilterBox();
filterProductsManual();
openFilterBoxes();
filterProductsByChoice();
clearAllFilters();
