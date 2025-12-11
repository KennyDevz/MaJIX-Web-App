import "../styles/nav_bar.css"
import { Link } from "react-router-dom"
import CartIcon from "../assets/cart-icon.png"
import SearchBar from './searchbar'
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import SignInForm from "../components/user/sign_in_form"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';   

// version 2.1 with dropdown and dropdown close on outside click
function NavBar(){
    const { user, setUser } = useContext(UserContext);
    const [showDropDown, setShowDropDown] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      // 3. Check if the click is OUTSIDE the referenced element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    // Attach the listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: Remove listener when component unmounts (prevents memory leaks)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const openSignIn = () =>{
        setShowSignIn(true)
    }

    const closeSignIn = () => {
        setShowSignIn(false)
    }

    const handleLogout = ()=> {
        if(window.confirm("Are you sure you want to logout?")){
            setUser(null); 
            localStorage.removeItem("user");
            navigate("/",{replace: true})
            setShowDropDown(!showDropDown)
            alert("You have been logged out successfully!")
        }    
    }

    return(
        <div className="nav-bar" ref={dropdownRef}>
            <h1><Link to="/" className="route-link" onClick={()=>{setShowDropDown(false)}}>MaJIX</Link></h1>

                <ul className="nav-links" onClick={()=>{setShowDropDown(false)}}>
                    <li><Link to="/Shop" className="route-link">Shop</Link></li>
                    <li><Link to="" className="route-link">Collections</Link></li>
                    <li><Link to="/AboutUs" className="route-link">About us</Link></li>
                </ul>
               
        
             <SearchBar/>
            
            <div className="user">
            <Link to="/Cart" className="cart"  onClick={()=>{setShowDropDown(false)}}>
                <ShoppingCartOutlinedIcon style={{width: '30px', height: '30px', color: '#000'}}/>
            </Link>

            { user ? (
             <div className="relative">
                {/* Profile Button */}
                
                <div
                onClick={() => setShowDropDown(!showDropDown)}
                className="rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                style={{borderRadius: '50%', cursor: 'pointer', border: '1px solid black', padding: '5px'}}
                >
                {user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}
                </div>
                

                {/* Logout Modal */}
                {showDropDown && (
                <div style={{
                    position: 'absolute', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: '#efefefff', 
                    boxShadow: '2px 4px 8px rgba(46, 42, 42, 0.1)', 
                    borderRadius: '8px',
                    padding: '10px',
                    top: '65px',
                    right: '25px',
                    width: '180px',
                    border: '1px solid #ccc',}}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}>
                        <PersonIcon style={{width: '25px', height: '25px', color: '#000'}}/>
                        <Link to="/Profile" className="route-link" onClick={()=>{setShowDropDown(!showDropDown)}}>Profile</Link>
                    </div>
                    <hr style={{backgroundColor: '#000000ff', width: '100%'}}/>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}>
                        <LogoutIcon style={{width: '25px', height: '25px', color: '#000'}}/>
                        <p className="route-link" onClick={handleLogout}>Logout</p>
                    </div>
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