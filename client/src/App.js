import { useEffect } from 'react'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { Home } from '../src/Components/Home'
import { Access } from './Components/Access';
import { getAllCountries } from './Redux/actions';
import { useDispatch } from 'react-redux';
import { CreateActivity } from './Components/CreateActivity';
import { NavBar } from './Components/NavBar';
import { CountryDetails } from './Components/CountryDetails';
import { Favorites } from './Components/Favorites';
import { Home2 } from './Components/Home2';
function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    // INSERT MASIVO INICIAL
    // dispatch(getAllCountries()) 
  },[])
 

  return (
    <div className="App"> 
    <NavBar />     
      <Routes>
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/details/:id' element={<CountryDetails /> } />
        <Route path='/create_activity' element={<CreateActivity />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Access />} />
      </Routes>      
      
      
    </div>
  );
}

export default App;
 