import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.LOCAL_DB_CONNECTION);
        console.log(`Connected to the database cluster ${conn.connection.host} successfully`); 

    } catch (error) {
        console.log(error);
    }
    
}

export default dbConnect;