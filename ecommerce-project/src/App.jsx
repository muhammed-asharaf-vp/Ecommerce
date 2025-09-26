import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Footer from './Component/Footer'
import Navbar from './Component/Navbar'
import Home from './Component/Home'
import Login from './Pages/Login'
import SignUp from './Pages/signUp'
import ForgetPass from './Pages/ForgetPass'



function App() {
  return (
    <div>
             <Navbar /> 
     
             <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/forget' element={<ForgetPass />}/>
     
      
 
           </Routes>
      
      <Footer />
   
      
    </div>
  )
}

export default App
