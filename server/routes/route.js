const router = require('express').Router();
const {register ,login, wlcom } = require("../controllers/adminAuthController");

const auth = require("../middelweares/Authentication");

router.post("/register",register)
router.post("/login",login);
router.get("/",auth,wlcom);


module.exports=router;
