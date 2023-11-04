const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom } = require("../controllers/adminAuthController");
const {addProduct,getProducts} = require("../controllers/ProductCrud")
const {addTouristGuide, getTouristGuide} = require("../controllers/TouristGuideCrud")
const {addEvent,getEvent} = require("../controllers/EventController")
const { getFacility, addFacility } = require('../controllers/FacilityController');

const auth = require("../middelweares/Authentication");
const upload = require("../middelweares/fileupload");

router.post("/register",upload.single('file'),placeAdminRegister);
// CRUD products
router.post("/addproducts",upload.single('file'),addProduct);
router.get("/getproducts/:dest_name",getProducts);


// CRUD Guide
router.post("/addguides",upload.single('file'),addTouristGuide);
router.get("/getguides/:dest_name",getTouristGuide);

// CRUD Event
router.post("/addevents",upload.single('file'),addEvent);
router.get("/getevents/:dest_name",getEvent);

// CRUD Facility
router.post("/addfacilities",upload.single('file'),addFacility);
router.get("/getfacilities/:dest_name",getFacility);

router.get("/getproducts/:admin_name",getProducts);
router.get("/getproducts/",getProducts);
router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);


module.exports=router;
