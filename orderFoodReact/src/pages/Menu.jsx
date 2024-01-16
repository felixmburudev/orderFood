import Item from '../components/Item'
import '../styles/home.css';
import { useEffect, useState } from "react";
import axios from "axios";


const Menu = () => {
  const[items, setItems]=useState([])
  const [isAuth, setIsAuth ] =useState(false)

  useEffect(()=>{
    axios.post('http://localhost:3000/items')
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
    const cookieNameToCheck = 'authCookie'; 
    const cookieExists = checkCookie(cookieNameToCheck)
    setIsAuth(cookieExists);
  }, [])

  return (
    <div id="Menu"  className="home-main">
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
    </div>


  );
};

export default Menu;


