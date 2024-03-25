import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


export default function SendMoney(){

    const location=useLocation();
    const data=location.state;
    const [amount,setAmount]=useState(0)
    const navigate=useNavigate()
    return (
        <div className="flex justify-center h-screen bg-gray-100 ">

          <div className="m-10 flex flex-col  mx-auto mt-20 w-96 h-96 shadow-md">
          <div className=" flex  justify-center text-2xl font-bold mb-10">Send Money</div>
            <div className="flex gap-x-4 ml-1 mb-5 mt-1  ">
                <div className=" rounded-full   bg-green-400 flex  justify-center w-8 h-8 text-xl text-white">{data.name[0].toUpperCase()}</div>
                <div className="flex flex-col justify-center text-xl font-bold">{data.name}</div>
            </div>
            <div className="font-bold mb-1">Amount (in Rs)</div>
            <div className=""> <input onChange={(e)=>setAmount(e.target.value)} className="w-full rounded-md border-2 p-1" placeholder="Enter amount" type="number" /></div>
            <div className="flex justify-center mt-5"><button onClick={async()=>{
                         try{
                          await axios.post("http://localhost:10000/api/v1/account/transfer",{
                              amount:amount,
                              to:data.id
                          },{
                             headers:{
                               Authorization:"Bearer "+ localStorage.getItem("token")
                             }
                          })
                          navigate('/success',{state:{msg:"success"}})
                         } catch(err){
                         
                           console.log(err);
                           navigate('/success',{state:{msg:"Failed"}})
                         }

            }} className="text-white bg-green-400 rounded-md w-full p-2">Initiate Transfer</button></div>
            
          </div>
        </div>
    )
}