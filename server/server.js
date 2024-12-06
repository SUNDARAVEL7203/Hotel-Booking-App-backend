const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { auth } = require("./middleware/authMiddleware");
const paymentroutes = require("./RazorPayment/paymentroutes");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const { v2 } = require("cloudinary");

//connect to Database
connectDB();
//set up middleware
app.use(express.json());
app.use(errorHandler);
app.use("/auth", auth);
app.use(cors());




app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentroutes);

v2.config({
  api_key: "495737122385612",
  cloud_name: "dgsnmd3jg",
  api_secret: "56OiMLlLjs-pj3O8sZxhwheVMnw",
});

app.listen(port, () => console.log(`listening on on ${port}`));

module.exports = v2;
