import { useEffect, useState } from "react";
import { useCart } from "../context/StoreContext";
import CartItem from '../components/CartItem'
import '../styles/cart.css'
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import Navbar from "../components/NavBar"
import axios from "axios";

const Cart = () => {
  const { cartItems } = useCart();
  const[checkOutResp, setCheckOutResp] = useState('');
  // const navigate = useNavigate();
  const [totalPrice, setTotalPrice] =useState(0)
  useEffect(()=>{
    const calculatePrice = cartItems.reduce((totalPrice, item)=> totalPrice + item.price*item.quantity, 0)
    setTotalPrice(calculatePrice)
  },[cartItems])
  const handleCheckOut = async () => {
    if (totalPrice <= 0) {
      alert('Please add items to cart first');
      return;
    }
  
    try {
      const cost = totalPrice;
      const response = await axios.post('http://localhost:3000/checkOut', { cost }, {
        withCredentials: true,
      });
      setCheckOutResp(response.data.message);
      alert('Checkout successful');
      window.location.reload();
    } catch (error) {
      alert("Error: " + error);
      console.error('Error while checking out', error);
    }
  }
  
  return (
    <div className="cart">
      <Navbar/>
    <div id="Cart" className="cart-container">
      <h2>Cart {cartItems.length}</h2>
      <ul>
        {cartItems.map((item) => (
          <div key={item.id} className="cartItem">
          
          <CartItem item={item}/></div>
          
        ))}
      </ul>
      <div className="priceTotal">
        <h3>Total Price: {totalPrice} ksh </h3> 
        <button onClick={handleCheckOut}>CheckOut</button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
