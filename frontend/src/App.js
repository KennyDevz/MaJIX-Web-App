import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/nav_bar';
import './styles/App.css';
import './styles/AboutUs.css';
import Checkout from './pages/checkout';
import ProfilePage from './pages/profile';
import SignIn from './pages/sign_in';
import SignUp from './pages/sign_up'
import Shop from './pages/shop';
import Cart from './pages/cart';
import HomePage from './pages/homepage';
import ProductView from './pages/product_view';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import AdminProductList from './pages/AdminProductList';


function App() {
  return (
    <div>
    
      <Router>
      <NavBar/>


      <div className='main-content'>
        <Routes>  
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Shop' element={<Shop/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Sign-in' element={<SignIn/>}/>
        <Route path='/Sign-up' element={<SignUp/>}/>
        <Route path="/Details" element={<ProductView/>}/>
        <Route path="/Checkout" element={<Checkout/>}/>
        <Route path="/Profile" element={<ProfilePage/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>

        <Route path='/admin' element={<AdminProductList/>}/>

        </Routes>
        
      </div>
      
      <Footer/>

      </Router>
        
        

    </div>
  );
}

export default App;
 