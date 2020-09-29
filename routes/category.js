const express=require('express');
const router=express.Router();

const {getCategoryById,CreateCategory,getCategory,getAllCategory,UpdateCategory,DeleteCategory} =require("../controllers/category");
const {isSignedIn,isAuthenticated,isAdmin} =require("../controllers/auth");
const {getUserById} =require("../controllers/user");


// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//  routes
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory)

// postroutes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,CreateCategory);

// updateroutes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,UpdateCategory)

// deleteroutes
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,DeleteCategory)





module.exports=router;