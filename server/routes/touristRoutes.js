const router = require('express').Router();
const {touristRegister, verifyOtp, touristLogin,sendOtp,getHello } = require("../controllers/touristController");

// const auth = require("../middelweares/Authentication");

// tourist
router.post("/register",touristRegister)
router.post("/verifyotp",verifyOtp)
router.post("/sendotp",sendOtp)
router.post("/login",touristLogin)
router.get( '/hello' , getHello )


module.exports=router;
