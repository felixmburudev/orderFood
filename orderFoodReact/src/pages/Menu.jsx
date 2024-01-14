// Shop component - Displaying items with 'Add to Cart' button

import { useCart } from "../context/StoreContext";
import {useNavigate} from "react-router-dom"
import Item from '../components/Item'
import '../styles/home.css';
import { useEffect, useState } from "react";
import axios from "axios";


const Menu = () => {
  const{cartItems}=useCart()
  const[items, setItems]=useState([])

  useEffect(()=>{
    axios.post('http://localhost:3000/items')
    .then((response)=>{
      setItems(response.data)
    })
    .catch((err)=>{
      // alert("error fetching menu "+ err)
    })
  })

  return (
    <div  className="home-main">
    <div className="scroll-container">
      <div className="scroll-content">
      {items.map((item) => (
          <div className="item" key={item.item_id}>
          <Item itemData = {item}/>

          </div>
        ))}
</div>
    </div>
    {/* {JSON.stringify(items)} */}
    </div>


  );
};

export default Menu;
