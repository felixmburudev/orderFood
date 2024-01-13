/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useCart } from "../context/StoreContext";
import '../styles/cartItem.css'
import axios from "axios";

const CartItem = ({item}) => {
    const { increaseQuantity, reduceQuantity, removeItem } = useCart();
    const[image, setImage]=useState()

    useEffect(()=>{
  axios.post(`http://localhost:3000/image`,{item})
  .then((response) => {
    setImage(response.data);
  })
  .catch((error) => {
    // Handle errors
    console.log("erro image" +error)
  });
//
    })

  return (
    <div className="cart-item">
      <div className="cartItems">
        <img src={image} alt="" />
        <h4>{item.name}</h4>
        <p><strong>Price:</strong>{item.price} ksh</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
      </div>
      <div className="cart-btn">
            <button onClick={() => increaseQuantity(item)}>+</button>
            <button onClick={() => reduceQuantity(item, )}>-</button>
            <button onClick={()=> removeItem(item)}>Remove </button>

      </div>
    </div>
  )
}

export default CartItem
