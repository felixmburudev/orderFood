import {FaBars , FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-scroll";

import '../styles/navbar.css'
import {FiShoppingCart, FiUser} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom' 
import { useCart } from '../context/StoreContext'

function NavBar(){
  const navigate = useNavigate()
    const{cartItems}= useCart()

    const navRef = useRef(null);
     const showNavbar = () =>{
        navRef.current.classList.toggle("responsive-nav");
     }
const openCart = ()=>{
  const cookieName = "authCookie"
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name] = cookie.split('=');
    if (name === cookieName) {
      navigate('/cart')
    }
    else{
      navigate("/Profile")
    }
  }    

 
}

    return (
      <>
        <header>
            <h2>burger shop</h2>
            <nav ref={navRef}>
                <Link to="Home"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500} onClick={showNavbar}>Home</Link>
                <Link 
                activeClass="active"
                to="Menu"
                spy={true}
                smooth={true}
                offset={-80}
                duration={ 500}onClick={showNavbar}>Menu</Link>
                <Link 
                activeClass="active"
                to="/About"
                spy={true}
                smooth={true}
                offset={-80}
                duration={ 500} onClick={showNavbar}>About</Link>
                <Link 
                activeClass="active"
                to="Contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={700} onClick={showNavbar}>Contact Us</Link>
               <a href="/Profile" onClick={showNavbar}><FiUser/></a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
                </nav>
		
		<div className="navbtn">
      <a  onClick={openCart}>{<FiShoppingCart/> } {cartItems.length }</a>
        </div>                
     <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
            
        </header>
        </>
    )
}
export default NavBar;

