import React, { useState, useEffect, useCallback } from "react";
import '../../styles/Home/CardCarousel.css'
import cardImage1 from "../../images/Carousel/card1.jpg";
import cardImage2 from "../../images/Carousel/card2.jpg";
import cardImage3 from "../../images/Carousel/card3.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CardCarousel() {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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
    if (autoPlay && !isMobile) {
      interval = setInterval(() => {
        nextCard();
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, nextCard, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
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
                  alt={`Slide ${card.id}`}
                  className="card-image"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-button prev"
          onClick={() => handleManualNavigation(prevCard)}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button next"
          onClick={() => handleManualNavigation(nextCard)}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        <div className="carousel-indicators">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
