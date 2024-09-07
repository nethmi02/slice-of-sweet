const mongoose = require('mongoose')
const Order=require('../models/Order')


//get all the orders
const getorders= async(req,res)=>{
    const orders=await Order.find().sort({createdAt:-1})
    res.status(200).json(orders)

}
//get one order
const getorder = async (req, res) => {
    const { id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
     
        const order = await Order.findById(id);

       
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        
        res.status(200).json(order);
    } catch (error) {
     
        res.status(500).json({ error: "Internal Server Error" });
    }
};





module.exports={
    getorders,getorder
}