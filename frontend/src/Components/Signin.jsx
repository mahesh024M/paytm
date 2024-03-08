import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



export default function Signin(){
   
   
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function signin(){
        try {
            const response = await axios.post('http://localhost:7000/api/v1/user/signin', {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate('/Dashboard'); 
        } catch (error) {
            
            console.error('Error signing in:', error);
            
        }
    }
    
    return (
        <div className="grid mx-auto my-20 w-80 h-96 border border-white rounded-lg p-2 shadow">
            <div className="grid justify-items-center">
                <h1 className="block font-bold text-2xl">Sign In</h1>
                <p className="text-center text-slate-500">Enter your credentials to access your account</p>
            </div>
            <div className="grid">
               
                <label className="block font-semibold text-sm">Email</label>
                <input onChange={(e) => {setUsername(e.target.value)}} className="border border-slate rounded-md" placeholder=" johndoe@example.com"/>
                <label className="block font-semibold text-sm">Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} className="border border-slate rounded-md" placeholder=""/>
                <button className="text-white bg-black pt-1 pb-1 mt-2 rounded-lg w-full" onClick={signin}>Sign In</button>
                <p className="text-center">Dont have an account?<Link className="cursor cursor-pointer pl-1 underline" to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
}