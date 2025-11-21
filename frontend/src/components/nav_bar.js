import "../styles/nav_bar.css"
import { Link } from "react-router-dom"
import CartIcon from "../assets/cart-icon.png"
import SearchBar from './searchbar'
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"
import SignInForm from "../components/user/sign_in_form"

// version 2
function NavBar(){
    const { user, setUser } = useContext(UserContext);
    const [showDropDown, setShowDropDown] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)

    const openSignIn = () =>{
        setShowSignIn(true)
    }

    const closeSignIn = () => {
        setShowSignIn(false)
    }

    return(
        <div className="nav-bar">
            <h1><Link to="/" className="route-link">MaJIX</Link></h1>

                <ul className="nav-links">
                    <li><Link to="/Shop" className="route-link">Shop</Link></li>
                    <li><Link to="" className="route-link">Collections</Link></li>
                    <li><Link to="/AboutUs" className="route-link">About us</Link></li>
                </ul>
               
        
             <SearchBar/>
            
            <div className="user">
            <Link to="/Cart" className="route-link">
                <img src={CartIcon} alt="cart-icon"/>
            </Link>

            { user ? (
             <div className="relative">
                {/* Profile Button */}
                
                <div
                onClick={() => setShowDropDown(!showDropDown)}
                className="rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                style={{borderRadius: '40%', cursor: 'pointer', border: '1px solid black', padding: '5px'}}
                >
                👤
                </div>
                

                {/* Logout Modal */}
                {showDropDown && (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Link to="/Profile" className="route-link">Profile</Link>
                </div>
                )}
                </div>
                ):(
                <ul className="user-links">
                    <li className="route-link" onClick={openSignIn}>Sign In</li>
                    <li><Link to="/Sign-up" className="route-link">Sign Up</Link></li>
                </ul>

            )}
            </div>
            
            {showSignIn && (<SignInForm onClose={closeSignIn}/>)}
             
        </div>
    )
}

export default NavBar;