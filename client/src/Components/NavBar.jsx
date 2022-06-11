import { NavLink } from "react-router-dom";
import '../Styles/navbar.css'

export function NavBar(){
    return <>
        <nav className="navbar">
            <NavLink to='/home' className="navMenu">
            <div className="menu-button">
                <span id="navIcon" className="material-symbols-outlined">home</span>
                <span id="textito">Home</span> 
            <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
            </div>
            </NavLink >
            <NavLink to='/favorites' className="navMenu">
                <div className="menu-button">
                    <span id="navIcon" class="material-symbols-outlined">favorite</span>
                   <span id="textito">Favorites</span>             
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>

            <NavLink to='/create_activity' className="navMenu">
                <div className="menu-button">
                    <span id="navIcon" class="material-symbols-outlined">add_circle</span>
                    <span id="textito">Activity</span>             
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>

            <NavLink to='/about' className="navMenu">
                <div className="menu-button">
                    <span id="navIcon" class="material-symbols-outlined">settings</span>
                    <span id="textito">About</span> 
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>
            
        </nav>
    </>
}