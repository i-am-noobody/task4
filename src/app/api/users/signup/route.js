import {connect} from "../../../../dbconfig/dbConfig"
import User from "../../../../models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
       const user = await User.findOne({email})
       if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
       }
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)
       const newUser = new User({
        email,
        password:hashedPassword
       })
      await newUser.save()
      console.log(newUser)

      return NextResponse.json({message:"User created successfully",success:true,newUser})

    } catch (error) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}
