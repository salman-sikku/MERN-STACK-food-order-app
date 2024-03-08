import mongoose from "mongoose";
import dotenv from 'dotenv' ;
dotenv.config()

// contion with db

const connectdb = async()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI) ;
       console.log(`Connected with db ${conn.connection.host}`)
    } catch (error) {
        console.log(`Not connected with db error ${error}`)
    }
}

export default connectdb