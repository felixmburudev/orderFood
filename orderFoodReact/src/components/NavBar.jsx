import {FaBars , FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-scroll";
import { useLocation } from 'react-router-dom';

import '../styles/navbar.css'
import {FiShoppingCart, FiUser} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom' 
import { useCart } from '../context/StoreContext'

function NavBar(){
  const navigate = useNavigate()
    const{cartItems}= useCart()

    const location = useLocation();

    const isActivePage = location.pathname === '/';

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
            
      {isActivePage ?  <nav ref={navRef}>
                <Link to="Home"
                href="/contact"
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
                to="About"
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
                {/* <button> */}
                    <FaTimes className="nav-btn nav-close-btn"   onClick={showNavbar}/>
                {/* </button> */}
                </nav>:
                <nav  ref={navRef}>
                <a href="/" className="active" onClick={showNavbar}>Home</a>
                <a href="/Menu" onClick={showNavbar}>Menu</a>
                <a href="/About" onClick={showNavbar}>About</a>
                <a href="/Contact" onClick={showNavbar}>Contact Us</a>
                <a href="/Profile" onClick={showNavbar}><FiUser/></a>
                <FaTimes className="nav-btn nav-close-btn" onClick={showNavbar}/>
              </nav>
              
                }
            
		
		<div className="navbtn">
      <a  onClick={openCart}>{<FiShoppingCart/> }   :&nbsp;{cartItems.length }</a>
        </div>                
     {/* <button> */}
        <FaBars  className="nav-btn" onClick={showNavbar}/>
      {/* </button> */}
            
        </header>
        </>
    )
}
export default NavBar;

