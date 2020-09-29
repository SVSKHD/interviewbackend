const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} =require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} =require("../controllers/user");
const {updateStock}=require("../controllers/product")
const {getOrderById,createOrder,getallorders,UpdateStatus,getOrderStatus}=require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("userId",getOrderById);

// Routes

// create
router.post("/order/create/:userId",
isSignedIn,
isAuthenticated,
pushOrderInPurchaseList,
updateStock,
createOrder
);

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getallorders)

// status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,UpdateStatus)
module.exports=router