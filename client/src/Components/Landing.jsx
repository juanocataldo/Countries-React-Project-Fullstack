import { NavLink } from "react-router-dom";
import '../Styles/landing.css'

export function Landing(){
    return <div className="wallpaper">
         <div className="landing">            
                <h1 id=''>Welcome to Activity Manager</h1>                
                <h5 id='landingTitle'>To enter, please click <NavLink className='landHome' to='/home'> here</NavLink></h5>                 
                
        </div>
    </div>
}