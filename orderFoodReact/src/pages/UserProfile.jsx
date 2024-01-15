import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-profile', {
          withCredentials: true, 
        });

        setUserInfo(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userInfo && (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
    </div>
  );
};
export default UserProfile;
