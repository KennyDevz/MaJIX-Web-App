import React, { useState, useEffect, useCallback } from 'react'; 
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin/AdminLayout.css'; 
import StatsCards from '../../components/admin/StatsCards';
import ProductFormModal from '../../components/admin/ProductFormModal'; 
import ProductViewModal from '../../components/admin/ProductViewModal';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../../context/UserContext"

// Define the product-specific URL
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;
const ORDERS_API_URL = `${API_BASE_URL}/orders/all`; 
const RETURNS_API_URL = `${API_BASE_URL}/returns`;

export default function AdminLayout() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { logout } = React.useContext(UserContext);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState(null);

  const handleLogout = async () => {
      if (window.confirm("Are you sure you want to logout?")) {
          await logout(); 
          navigate("/", { replace: true });
      }
  };

  // --- 2. FETCH ALL DATA ---
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      // Execute all requests in parallel
      const [productsRes, ordersRes, returnsRes] = await Promise.all([
        axios.get(PRODUCTS_API_URL),
        axios.get(ORDERS_API_URL), 
        axios.get(RETURNS_API_URL),
      ]);

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setReturns(returnsRes.data);

    } catch (e) {
      console.error("Error fetching admin data:", e);
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  
  // Calculate Revenue (Sum of non-cancelled orders)
  const revenue = orders
    .filter(order => order.status !== 'CANCELLED')
    .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Handlers
  const handleOpenViewModal = (product) => { setProductToView(product); setIsViewModalOpen(true); };
  const handleCloseViewModal = () => { setIsViewModalOpen(false); setProductToView(null); };
  const handleOpenAddModal = () => { setProductToEdit(null); setIsModalOpen(true); };
  const handleOpenEditModal = (product) => { setProductToEdit(product); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setProductToEdit(null); };

  const handleSuccess = () => {
    fetchAllData(); 
    handleCloseModal();
  };

  const handleDelete = async (productId) => {
    if (!window.confirm(`Are you sure you want to delete product ID ${productId}?`)) return;
    try {
      await axios.delete(`${PRODUCTS_API_URL}/${productId}`);
      alert('Product deleted successfully!');
      fetchAllData(); 
    } catch (e) {
      alert(`Error deleting product: ${e.message}`);
    }
  };

  const stats = {
    productCount: loading ? '...' : products.length,
    totalOrders: loading ? '...' : orders.length,     
    pendingOrders: loading ? '...' : orders.filter(o => o.status === 'PENDING').length,
    returnRequest: loading ? '...' : returns.filter(r => r.status === 'PENDING').length,
    totalRevenue: loading ? '...' : `₱ ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };

  return (
    <div className="admin-container">
      <div className="admin-header" style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', borderBottom: '1px solid #ccc'}}>
        <h1>MaJIX Admin</h1>
        <div style={{backgroundColor: '#000', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', border: '1px solid #000', cursor: 'pointer', padding: '0 10px',height:'fit-content', borderRadius: '5px'}} onClick={handleLogout}>
            <LogoutIcon style={{width: '25px', height: '25px', color: '#ffffffff'}}/>
            <p style={{color: '#FFF', fontWeight: "bold"}}>Logout</p>
        </div>
      </div>
      
      <StatsCards stats={stats} />

      <div className="admin-tabs">
        <NavLink to="/admin/products" className="tab-item">Products</NavLink>
        <NavLink to="/admin/orders" className="tab-item">Orders</NavLink>
        <NavLink to="/admin/returns" className="tab-item">Returns</NavLink>
        <NavLink to="/admin/customers" className="tab-item">Customers</NavLink>
      </div>

      <div className="content-area">
        <Outlet context={{ products, loading, error, handleOpenAddModal, handleOpenEditModal, handleOpenViewModal, handleDelete }} />
      </div>

      {isModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}

      {isViewModalOpen && (
        <ProductViewModal 
          product={productToView} 
          onClose={handleCloseViewModal} 
        />
      )}
    </div>
  );
}