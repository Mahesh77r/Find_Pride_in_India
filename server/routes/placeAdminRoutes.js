const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom ,getPlaces} = require("../controllers/adminAuthController");
const {getProducts, updateProduct, deleteProduct, addProductWithFirebase} = require("../controllers/ProductCrud")
const {addTouristGuide, getTouristGuide} = require("../controllers/TouristGuideCrud")
const {addEvent,getEvent} = require("../controllers/EventController")
const { getFacility, addFacility } = require('../controllers/FacilityController');

const auth = require("../middelweares/Authentication");
const { addCheckpoint, getCheckpoint } = require('../controllers/CheckPointsController');
 


router.post("/register",placeAdminRegister);
router.get("/getplaces",getPlaces);

// CRUD products
router.post("/addproducts",addProductWithFirebase);
router.get("/getproducts/:dest_name",getProducts);
router.get("/getproducts/",getProducts);
router.put("/updateproducts/:id",updateProduct);
router.delete("/deleteproducts/:id",deleteProduct);


// CRUD Guide
router.post("/addguides",addTouristGuide);
router.get("/getguides/:dest_name",getTouristGuide);
router.get("/getguides/",getTouristGuide);

// CRUD Event
router.post("/addevents",addEvent);
router.get("/getevents/:dest_name",getEvent);
router.get("/getevents/",getEvent);

// CRUD Facility
router.post("/addfacilities",addFacility);
router.get("/getfacilities/:dest_name",getFacility);
router.get("/getfacilities/",getFacility);

// CRUD Checkpoints
router.post("/addcheckpoints",addCheckpoint);
router.get("/getcheckpoints",getCheckpoint);
router.get("/getcheckpoints/:dest_name",getCheckpoint);



router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);




module.exports=router;
