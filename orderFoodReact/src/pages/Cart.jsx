import { useEffect, useState } from "react";
import { useCart } from "../context/StoreContext";
import CartItem from '../components/CartItem'
import '../styles/cart.css'

const Cart = () => {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] =useState(0)
  useEffect(()=>{
    const calculatePrice = cartItems.reduce((totalPrice, item)=> totalPrice + item.price*item.quantity, 0)
    setTotalPrice(calculatePrice)
  },[cartItems])
  return (
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
        <button>CheckOut</button>
      </div>
      {/* <div className="map">dsdv
        {cartItems.map((odj, index)=>(
          <div key={index} className="key">
            {JSON.stringify(odj)}
            {odj.quantity}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Cart;
