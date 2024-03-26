import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
      
    const navigate=useNavigate();

    useEffect(()=>{
         
        if(localStorage.getItem("token")===null){
            navigate('/signup');
        }

        axios.get("https://paytm-app-8egh.onrender.com/api/v1/user/",{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
         })
         .then((res)=>{
              navigate('/dashboard')
         })
         .catch((err)=>{
            navigate('/signup')
         })


    })



      return(
        <div>

        </div>
      )
}
