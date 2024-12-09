const router = require('express').Router();
const {placeAdminRegister, placeAdminlogin, wlcom ,getPlaces} = require("../controllers/adminAuthController");
const {getProducts, updateProduct, deleteProduct, addProduct} = require("../controllers/ProductCrud")
const {addTouristGuide, getTouristGuide ,deleteGuide,updateGuide} = require("../controllers/TouristGuideCrud")
const {addEvent,getEvent ,deleteEvent,updateEvent} = require("../controllers/EventController")
const { getFacility, addFacility ,deleteFacility,updateFacility } = require('../controllers/FacilityController');
const { addCheckpoint, getCheckpoint ,deleteCheckpoint,updateCheckpoint } = require('../controllers/CheckPointsController');
const { addArtist, getArtist, updateArtist, deleteArtist } = require('../controllers/ArtistController');
const {  getOrderByDest, updateShippedStatus, deleteOrderAndNotify } = require('../controllers/ProductOrderForm');

const auth = require("../middelweares/Authentication");


router.post("/register",placeAdminRegister);
router.get("/getplaces",getPlaces);
router.get("/getplaces/:id",getPlaces);


// CRUD artists
router.post("/addartists",addArtist);
router.get("/getartists/:dest_name",getArtist);
router.get("/getartists/",getArtist);
router.put("/updateartists/:id",updateArtist);
router.delete("/deleteartists/:id",deleteArtist);

// CRUD products
router.post("/addproducts",addProduct);
router.get("/getproducts/:dest_name",getProducts);
router.get("/getproducts/",getProducts);
router.put("/updateproducts/:id",updateProduct);
router.delete("/deleteproducts/:id",deleteProduct);


// CRUD Guide
router.post("/addguides",addTouristGuide);
router.get("/getguides/:dest_name",auth,getTouristGuide);
router.get("/getguides/",auth,getTouristGuide);
router.put("/updateguides/:id",updateGuide);
router.delete("/deleteguides/:id",deleteGuide);

// CRUD Event
router.post("/addevents",addEvent);
router.get("/getevents/:dest_name",getEvent);
router.get("/getevents/",auth,getEvent);
router.put("/updateevents/:id",auth,updateEvent);
router.delete("/deleteevents/:id",deleteEvent);

// CRUD Facility
router.post("/addfacilities",addFacility);
router.get("/getfacilities/:dest_name",getFacility);
router.get("/getfacilities/",getFacility);
router.put("/updatefacilities/:id",updateFacility);
router.delete("/deletefacilities/:id",deleteFacility);

// CRUD Checkpoints
router.post("/addcheckpoints",addCheckpoint);
router.get("/getcheckpoints",getCheckpoint);
router.get("/getcheckpoints/:dest_id",getCheckpoint);
router.put("/updatecheckpoints/:id",updateCheckpoint);
router.delete("/deletecheckpoints/:id",deleteCheckpoint);

// order shipped and cancle

router.put("/ordershipped/:order_id",updateShippedStatus)
router.delete("/ordercancle/:order_id",deleteOrderAndNotify)
router.get("/getorderfordest/:dest_id",getOrderByDest)

router.post("/login",placeAdminlogin);
router.get("/",auth,wlcom);




module.exports=router;