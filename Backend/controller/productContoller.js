import Product from "../models/product.js";

//POST request adding data
export const addProducts = async(req, res) => {
    try{
      const product = new Product(req.body);
      await product.save();
      return res.status(200).json({message : "Product Added Successfully", 
                                   data: product});
    }catch(error){
        res.status(500).json({message: "Server Error", error});
    }
};

// GET request fetch all the product
export const getProduct = async(req, res) => {

    const { search, category } =req.query;
    let filter={};
    if (search) {
    filter.productName = { $regex: search, $options: "i" };
    }
    if (category) {
    filter.category = { $regex: category, $options: "i" }; 
    }     
    try{
     const products = await Product.find(filter).sort({ createdAt : -1 });
     res.json({products});
    }catch(error){
        res.status(500).json({message: "Server Error", error});
    }
};

// PUT request update the product
export const updateProduct = async(req, res) => {
    try{
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
       return res.status(200).json({message : "Product Updated Successfully"});   
    }catch(error){
        res.status(500).json({message: "Server Error", error});
    }
};

// DELETE request
export const deleteProduct = async(req, res) => {
    try{
        const deleted = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Product Deleted Successfully"}); 
    }catch(error){
        res.status(500).json({message: "Server Error", error});
    }
};