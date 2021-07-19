const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {corsOptions} = require('./data/configs.js');

const invalidRouteHandler = require('./middlewares/invalid-route-handler');
const authCheck = require('./middlewares/auth-check');
const errorHandler = require('./middlewares/error-handler');

const productRouter = require("./routes/product.router");
const categoryRouter = require("./routes/category.router");
const brandRouter = require("./routes/brands.router");
const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router")
const wishlistRouter = require("./routes/wishlist.router");
const addressRouter = require("./routes/address.router");
const orderRouter = require('./routes/order.router');

const db = require("./utils/db")

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.init();

app.get('/',function(req, res){
  res.send("Welcome to Dev Cart, please refer documentation for API details")
});

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/cart", authCheck, cartRouter);
app.use("/wishlist", authCheck, wishlistRouter);
app.use("/address", authCheck, addressRouter);
app.use("/order", authCheck, orderRouter);

app.use(invalidRouteHandler);
app.use(errorHandler);

app.listen(3000, function(){
  console.log("server connected!");
});