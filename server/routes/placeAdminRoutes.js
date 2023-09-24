const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom } = require("../controllers/adminAuthController");

const auth = require("../middelweares/Authentication");
const upload = require("../middelweares/fileupload");

router.post("/register",upload.single('file'),placeAdminRegister);
router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);


module.exports=router;
