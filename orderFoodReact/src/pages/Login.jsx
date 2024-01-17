import{ useState } from 'react';
import axios from 'axios';
import "../styles/Login.css"
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      },{
        withCredentials: true
      });
      console.log(response.data); 
      setEmail('');
      setPassword('');
      setError('');
      navigate("/")
    } catch (error) {
      console.log('Login failed', error);
      setError(error.response.data.message);
    }
  };

  return (
    <div id="Login" className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-bnts">
      <button onClick={handleLogin}>Login</button>
      <span> <a href="/Signup">Create Account</a></span>

      </div>
    </div>
  );
};

export default Login;
