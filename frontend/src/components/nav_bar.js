import "../styles/nav_bar.css"
import { Link } from "react-router-dom"
import CartIcon from "../assets/cart-icon.png"
import SearchBar from './searchbar'

function NavBar(){
    return(
        <div className="nav-bar">
            <h1><Link to="/" className="route-link">MaJIX</Link></h1>

                <ul className="nav-links">
                    <li><Link to="/Shop" className="route-link">Shop</Link></li>
                    <li><Link to="" className="route-link">Collections</Link></li>
                    <li><Link to="" className="route-link">About us</Link></li>
                </ul>
               
        
             <SearchBar/>
             <Link to="/Cart" className="route-link">
                <img src={CartIcon} alt="cart-icon"/>
            </Link>


             <ul className="user-links">
                <li><Link to="/Sign-in" className="route-link">Sign In</Link></li>
                <li><Link to="/Sign-up" className="route-link">Sign Up</Link></li>
             </ul>
        </div>
    )
}

export default NavBar;