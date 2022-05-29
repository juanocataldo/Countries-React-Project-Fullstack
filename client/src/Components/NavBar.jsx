import { NavLink } from "react-router-dom";

export function NavBar(){
    return <>
        <nav>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
        </nav>
    </>
}