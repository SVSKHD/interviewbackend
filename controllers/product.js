const Product=require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs=require("fs");
const { sortBy } = require("lodash");


exports.getProductbyId=(req,res,next,id)=>{
Product.findById(id).populate("category").exec((err,product)=>{
    if(err){
        return res.status(400).json({
            error:"Product not found"
        })
    }
    req.product=product;
    next();
})
};

exports.createProduct=(req,res)=>{
let form = new formidable.IncomingForm();
form.keepExtensions = true;

form.parse(req,(err,fields,file)=>{
    if(err){
        return res.status(400).json({
            error:"problem with image"
        });
    }
    const {name,description, price,category,stock}=fields;
    if(
        !name||
        !description||
        !price||
        !category||
        !stock
        ){
            return res.status(400).json({
                error:"Please fill all the fields"
            });
        }

    let product = new Product(fields)
    if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"file size is too big"
            })
        }
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type
    }
    product.save((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"saving tshirt in DB is failed"
            })
        }
        res.json(product)
    })
})
}
exports.getaProduct=(req,res)=>{
    req.product.photo=undefined 
    return res.json(req.product)
}
// middleware
exports.photo=(req,res,next)=>{
if(req.product.photo.data){
    res.set("Content-type",req.product.photo.content-type)
    return res.send(req.product.photo.data)
}
next();
}

exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
      
        let product = req.product;
        product = _.extend(product,fields)
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"file size is too big"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"updating tshirt in DB is failed"
                })
            }
            res.json(product)
        })
    })
}


exports.deleteProduct=(req,res)=>{
let product = req.product;
product.remove((err,deletedProduct)=>{
if(err){
    return res.status(400).json({
        error:"Failed to delete the product"
    })
}
res.json({
    message:"succesfully Deleted",
    deletedProduct
})
})
}

exports.getallproducts=(req,res)=>{

    let limit= (req.query.limit) ? parseInt(req.query.limit) : 8
    let sortby=req.query.sortBy ?req.query.sortBy: "_id";
    Product.find().sort([[sortby,"dsc"]])
    .limit(limit)
    .select("-photo")
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            });
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            })
        }
        res.json(category)
    })
}

exports.updateStock=(req,res,next)=>{
let myOperations=req.body.order.products.map(product=>{
    return {
        updateOne:{
            filter:{_id:product._id},
            update:{$inc:{stock:-product.count,sold: +product.count}}    
        }
    }
})
Product.bulkWrite(myOperations,{},(err,products)=>{
    if(err){
        return res.status(400).json({
            error:"Bulk operations failed"
        });
    }
    next();
})
}

