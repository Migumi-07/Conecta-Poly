import React, { useState, useEffect, useCallback } from "react";
import "../../styles/CardCarousel.css";
import cardImage1 from "../../images/card1.jpg";
import cardImage2 from "../../images/card2.jpg";
import cardImage3 from "../../images/card3.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CardCarousel() {
  const cards = [
    {
      id: 1,

      image: cardImage1,
     
    },
    {
      id: 2,
    
      image: cardImage2,
     
    },
    {
      id: 3,
    
      image: cardImage3,
   
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextCard = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  }, [cards.length]);

  const prevCard = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  }, [cards.length]);

  const goToCard = (index) => {
    handleManualNavigation(() => setCurrentIndex(index));
  };

  const handleManualNavigation = (navigationFn) => {
    setAutoPlay(false);
    navigationFn();
    resetTimer();
  };

  const resetTimer = useCallback(() => {
    const timer = setTimeout(() => {
      setAutoPlay(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleManualNavigation(nextCard);
    }

    if (touchStart - touchEnd < -100) {
      handleManualNavigation(prevCard);
    }
  };

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        nextCard();
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, nextCard]);

  return (
    <div className="carousel-section">
      <h2 className="section-title">Noticias Principales</h2>
      <div className="full-width-carousel-container">
        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="full-width-carousel"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card) => (
              <div key={card.id} className="full-width-card">
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <h4 className="card-subtitle">{card.subtitle}</h4>
                  <p className="card-description">{card.description}</p>
                  <a href="." className="card-link">
                    {card.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-button prev"
          onClick={() => handleManualNavigation(prevCard)}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button next"
          onClick={() => handleManualNavigation(nextCard)}
        >
          <FaChevronRight />
        </button>

        <div className="carousel-indicators">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
