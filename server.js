const express = require("express");
const proxy = require("express-http-proxy");

const app = express();
app.set("view engine", "ejs");

const targetUrl = "http://localhost:9000";

app.use(express.static("static"));

app.use("/api/", proxy(targetUrl));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/list/");
});

app.get("/list/", (req, res) => {
  let queryString =
    req.url.split("?").length > 1 ? `?${req.url.split("?")[1]}` : "";
  require("request").get(
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
  require("request").get(
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
  require("request").get(
    `${targetUrl}/api/auth/register`,
    {
      headers: {
        "content-type": "application/json",
      },
    },
    function (error, response, body) {
      res.render("auth/register", JSON.parse(body));
    }
  );
});

app.get("/login/", (req, res) => {
  require("request").get(
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
