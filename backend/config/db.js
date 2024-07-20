import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://nikhilreddy:9391131724@cluster0.7v5aibu.mongodb.net/food-del').then(()=>console.log("DB connected"));


}