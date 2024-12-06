const { Router } = require('express');
const { getBookings, createBooking, updateBooking, deleteBooking, getBooking } = require('../controller/bookingController');
const { auth } = require("../middleware/authMiddleware")


router = Router()

router.get("/", auth, getBookings)

router.post("/", auth, createBooking)

router.put("/:id", auth, updateBooking)

router.delete("/:id", auth, deleteBooking)

router.get("/:id", auth, getBooking)

module.exports = router;