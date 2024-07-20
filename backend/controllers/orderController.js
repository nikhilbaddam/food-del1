import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//import stripe from "stripe"
//const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order for frontend
const  placeOrder=async(req,res)=>{
    const frontend_url="https://food-del1-frontend.onrender.com/";

    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        res.json({
            success :true,
            redirect_url:`/verify?success=true&orderId=${newOrder._id}`
        });

        
            
       
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
    

}
const verifyOrder= async(req,res)=>{
    const{orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"errOR"})
        
    }

}


//user orders for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"erroe"})
        
    }

}
//listing orders for admin panel
const listOrders =async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Erroe"})
        
    }

}
//api for updating order status

const updateStatus= async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"erroe"})
        
    }

}

export {placeOrder,userOrders,verifyOrder,listOrders,updateStatus}
