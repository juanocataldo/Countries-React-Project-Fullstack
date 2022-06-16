import { NavLink } from "react-router-dom";
import '../styles/landing.css'

export function Access() {
    return <div className="visual a">

        <div className="landing">            
                <h1 id='landingTitle'>Welcome to Activity Manager</h1>                
                <h5 id='landingTitle'>To enter, please click in the <span className="material-symbols-outlined">home</span>Home section of the menu</h5> 
                <h5>or just click <NavLink className='landHome' to='/home'>here</NavLink></h5>
        </div>
        
    </div>
}