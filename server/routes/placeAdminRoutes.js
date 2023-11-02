const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom } = require("../controllers/adminAuthController");
const {addProduct,getProducts} = require("../controllers/ProductCrud")

const auth = require("../middelweares/Authentication");
const upload = require("../middelweares/fileupload");

router.post("/register",upload.single('file'),placeAdminRegister);
router.post("/addproducts",upload.single('file'),addProduct);
router.get("/getproducts",getProducts);
router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);


module.exports=router;
