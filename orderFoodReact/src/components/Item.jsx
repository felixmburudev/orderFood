import { useCart } from "../context/StoreContext";
import '../styles/food.css'
import { useNavigate } from 'react-router-dom';

const Item = ({itemData, isAuth}) => {
    const { addToCart} = useCart();
    const navigate =useNavigate()
    
    const {image, ...itemToCart} = itemData
    const addItemToCart = ()=>{
        if (isAuth) {
           addToCart(itemToCart)
        }
        else{
          navigate("/Profile")
        }
      }    
    
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
            <button onClick={addItemToCart}>Order Food</button>
          </div>     
      </div>
    </div>
  )
}

export default Item
