'use client';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast from 'react-hot-toast';

export default function Signuppage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const onSignup=async()=>{
        try {
            setLoading(true)
        const response = await axios.post("/api/users/signup", user)
        console.log("Signup success", response.data)
        router.push("/login")
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    })
    return(
        <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl mb-6 font-semibold'>Signup Page</h1>
        <label htmlFor='email'>Email</label>
        <input
        className='p-2 border mt-1 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='text'
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder='email'
        />

        <label htmlFor='password'>Password</label>
        <input
        className='p-2 border mt-1 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='text'
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder='password'
        />

        <button onClick={onSignup} className='px-4 py-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ?"Fill the details":"Signup"}</button>
        </div>
    )
}

