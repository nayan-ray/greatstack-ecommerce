import React from 'react'
import Admin from './pages/admin/Admin';
import Navbar from './components/Navbar/Navbar';
import { Route, Router } from 'react-router-dom';


const App = () => {
  return (
    <div >
         <Navbar />
         <Admin />      
    </div>
  )
}

export default App;


