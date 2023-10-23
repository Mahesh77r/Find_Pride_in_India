const router = require('express').Router();
const {touristRegister, verifyOtp, touristLogin,sendOtp,getHello, forgotpassword,resetpassword} = require("../controllers/touristController");

// const auth = require("../middelweares/Authentication");

// tourist
router.post("/register",touristRegister)
router.post("/verifyotp",verifyOtp)
router.post("/sendotp",sendOtp)
router.post("/login",touristLogin)
router.post("/forgotpassword",forgotpassword);
router.post("/resetpassword/:token",resetpassword);
router.get( '/hello' , getHello )


module.exports=router;
