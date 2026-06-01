import mongoose from "mongoose"


const connection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection to db successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connection;