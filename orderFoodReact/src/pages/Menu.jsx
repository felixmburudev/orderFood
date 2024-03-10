import Item from '../components/Item'
import '../styles/home.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from './Footer';


const Menu = () => {
  const[items, setItems]=useState([])
  const [isAuth, setIsAuth ] =useState(false)
  const location = useLocation()
  const isActive = location.pathname ==="/"
  useEffect(()=>{
    axios.get('http://localhost:3000/items')
    .then((response)=>{
      setItems(response.data)
    })
    .catch((err)=>{
      console.log("error fetching menu ", err)
    })
    //
    const checkCookie = (cookieName) => {
      return document.cookie.split(';').some((cookie) => {
        return cookie.trim().startsWith(`${cookieName}=`);
      });
    };

    // check if the cookie is present
    const cookieName = 'authCookie'; 
    const cookieExists = checkCookie(cookieName)
    setIsAuth(cookieExists);
  }, [])

  return (
    <div id="Menu"  className="home-main">
     {!isActive && <NavBar />}
    <div className="scroll-container">
      <div className="scroll-content">
      {items.map((item) => (
          <div className="item" key={item.item_id}>
          <Item itemData = {item} isAuth ={isAuth}/>

          </div>
        ))}
</div>
    </div>
    {/* {JSON.stringify(items)} */}
    {!isActive && <Footer />}

    </div>


  );
};

export default Menu;


