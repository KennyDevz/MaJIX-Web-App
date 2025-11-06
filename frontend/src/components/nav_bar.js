import "../styles/nav_bar.css"
import { Link } from "react-router-dom"
import CartIcon from "../assets/cart-icon.png"
import SearchBar from './searchbar'
import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

function NavBar(){
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
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
             {user && 
             <button onClick={()=> {
                setUser(null); 
                alert("Logged Out");
                localStorage.removeItem("user");
                navigate("/Sign-in",{replace: true})
            }}
            >LOGOUT</button>

             }
             
        </div>
    )
}

export default NavBar;