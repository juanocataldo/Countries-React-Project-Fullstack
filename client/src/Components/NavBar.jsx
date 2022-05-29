import { NavLink } from "react-router-dom";

export function NavBar(){
    return <>
        <nav>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/favorites'>Favorites</NavLink>            
            <NavLink to='/create_activity'>Create Activity</NavLink>            
        </nav>
    </>
}