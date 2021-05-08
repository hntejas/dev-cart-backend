const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { corsOptions } = require("./configs.js");
const invalidRouteHandler = require("./middlewares/invalid-route-handler.js");

const productRouter = require("./routes/product.router");
const categoryRouter = require("./routes/category.router");
const brandRouter = require("./routes/brands.router");

const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.init();

app.get("/", function (req, res) {
  res.send("Welcome to Dev Cart, please refer documentation for API details");
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);

app.use(invalidRouteHandler);

app.listen(3000, function () {
  console.log("server connected!");
});
