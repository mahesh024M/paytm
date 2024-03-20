import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Users(){

   const [users,setUsers]=useState([]);
   const [filter,setFilter]=useState("");
  
   useEffect(()=>{
       axios.get(`http://localhost:7000/api/v1/user/bulk?filter=${filter}`)
       .then((response)=>{
           
           setUsers(response.data.user);
       })
   },[filter])

     return(
        <div> 
           <div>Users</div>
           <div >
             <input placeholder="Search users.."  className="w-full bg-white border"  onChange={(e)=>{
                 setFilter(e.target.value);
             }}/>
           </div>
           <div>
             {users.map(user=><User key={user._id} user={user}/>)}
           </div>
        </div>
     )
}

function User({user}){
    const navigate=useNavigate();
   return <div className="flex justify-between">
   <div className="flex">
       <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
           <div className="flex flex-col justify-center h-full text-xl">
               {user.firstname[0]}
           </div>
       </div>
       <div className="flex flex-col justify-center h-ful">
           <div>
               {user.firstname} {user.lastname}
           </div>
       </div>
   </div>

   <div className="flex flex-col justify-center h-ful mr-2">
      <button onClick={()=>{
         navigate("/send",{state:{id:user._id,name:user.firstname}});
      }} className="text-white bg-black pt-1 pb-1 mt-2 rounded-lg w-full mr-7">Send Money</button>
   </div>
</div>
}