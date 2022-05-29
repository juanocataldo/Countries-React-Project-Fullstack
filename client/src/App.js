import { useEffect } from 'react'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { Home } from '../src/Components/Home'
import { Access } from './Components/Access';
function App() {

  
  useEffect(() => {
  },[])
 

  return (
    <div className="App">      
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Access />} />
      </Routes>      
      
      
    </div>
  );
}

export default App;
