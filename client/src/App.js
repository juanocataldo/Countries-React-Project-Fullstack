import { useEffect } from 'react'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { Home } from '../src/Components/Home'
import { Access } from './Components/Access';
import { getAllCountries, getCountries } from './Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CreateActivity } from './Components/CreateActivity';
import { NavBar } from './Components/NavBar';
import { CountryDetails } from './Components/CountryDetails';
import { Favorites } from './Components/Favorites';
import { Home2 } from './Components/Home2';
import { Dock } from './Components/Dock';
import { About } from './Components/About';
import { Landing } from './Components/Landing';
function App() {

  const dispatch = useDispatch()
  
  const allCountries = useSelector(store => store.countries)

  useEffect(() => {
    // INSERT MASIVO INICIAL
    // dispatch(getAllCountries()) 
    dispatch(getCountries())
  },[])
 

  return (
    <div className="App"> 
    
    {/* <NavBar />     
    <Dock /> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/*' element={<Home />} />
        {/* <Route path='/favorites' element={<Favorites />} />
        <Route path='/details/:id' element={<CountryDetails /> } />
        <Route path='/create_activity' element={<CreateActivity />} />
        <Route path='/home' element={<Home2 countries={allCountries} />} /> */}
      </Routes>      
      
      
    </div>
  );
}

export default App;
 