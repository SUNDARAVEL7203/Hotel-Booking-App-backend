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
const {upload} = require('./Cloudinarybend/cloudinaryConfig')

//connect to Database
connectDB();
//set up middleware
app.use(express.json());
app.use(errorHandler);
app.use("/auth", auth);
app.use(cors());



app.get("/" , (req,res) => {
  res.json("Welcome")
})


app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentroutes);

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});



app.listen(port, () => console.log(`listening on on ${port}`));


