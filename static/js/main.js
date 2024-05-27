console.log("list page");

function getSearchResult(newUrl) {
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

    const input = document.querySelector(".js-form-control");
    const searchValue = input.value;

    let params = new URLSearchParams(window.location.search);
    params.set("query", searchValue);

    const newUrl = `/list/?${params.toString()}`;

    window.history.pushState({ path: newUrl }, "", newUrl);

    getSearchResult(newUrl);
  });
}

searchProduct();
