const Category =require("../models/category");

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
               error:"Category not found in DB"
            })
        }
        req.category=cate;
        next();
    });
}

exports.CreateCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,category)=>{
     if(err){
         return res.status(400).json({
             err:"Note able to save category"
         });
       }
       res.json({category});
    });
};

exports.getCategory=(req,res)=>{
return res.json(req.category);
}
exports.getAllCategory=(req,res)=>{
   Category.find().exec((err,categories)=>{
       if(err){
           return res.status(400).json({
               err:"Not able to save the category in DB"
           });
       }
       res.json(categories)
   })
}

exports.UpdateCategory=(req,res)=>{
const category=req.category;
category.name=req.body.name;
category.save((err,UpdatedCategory)=>{
    if(err){
        return res.status(400).json({
            error:"failed to update category"
        });
    }
    res.json(UpdatedCategory);
});
}
exports.DeleteCategory=(req,res)=>{
const category=req.category;
category.remove((err,category)=>{
if(err){
    return res.status(400).json({
        error:"failed to delete this category" + `${category}`
    })
}
res.json({
    message:"succesfully deleted"
});
});
} 