import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/nav_bar';
import './styles/App.css';
import './styles/AboutUs.css';
import './styles/AdminCss.css';
import './styles/admin/AdminOrderPage.css';
import './styles/admin/AdminLayout.css';
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
import AdminProductList from './pages/admin/AdminProductList';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import AdminReturnsPage from './pages/admin/AdminReturnsPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  return (
    <Router>
        <NavBar />
        <div className="main-content">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Details/:productId" element={<ProductView/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Sign-in' element={<SignIn/>}/>
            <Route path='/Sign-up' element={<SignUp/>}/>
            <Route path="/Details" element={<ProductView/>}/>
            <Route path="/Checkout" element={<Checkout/>}/>
            <Route path="/Profile" element={<ProfilePage/>}/>
            <Route path='/AboutUs' element={<AboutUs/>}/>
            {/* ... etc. */}

            {/* --- Admin Routes --- */}
            <Route path="/admin" element={<AdminLayout />}>
              {/* These routes render INSIDE the <Outlet> */}
              <Route path="products" element={<AdminProductList />} />
              <Route path="orders" element={<AdminOrderPage />} />
              <Route path="returns" element={<AdminReturnsPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              
              {/* Add a default route for /admin */}
              <Route index element={<Navigate to="products" replace />} />
            </Route>

          </Routes>
        </div>

    <Footer />
    </Router>
  );
}

export default App;
 