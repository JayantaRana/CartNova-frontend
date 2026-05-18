import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./components/CheckoutPage";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProductDetailsPage from './pages/ProductDetailsPage';
function App() {
  return (
   
    <BrowserRouter>


    <ToastContainer 
        position="bottom-center" 
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/" element={<AdminLogin />} /> */}
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/products" element={<Products />} />

         <Route path="/signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/admin" element={<AdminLogin/>} />
         <Route path="/admin-dashboard" element={<AdminDashboard/>} />
         <Route path="admin/add-product" element={<AddProduct/>} />
         <Route path="/admin/edit-product/:id" element={<EditProduct/>} />
          <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrdersPage/>} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;