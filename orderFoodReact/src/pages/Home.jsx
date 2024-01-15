
import { useEffect, useState } from 'react';
import '../styles/header.css'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'url("./b1.jpg")',
    'url("./b2.jpg")',
    'url("./b3.jpg")',
    'url("./cf.jpg")',
    'url("./c.jpg")',
    'url("./pi.jpg")',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div id="Home" className="main-container" style={{ backgroundImage: slides[currentSlide] }}>
      <div className="centered-text">
        <h1>BETTER COOK ONLINE FOOD</h1>
        <p>Discover amazing fast food prepared my our well trained Cheifs!</p>
      </div>
    </div>
  );
}

export default Home