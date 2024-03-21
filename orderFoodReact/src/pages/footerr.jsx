// import '../styles/Footer.css';

const Footerr = () => {
 return (
    <footer className="footehr">
      <div className="footeryy-container">
        <div className="footehhr-logo">
          <img src="your-logo.png" alt="Logo" />
        </div>
        <div className="footer-linkks">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-lsocial">
          <ul>k
            <li><a href="https://facebook.com"><i className="fab fa-facebook"></i></a></li>
            <li><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-botkktom">
        <p>&copy; {new Date().getFullYear()} Your Food Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footerr;
