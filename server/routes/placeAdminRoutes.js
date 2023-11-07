const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom } = require("../controllers/adminAuthController");
const {getProducts, updateProduct, deleteProduct, addProductWithFirebase} = require("../controllers/ProductCrud")
const {addTouristGuide, getTouristGuide} = require("../controllers/TouristGuideCrud")
const {addEvent,getEvent} = require("../controllers/EventController")
const { getFacility, addFacility } = require('../controllers/FacilityController');

const auth = require("../middelweares/Authentication");
const upload = require("../middelweares/fileupload");




router.post("/register",upload.single('file'),placeAdminRegister);
// CRUD products
// router.post("/addproducts",upload.single('file'),addProduct);
// 
router.post("/addfireproducts",addProductWithFirebase);
// 
router.get("/getproducts/:dest_name",getProducts);
router.get("/getproducts/",getProducts);
router.put("/updateproducts/:id",upload.single('file'),updateProduct);
router.delete("/deleteproducts/:id",deleteProduct);


// CRUD Guide
router.post("/addguides",upload.single('file'),addTouristGuide);
router.get("/getguides/:dest_name",getTouristGuide);
router.get("/getguides/",getTouristGuide);

// CRUD Event
router.post("/addevents",upload.single('file'),addEvent);
router.get("/getevents/:dest_name",getEvent);
router.get("/getevents/",getEvent);

// CRUD Facility
router.post("/addfacilities",upload.single('file'),addFacility);
router.get("/getfacilities/:dest_name",getFacility);
router.get("/getfacilities/",getFacility);

router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);


module.exports=router;
