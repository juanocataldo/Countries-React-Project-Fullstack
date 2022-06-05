import { NavLink } from "react-router-dom";
import '../Styles/navbar.css'

export function NavBar(){
    return <>
        <nav className="navbar">
            <NavLink to='/home' className="navMenu">
            <div className="menu-button">
                <span className="material-symbols-outlined">home</span>
                Home
            <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
            </div>
            </NavLink >
            <NavLink to='/favorites' className="navMenu">
                <div className="menu-button">
                    <span class="material-symbols-outlined">favorite</span>
                    Favorites            
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>

            <NavLink to='/create_activity' className="navMenu">
                <div className="menu-button">
                    <span class="material-symbols-outlined">add_circle</span>
                    Create Activity            
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>

            <NavLink to='/about' className="navMenu">
                <div className="menu-button">
                    <span class="material-symbols-outlined">settings</span>
                    About
                    <span id="arrow" class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </NavLink>
        </nav>
    </>
}