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
  require("request").get(
    `${targetUrl}/api/products/`,
    {
      headers: {
        Accept: "application/json",
      },
    },
    function (error, response, body) {
      res.render("list", JSON.parse(body));
    }
  );
});

const port = 2000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port}/ adresinde çalışıyor.`);
});
console.log("Madame Coco Projesine Hos Geldiniz :)");
console.log(" ");
