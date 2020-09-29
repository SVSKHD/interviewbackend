const express=require("express");
const router = express.Router();
const {getProductbyId, createProduct,getaProduct, photo,deleteProduct,updateProduct,getallproducts,getAllUniqueCategories} =require("../controllers/product");
const {isSignedIn,isAuthenticated,isAdmin} =require("../controllers/auth");
const {getUserById} =require("../controllers/user");

// params
router.param("userId",getUserById);
router.param("productId",getProductbyId);


// listedproducts
router.get("/products",getallproducts)

// get routes
router.get("/product/:productId",getaProduct);
router.get("/product/photo/:productId",photo);
router.get("/products/categories",getAllUniqueCategories)
// postroutes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
// updateroutes
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
// deleteroutes
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


module.exports=router;
