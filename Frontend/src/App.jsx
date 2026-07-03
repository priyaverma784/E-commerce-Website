import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/login.jsx";
import Signup from "./Pages/Signup.jsx";
import ProductDetails from "./Pages/Productdetails.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import ProductList from "./admin/ProductList.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import Cart from "./Pages/Cart.jsx";
import Wishlist from "./Pages/wishlist.jsx";
import Layout from "./Pages/Layout.jsx";
import CheckoutAddress from "./Pages/checkoutAddress.jsx";
import Checkout from "./Pages/Checkout.jsx";
import OrderSucess from "./Pages/orderSucess.jsx";
import Profile from "./Pages/profile.jsx";
import Products from "./Pages/ProductPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="admin/products" element={<ProductList />} />
        <Route path="admin/products/add" element={<AddProduct />} />
        <Route path="admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout-address" element={<CheckoutAddress />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/Order-placed/:id" element={<OrderSucess />}/>
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;