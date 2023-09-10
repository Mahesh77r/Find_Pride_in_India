const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom } = require("../controllers/adminAuthController");

const auth = require("../middelweares/Authentication");

router.post("/register",placeAdminRegister)
router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);


module.exports=router;
