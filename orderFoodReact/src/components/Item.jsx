import {useEffect, useState} from 'react'
import { useCart } from "../context/StoreContext";
import '../styles/food.css'

const Item = ({itemData}) => {
    const { addToCart, cartItems } = useCart();
    const[inCart, setInCart]=useState()
    
    const {image, ...itemToCart} = itemData
    
  return (
    <div className="food-containerr">
      <div  className="food-container">
         <div className="img-div"><img src={itemData.image} alt="" /></div> 
          <div className="descr">
            <div className="food-info">
            <h2 className="name">
              {itemData.name}
            </h2>
            <p className="price"> {itemData.price} Ksh</p>
          </div>
            <p className='about'> {itemData.item_description}</p>
            <button onClick={()=>addToCart(itemToCart)}>Order Food</button>
          </div>     
      </div>
    </div>
  //   <div>
  //      <div className="food-main">
  //   <div className="food-container">
  //       <img src="./buger.jpg" alt="" />
  //       <div className="descr">
  //         <div className="food-info">
  //         <p className="name">
  //           {itemData.name}
  //         </p>
  //         <p className="price"> {itemData.price} Ksh</p>
  //       </div>
  //         <button onClick={()=>addToCart(itemData)}>Order Food</button>
  //       </div>        
  //   </div>
    
  //  </div>
  //           {/* {itemData.name} - ${itemData.price}
  //           <button onClick={() => addToCart(itemData)}>{inCart? 'inCart':'add' }</button> */}
  //   </div>
  )
}

export default Item
