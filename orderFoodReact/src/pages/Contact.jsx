import  { useState } from 'react';
import axios from 'axios';
import "../styles/contact.css"
import NavBar from '../components/NavBar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';


const ContactForm = () => {
  
  const location = useLocation()
  const isActive = location.pathname ==="/"
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-container">
        
     {!isActive && <NavBar />}
        <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
    {!isActive && <Footer/>}
    </div>
   
  );
};

export default ContactForm;
