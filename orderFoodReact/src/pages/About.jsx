import '../styles/About.css'; 
const About = () => {
  return (
    <div id='About' className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p>Welcome to our online ordering company!</p>
      <p>We provide convenient and efficient online ordering services for customers in Mombasa and Nairobi.</p>
      <h2 className="location-heading">Our Locations</h2>
      <ul className="location-list">
        <li className="location-item">Mombasa</li>
        <li className="location-item">Nairobi</li>
      </ul>
      <div className="contact-details">
        <h2 className="contact-heading">Contact Us</h2>
        <ul className="contact-list">
          <li className="contact-item">Email: info@example.com</li>
          <li className="contact-item">Phone: +254 123 456 789</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
