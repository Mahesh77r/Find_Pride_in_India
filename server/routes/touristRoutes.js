const router = require('express').Router();
const {touristRegister, verifyOtp, touristLogin,sendOtp,getHello, forgotpassword,resetpassword} = require("../controllers/touristController");
const { createOrderForm ,getOrder, getOrderByTourist} = require('../controllers/ProductOrderForm');
const { addFavoriteProduct, getFavoriteProducts } = require('../controllers/ProductCrud');

const auth = require("../middelweares/Authentication");

// tourist
router.post("/register",touristRegister)
router.post("/verifyotp",verifyOtp)
router.post("/sendotp",sendOtp)
router.post("/login",touristLogin)
router.post("/forgotpassword",forgotpassword);
router.post("/resetpassword/:token",resetpassword);

// 
router.post("/order",createOrderForm)
router.get("/getorder",getOrder)
router.get("/getorderfortourist/:tourist_id",getOrderByTourist)

// 
router.post('/addfavoriteproduct',auth,addFavoriteProduct)
router.get('/getfavoriteproduct',auth, getFavoriteProducts)


router.get( '/hello' , getHello )


module.exports=router;
