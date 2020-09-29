const express = require("express");
const router = express.Router();

const { getUserById, getUser,getAllusers,UpdateUser,userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

// crud operations
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users",getAllusers,isSignedIn,isAuthenticated,UpdateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);

router.put("/user/:userId",UpdateUser);








module.exports = router;
