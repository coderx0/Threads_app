import mongoose from "mongoose";

let isConnected = false;


export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    
    if(!process.env.MONGODB_URL)
    return console.log("MongoDB url not specified");

    if(isConnected) 
    return console.log("MongoDB already connected");

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true;
        console.log("MongoDB connected");
    }
    catch (error){
        console.log("MongoDB error: " + error)
    }
}