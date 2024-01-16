import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';
import { useNavigate } from 'react-router-dom';

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
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {userInfo && (
        <div className="user-info">
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleLogout}>Logout </button>
        </div>
      )}
      {/* {orderHistory.length > 0 && (
        <div className="order-history">
          <h3>Order History</h3>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.orderId}>
                <p>Order ID: {order.orderId}</p>
                <p>Total Amount: ${order.totalAmount}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default UserProfile;
