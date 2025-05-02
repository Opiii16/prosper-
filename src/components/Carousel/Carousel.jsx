import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css'; // We'll create this next

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: '/assets/carousel-1.jpg',
      title: 'NEW SEASON COLLECTION',
      subtitle: 'Discover our latest arrivals',
      cta: 'SHOP NOW',
      link: '/shop/new-arrivals'
    },
    {
      image: '/assets/carousel-2.jpg',
      title: 'SUMMER SALE',
      subtitle: 'Up to 50% off selected items',
      cta: 'VIEW DEALS',
      link: '/shop/sale'
    },
    {
      image: '/assets/carousel-3.jpg',
      title: 'PREMIUM QUALITY',
      subtitle: 'Crafted for comfort and style',
      cta: 'EXPLORE',
      link: '/shop/premium'
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const transitionEnd = () => setIsTransitioning(false);
    const carousel = document.querySelector('.carousel-slide');
    carousel.addEventListener('transitionend', transitionEnd);
    return () => carousel.removeEventListener('transitionend', transitionEnd);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button 
          onClick={prevSlide} 
          className="carousel-arrow left"
          aria-label="Previous slide"
        >
          &lt;
        </button>
        
        <div className="carousel-slide-container">
          <div 
            className="carousel-slide"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none'
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="slide">
                <img 
                  src={slide.image} 
                  alt={`Slide ${index + 1}`} 
                  className="slide-image"
                />
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <Link to={slide.link} className="slide-cta">
                    {slide.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextSlide} 
          className="carousel-arrow right"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;