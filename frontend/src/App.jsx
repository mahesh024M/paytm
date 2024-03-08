import { Suspense } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Dashboard from './Components/Dashboard'
import SendMoney from './Components/SendMoney'
import Appbar from './Components/Appbar'
function App() {

  return (
    <div>
     <Appbar/>
       <BrowserRouter>
         <Routes>
           <Route path='/signup' element={<Suspense><Signup/></Suspense>}  />
           <Route path='/signin' element={<Suspense><Signin/></Suspense>} />
           <Route path='/dashboard' element={<Suspense><Dashboard/></Suspense>}  />
           <Route path='/send' element={<Suspense><SendMoney/></Suspense>}  />
         </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
