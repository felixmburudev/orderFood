import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';
import {  useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from '../components/NavBar'
import { FaCheck, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
 
  useEffect(() => {
    
    const fetchUserProfile = async () => {
    
      try {
        const response = await axios.get('http://localhost:3000/user-profile', {
          withCredentials: true, 
        });
      
        setUserInfo(response.data.user);
        // setOrderHistory(response.data.orderHistory);
      } catch (error) {
        console.error('Error fetching user profile', error);
        navigate("/Login")
      }
    };
    const fetchUserOrders = async () => {
    
      try {
        const response = await axios.get('http://localhost:3000/userOrders', {
          withCredentials: true, 
        });
      
        // alert(JSON.stringify(response));
        setOrderHistory(response.data.orderHistory);
      } catch (error) {
        alert("Error: " + error)
        console.error('Error fetching user orders', error);
      }
    };


    fetchUserProfile();
    fetchUserOrders()
  }, []);

  const handleLogout = () => {
    try {
      axios.post('http://localhost:3000/logout', null, {
        withCredentials: true, 
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="account-container">
      <Navbar/>
      <div className="container">
        {/* <div className="button-row">
          <button className="button">Order History</button>
          <button className="button">My Orders</button>
          <button className="button">Starred Items</button>
        </div> */}
        <div className="user-profile-container">
          <h2>User Profile</h2>
          {userInfo && (
            <div className="user-info">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <div className="my-orders">
          <h2>My Orders</h2>
          {orderHistory && (
        <div className="order-history">
          {orderHistory.map((order, index) => (
            <div key={index} className="order-item">
              <p> Order Date: {order.order_date}</p>
              <p><strong>Price:</strong> {order.order_cost} ksh</p>             
              <p> Order Derivered?  {order.order_derivered? <FaCheck/> : <FaTimes/>}</p>              
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="footer-sec">
      <Footer/>
      </div>
      </div>
    </div>
  );
  
};

export default UserProfile;
