


export default function Appbar({firstname}){
      
      
      return(
         <div className="flex justify-between h-14 shadow">
             <div className="font-bold text-2xl flex flex-col h-full ml-4 justify-center ">Payments App</div>
              <div className="flex">
                   <div className="flex flex-col justify-center mr-4 h-full">
                     Hello
                   </div>
                   <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                     {(firstname[0])}
                    </div>
                   </div>
              </div>
         </div>
      )
}