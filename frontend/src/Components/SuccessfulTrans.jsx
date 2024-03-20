import { useLocation } from "react-router-dom"

export default function SuccessfulTrans(){
  const location=useLocation();
  const data=location.state.msg;
    return (<div>
         <h1>Transaction is {data}</h1>
    </div>)
}