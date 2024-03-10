import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from '../components/NavBar'

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  // const [orderHistory, setOrderHistory] = useState([]);

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

    fetchUserProfile();
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
    <div className="container">
    <Navbar/>
    <div className="button-row">
      <button className="button">Order History</button>
      <button className="button">My Orders</button>
      <button className="button">Starred Items</button>
    </div>
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
  </div>
  
  <Footer/>
  </div>
  );
};

export default UserProfile;
