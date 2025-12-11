import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AdminProductList from './pages/admin/AdminProductList';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import AdminReturnsPage from './pages/admin/AdminReturnsPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminLayout from './pages/admin/AdminLayout';
import CustomerLayout from './pages/customer/CustomerLayout';
import UnauthorizedPage from './pages/UnauthorizedAccess';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
          <Routes>
            {/* --- CUSTOMER GROUP --- */}
            {/* These pages will have NavBar and Footer */}
            <Route element={<CustomerLayout />}>

                {/* --- Public Routes --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/Details/:productId" element={<ProductView/>}/>
                <Route path='/Cart' element={<Cart/>}/>
                <Route path='/Sign-in' element={<SignIn/>}/>
                <Route path='/Sign-up' element={<SignUp/>}/>
                <Route path="/Details" element={<ProductView/>}/>
                <Route path='/AboutUs' element={<AboutUs/>}/>
                <Route path='/Unauthorized' element={<UnauthorizedPage/>}/>

                {/* --- Protected User Routes (Any logged-in user) --- */}
                {/* We wrap the element in ProtectedRoute without specific roles */}
                <Route 
                  path="/Checkout" 
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER']}>
                      <Checkout/>
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/Profile" 
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER']}>
                      <ProfilePage/>
                    </ProtectedRoute>
                  }
                />
            </Route>

            {/* --- Protected Admin Routes (ADMIN only) --- */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* These nested routes are automatically protected because their parent is protected */}
              <Route path="products" element={<AdminProductList />} />
              <Route path="orders" element={<AdminOrderPage />} />
              <Route path="returns" element={<AdminReturnsPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route index element={<Navigate to="products" replace />} />
            </Route>

          </Routes>
          </UserProvider>
    </Router>
  );
}

export default App;
 