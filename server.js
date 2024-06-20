const express = require("express");
const proxy = require("express-http-proxy");

const targetUrl = "http://localhost:9000";

const request = require("request");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));

app.use("/api/", proxy(targetUrl));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/list/");
});

app.get("/list/", (req, res) => {
  let queryString =
    req.url.split("?").length > 1 ? `?${req.url.split("?")[1]}` : "";
  request.get(
    `${targetUrl}/api/products/${queryString}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
    function (error, response, body) {
      const products = JSON.parse(body);
      res.render("list", { products });
    }
  );
});

app.get("/product/:id", (req, res) => {
  request.get(
    `${targetUrl}/api/products/${req.params.id}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
    function (error, response, body) {
      const product = JSON.parse(body);
      res.render("product", { product });
    }
  );
});

app.get("/register/", (req, res) => {
  res.render("auth/register");
});

app.post("/register/", (req, res) => {
  const formData = JSON.stringify(req.body);
  console.log("Form Data:", formData);

  request.post(
    `${targetUrl}/api/auth/register/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    },
    function (error, response, body) {
      if (error) {
        return res.status(500).send("Server Error");
      }
      try {
        const data = JSON.parse(body);
        res.status(response.statusCode).json(data);
      } catch (e) {
        res.status(500).send("Error parsing JSON response");
        console.log(e);
      }
    }
  );
});

app.get("/login/", (req, res) => {
  request.get(
    `${targetUrl}/api/auth/login`,
    {
      headers: {
        "content-type": "application/json",
      },
    },
    function (error, response, body) {
      res.render("auth/login", JSON.parse(body));
    }
  );
});

const port = 2000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port}/ adresinde çalışıyor.`);
});
console.log("Commerce Web Projesine Hos Geldiniz :)");
console.log(" ");
