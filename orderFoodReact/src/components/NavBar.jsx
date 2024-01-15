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
  const handleNavigate = ()=>{
    navigate('/cart')
  }

    const navRef = useRef(null);
     const showNavbar = () =>{
        navRef.current.classList.toggle("responsive-nav");
     }
//closing the navbar

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
                to=""
                spy={true}
                smooth={true}
                offset={-80}
                duration={ 500} onClick={showNavbar}>Services</Link>
                <Link 
                activeClass="active"
                to="Contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={700} onClick={showNavbar}>Contact Us</Link>
                <a href="/Login" onClick={showNavbar}><FiUser/></a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
                </nav>
		
		<div className="navbtn">
      <a href="/Cart" onClick={handleNavigate}>{<FiShoppingCart/> } {cartItems.length }</a>
        </div>
                
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars/>
                </button>
            
        </header>
        </>
    )
}
export default NavBar;



// import '../styles/navbar.css'
// import {FiShoppingCart, FiUser} from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom' 
// import { useCart } from '../context/StoreContext'

// function NavBar() {    
//   const navigate = useNavigate()
//     const{cartItems}= useCart()
//   const handleNavigate = ()=>{
//     navigate('/cart')
//   }
//   return (
//     <div className='navbar-container'>
//       <h2>burger shop</h2>
//         <div className="main">
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/menu">Menu</a></li>
//                 <li><a href="/">About</a></li>
//             </ul>
//         </div>
//         <div className="navbtn">
//       <div onClick={handleNavigate}>{<FiShoppingCart/> } {cartItems.length }</div>
//           <a href='/login'>{<FiUser/>}</a>
//         </div></div>
//   )
// }

// export default NavBar
