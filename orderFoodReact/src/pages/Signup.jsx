import{ useState } from 'react';
import axios from 'axios';
import "../styles/Signup.css"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const nav = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        phone,
        password,
      });
      console.log(response.data);
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setError('');
      nav("/Login")
    } catch (error) {
      console.log('Signup failed----' , error.response.message+"-----"+ error);
      // server errors
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="signup-bnts">
      <button onClick={handleSignup}>Signup</button>
      <span> <a href="/Login">Login Herer</a></span>

      </div>
    </div>
  );
};
export default Signup;
