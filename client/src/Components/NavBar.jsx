import { NavLink } from "react-router-dom";
import '../Styles/navbar.css'

export function NavBar(){
    return <>
        <nav className="navbar">
            <NavLink to='/home' className="menu-button navMenu">
            <div className="menu-button">
                <span className="material-symbols-outlined">gite</span>
                Home
            </div>
            </NavLink >
            <NavLink to='/favorites' className="menu-button navMenu">
                <div className="menu-button">
                    <span class="material-symbols-outlined">favorite</span>
                    Favorites            
                </div>
            </NavLink>

            <NavLink to='/create_activity' className="menu-button navMenu">
                <div className="menu-button">
                    <span class="material-symbols-outlined">add_circle</span>
                    Create Activity            
                </div>
            </NavLink>
        </nav>
    </>
}