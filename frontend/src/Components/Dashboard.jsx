import { useEffect, useState } from "react"
import Appbar from "./Appbar"
import Balance from "./Balance"
import Users from "./Users"
import axios from "axios";


export default function Dashboard(){

    const [balance,setBalance]=useState(0);
    const [firstname,setFirstname]=useState("");
    useEffect(()=>{
        
     axios.get("http://localhost:10000/api/v1/account/balance",{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
         })
         .then((res)=>{
             setBalance(res.data.balance);
         })

         axios.get("http://localhost:10000/api/v1/user/getuser",{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
         })
         .then((res)=>{
             setFirstname(res.data.firstname);
         })



       
    },[])
     return (
        <div>

        <Appbar firstname={firstname}/>
       <Balance value={balance} firstname={firstname}/>
       <Users />
        </div>
     )
}