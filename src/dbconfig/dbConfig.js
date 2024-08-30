import mongoose from "mongoose"

export async function connect(){
    try{
        mongoose.connect("mongodb+srv://admin:admin@cluster0.vsxci79.mongodb.net/nextjs?retryWrites=true&w=majority&appName=Cluster0")
        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("Mongodb connected successfully")
        })

        connection.on("error",(err)=>{
            console.log("Mongodb error", err.message)
            process.exit()
        })
    }
    catch(error){
        console.log(error.message)
    }
}