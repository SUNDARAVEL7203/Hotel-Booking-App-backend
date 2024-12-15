const { Router } = require("express")
const {getRooms, createRoom, getRoom, updateRoom, deleteRoom} = require("../controller/roomController")
const { auth } = require("../middleware/authMiddleware");


const router = Router();

router.get("/", auth, getRooms)

router.post("/", auth,  createRoom  )

router.get("/:id", getRoom)

router.put("/:id", auth, updateRoom)

router.delete("/:id",auth, deleteRoom)

module.exports = router;