import React from 'react'
import '../styles/navbar.css'
import {FiShoppingCart, FiUser} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom' 
import { useCart } from '../context/StoreContext'

function NavBar() {    
  const navigate = useNavigate()
    const{cartItems}= useCart()
  const handleNavigate = ()=>{
    navigate('/cart')
  }
  return (
    <div className='navbar-container'>
      <h2>buger shop</h2>
        <div className="main">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/">About</a></li>
            </ul>
        </div>
      <button onClick={handleNavigate}>{<FiShoppingCart/> } {cartItems.length }</button>
    </div>
  )
}

export default NavBar
