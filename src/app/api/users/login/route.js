import {connect} from "../../../../dbconfig/dbConfig"
import User from "../../../../models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()
const Jwt_secret = "ab123"

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
       const user = await User.findOne({email})
       if(!user){
        return NextResponse.json({error:"User doesnot exists"},{status:400})
       }
       const validPassword = await bcryptjs.compare(password,user.password)
       if(!validPassword){
        return NextResponse.json({error:"Password error"},{status:400})
       }
       const tokenData ={
        id:user._id,
        email:user.email
    }
    const token = await jwt.sign(tokenData,Jwt_secret,{expiresIn:"2d"})
    const response = NextResponse.json({
        message:"User loggedin successfully",
        success:true
    })
    response.cookies.set("token",token,{
        httpOnly:true
       
    })
    return response;

    } catch (error) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}

