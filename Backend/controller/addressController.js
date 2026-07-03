import Address from "../models/Address.js";

// Save Address
export const saveAddress  = async(req, res) => {
    try{
        const address = await Address.create(req.body);
        res.json({message: "Adrees Saved successfully", address });
    }catch(err){
        res.status(500).json({message: "Error saving address", err})
    }
}

// Get Address
export const getAddresses = async(req, res) => {
    try{
        const addresses = await Address.find({
            userId : req.params.userId
        });
        res.json(addresses);
    } catch(err){
        res.status(500).json({ message: "Errro fetching Address", err})
    }
}