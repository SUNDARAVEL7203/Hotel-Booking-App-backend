const {Router} = require('express');
const {verify , order} = require('./payment')


const router = Router()

router.post("/order", order)

router.post("/verify" , verify)





module.exports = router;