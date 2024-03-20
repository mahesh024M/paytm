


export default function Balance({firstname,value}){
      

      
    return(
        <div>
             <div className="font-semibold text-xl ml-4 my-4">
              <h1>Username:{firstname}</h1>
            </div>
            <div className="font-semibold text-xl ml-4 my-4">
                Your Balance {value} Rs
            </div>
        </div>
    )
}