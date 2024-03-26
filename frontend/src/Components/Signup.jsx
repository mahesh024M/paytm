import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup(){
    
    return (
        <div>
            <SignupPage/>
        </div>
    );
}

function SignupPage(){

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    async function signup(){
        try {
            const response = await axios.post('https://paytm-app-8egh.onrender.com/api/v1/user/signup', {
                username,
                firstname,
                lastname,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate('/Dashboard'); 
        } catch (error) {
            
            console.error('Error signing up:', error);
            
        }
    }
    
    return (
        <div className="grid mx-auto my-20 w-80 h-96 border border-white rounded-lg p-2 shadow">
            <div className="grid justify-items-center">
                <h1 className="block font-bold text-2xl">Sign Up</h1>
                <p className="text-center text-slate-500">Enter your information to create an account</p>
            </div>
            <div className="grid">
                <label className="block font-semibold text-sm">First Name</label>
                <input onChange={(e) => {setFirstName(e.target.value)}} className="border border-slate rounded-md text-justify" placeholder="John"/>
                <label className="block font-semibold text-sm">Last Name</label>
                <input onChange={(e) => {setLastName(e.target.value)}} className="border border-slate rounded-md text-justify" placeholder="Doe"/>
                <label className="block font-semibold text-sm">Email</label>
                <input onChange={(e) => {setUsername(e.target.value)}} className="border border-slate rounded-md" placeholder="johndoe@example.com"/>
                <label className="block font-semibold text-sm">Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} className="border border-slate rounded-md" placeholder="Enter your password"/>
                <button className="text-white bg-black pt-1 pb-1 mt-2 rounded-lg w-full" onClick={signup}>Sign Up</button>
                <p className="text-center">Already have an account?<Link className="pointer underline pl-1 cursor-pointer" to="/signin">Sign in</Link></p>
            </div>
        </div>
    );
}
