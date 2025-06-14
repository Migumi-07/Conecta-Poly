import React, { useState, useEffect } from "react";
import "../../styles/Home/License.css";

// Componente de estrellas de rating (sin cambios)
const StarRating = ({ rating = 0, onRatingChange, interactive = true }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleClick = (value) => {
    if (interactive) {
      setSelectedRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            (hoverRating || selectedRating) >= star ? "filled" : ""
          } ${interactive ? "interactive" : ""}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Componente principal con las nuevas funcionalidades de pago
const License = () => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    installments: 1,
    cardNumber: "",
    cardName: "",
    securityCode: "",
    expiryMonth: "",
    expiryYear: "",
    address: "",
    city: "",
  });
  const [cardType, setCardType] = useState(null);
  const [cardError, setCardError] = useState("");

  const licenseTypes = [
    {
      name: "Básica",
      price: 0,
      features: [
        "Acceso completo a eventos y noticias",
        "Hasta 10 eventos activos simultáneos",
        "Subida de archivos hasta 50MB",
        "Conexiones con hasta 50 usuarios",
      ],
      averageRating: 3.8,
      userRatings: [],
    },
    {
      name: "Standard",
      price: 39000,
      features: [
        "Acceso a foros y grupos públicos",
        "Acceso a grupos privados por intereses comunes",
        "Crear un grupo privado",
        "Conexiones con hasta 100 usuarios",
        "Organización de actividades o eventos",
        "Hasta 14 eventos activos simultáneos",
      ],
      averageRating: 4.2,
      userRatings: [],
    },
    {
      name: "Premium",
      price: 99000,
      features: [
        "Eventos y grupos ilimitados",
        "Destaca tu perfil o grupo en búsquedas",
        "Subida de archivos hasta 500MB",
        "Conexiones ilimitadas",
        "Crear un evento y/o grupo privado",
        "Hasta 20 eventos activos simultáneos",
      ],
      averageRating: 4.7,
      userRatings: [],
    },
  ];

  const [quantities, setQuantities] = useState([0, 1, 1]);
  const [cart, setCart] = useState([]);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const [userRatings, setUserRatings] = useState(() => {
    return licenseTypes.map(() => null);
  });

  const handleQuantityChange = (index, value) => {
    if (index === 0) return;
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value) || 0;
    setQuantities(newQuantities);
  };

  const addToCart = (licenseIndex) => {
    if (licenseIndex === 0) return;

    const license = licenseTypes[licenseIndex];
    const quantity = quantities[licenseIndex];

    if (quantity <= 0) return;

    setAnimatingCard(licenseIndex);
    setTimeout(() => setAnimatingCard(null), 500);

    const existingItemIndex = cart.findIndex(
      (item) => item.name === license.name
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].total =
        updatedCart[existingItemIndex].price *
        updatedCart[existingItemIndex].quantity;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          name: license.name,
          price: license.price,
          quantity: quantity,
          total: license.price * quantity,
        },
      ]);
    }
  };

  const removeFromCart = (indexToRemove) => {
    const itemToRemove = cart[indexToRemove];

    if (itemToRemove.quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[indexToRemove] = {
        ...itemToRemove,
        quantity: itemToRemove.quantity - 1,
        total: itemToRemove.price * (itemToRemove.quantity - 1),
      };
      setCart(updatedCart);
    } else {
      setCart(cart.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleRatingChange = (licenseIndex, newRating) => {
    const newUserRatings = [...userRatings];
    newUserRatings[licenseIndex] = newRating;
    setUserRatings(newUserRatings);

    licenseTypes[licenseIndex].userRatings.push(newRating);
    const sum = licenseTypes[licenseIndex].userRatings.reduce(
      (a, b) => a + b,
      0
    );
    licenseTypes[licenseIndex].averageRating =
      sum / licenseTypes[licenseIndex].userRatings.length;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Nueva función para manejar el pago
  const handlePurchase = () => {
    setPaymentModalOpen(true);
  };

  // Función para manejar cambios en el formulario de pago
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      // Formatear el número de tarjeta con guiones cada 4 dígitos
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1-')
        .substring(0, 19);
      
      // Determinar el tipo de tarjeta basado en el primer dígito
      const firstDigit = formattedValue.charAt(0);
      let newCardType = null;
      
      if (firstDigit === '4') {
        newCardType = 'visa';
      } else if (firstDigit === '5') {
        newCardType = 'mastercard';
      } else if (firstDigit === '3') {
        newCardType = 'amex';
      } else if (firstDigit === '7') {
        newCardType = 'diners';
      }
      
      setCardType(newCardType);
      setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
      
      // Validar que tenga 16 dígitos (19 caracteres incluyendo guiones)
      if (formattedValue.replace(/\D/g, '').length === 16) {
        setCardError("");
      } else {
        setCardError("El número de tarjeta debe tener 16 dígitos");
      }
    } else if (name === "installments") {
      // Validar que no sea mayor a 10
      const numValue = parseInt(value) || 1;
      const validatedValue = numValue > 10 ? 10 : numValue < 1 ? 1 : numValue;
      setPaymentData(prev => ({ ...prev, [name]: validatedValue }));
    } else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Función para enviar el formulario de pago
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones adicionales
    if (paymentData.cardNumber.replace(/\D/g, '').length !== 16) {
      setCardError("El número de tarjeta debe tener 16 dígitos");
      return;
    }
    
    if (paymentData.securityCode.length !== 4) {
      alert("El código de seguridad debe tener 4 dígitos");
      return;
    }
    
    if (!paymentData.expiryMonth || !paymentData.expiryYear) {
      alert("Por favor selecciona mes y año de expiración");
      return;
    }
    
    // Si todo está bien, mostrar el resumen
    setPaymentModalOpen(false);
    setPaymentSuccessModalOpen(true);
  };

  // Función para cerrar el modal de éxito
  const closeSuccessModal = () => {
    setPaymentSuccessModalOpen(false);
    setCart([]);
    setPaymentData({
      installments: 1,
      cardNumber: "",
      cardName: "",
      securityCode: "",
      expiryMonth: "",
      expiryYear: "",
      address: "",
      city: "",
    });
  };

  // Obtener la fecha y hora actual formateada
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('es-CO');
    const time = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  };

  // Obtener la imagen de la franquicia de la tarjeta
  const getCardImage = () => {
    if (!cardType) return null;
    
    const cardImages = {
      visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      mastercard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
      amex: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1024px-American_Express_logo.svg.png",
      diners: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Diners_Club_International_logo.svg/1200px-Diners_Club_International_logo.svg.png"
    };
    
    return cardImages[cardType];
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(
        ".license-card, .cart-section"
      );
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          setVisibleSections((prev) => {
            if (!prev.includes(section.id)) {
              return [...prev, section.id];
            }
            return prev;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="license-container">
      <header className="license-header">
        <h1>Mejora tu plan</h1>
        <p>
          Selecciona el tipo de licencia que mejor se adapte a sus necesidades
        </p>
      </header>

      <div className="license-plans">
        {licenseTypes.map((license, index) => (
          <div
            key={index}
            className={`license-card ${index === 0 ? "current-license" : ""} ${
              visibleSections.includes(`license-${index}`) ? "visible" : ""
            }`}
            id={`license-${index}`}
          >
            <h2>{license.name}</h2>
            <div className="license-price">
              {license.price === 0
                ? "Gratis"
                : `${formatCurrency(license.price)} COP`}
            </div>

            <div className="license-rating">
              <StarRating rating={license.averageRating} interactive={false} />
              <span className="rating-text">
                {license.averageRating.toFixed(1)} (
                {license.userRatings.length + 10} valoraciones)
              </span>
            </div>

            <ul className="license-features">
              {license.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            {index === 0 ? (
              <div className="acquired-badge">Adquirido</div>
            ) : (
              <>
                <button
                  className={`add-button ${
                    animatingCard === index ? "pulse" : ""
                  }`}
                  onClick={() => addToCart(index)}
                >
                  Agregar
                </button>
                <div className="quantity-control">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={quantities[index]}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </div>
              </>
            )}

            <div className="user-rating-section">
              <h4>Tu valoración</h4>
              {userRatings[index] ? (
                <div className="rating-thanks">
                  <StarRating rating={userRatings[index]} interactive={false} />
                  <p>¡Gracias por tu valoración!</p>
                </div>
              ) : (
                <StarRating
                  onRatingChange={(rating) => handleRatingChange(index, rating)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`cart-section ${
          visibleSections.includes("cart-section") ? "visible" : ""
        }`}
        id="cart-section"
      >
        <h2>Resumen de Compra</h2>
        {cart.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Licencia</th>
                  <th>Valor Unitario</th>
                  <th>Cantidad</th>
                  <th>Total por licencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className={index === cart.length - 1 ? "new-item" : ""}
                  >
                    <td>{item.name}</td>
                    <td>{formatCurrency(item.price)} COP</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.total)} COP</td>
                    <td>
                      <div className="cart-actions">
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(index)}
                          title={
                            item.quantity > 1
                              ? "Reducir cantidad en 1"
                              : "Eliminar del carrito"
                          }
                        >
                          {item.quantity > 1 ? "-1" : "Eliminar"}
                        </button>
                        {item.quantity > 1 && (
                          <button
                            className="remove-all-button"
                            onClick={() =>
                              setCart(cart.filter((_, i) => i !== index))
                            }
                            title="Eliminar todas las unidades"
                          >
                            Eliminar todas
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)} COP</span>
              </div>
              <div className="total-row">
                <span>IVA (19%):</span>
                <span>{formatCurrency(iva)} COP</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>{formatCurrency(total)} COP</span>
              </div>
              <button className="purchase-button" onClick={handlePurchase}>
                Comprar Ahora
              </button>
            </div>
          </>
        ) : (
          <p className="empty-cart">No hay licencias en el carrito</p>
        )}
      </div>

      {/* Modal de pago */}
      {paymentModalOpen && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <button 
              className="close-modal" 
              onClick={() => setPaymentModalOpen(false)}
            >
              &times;
            </button>
            <h2>Información de Pago</h2>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Número de cuotas (máximo 10)</label>
                <input
                  type="number"
                  name="installments"
                  min="1"
                  max="10"
                  value={paymentData.installments}
                  onChange={handlePaymentChange}
                  required
                />
                <div className="installment-info">
                  <span>Valor por cuota: </span>
                  <strong>
                    {formatCurrency(total / paymentData.installments)} COP
                  </strong>
                </div>
              </div>

              <div className="form-group">
                <label>Nombre en la tarjeta</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Número de tarjeta de crédito</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="0000-0000-0000-0000"
                  required
                />
                {cardError && <p className="error-message">{cardError}</p>}
                {cardType && (
                  <div className="card-type-indicator">
                    <img 
                      src={getCardImage()} 
                      alt={cardType} 
                      className="card-logo"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Código de seguridad (4 dígitos)</label>
                <input
                  type="text"
                  name="securityCode"
                  value={paymentData.securityCode}
                  onChange={handlePaymentChange}
                  maxLength="4"
                  pattern="\d{4}"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mes de expiración</label>
                  <select
                    name="expiryMonth"
                    value={paymentData.expiryMonth}
                    onChange={handlePaymentChange}
                    required
                  >
                    <option value="">Mes</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Año de expiración</label>
                  <select
                    name="expiryYear"
                    value={paymentData.expiryYear}
                    onChange={handlePaymentChange}
                    required
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 16 }, (_, i) => (
                      <option key={i + 2025} value={i + 2025}>
                        {i + 2025}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={paymentData.address}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={paymentData.city}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <button type="submit" className="submit-payment">
                Confirmar Pago
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de éxito en el pago */}
      {paymentSuccessModalOpen && (
        <div className="payment-success-modal">
          <div className="payment-success-content">
            <h2>¡Pago exitoso!</h2>
            <p>Tu compra ha sido procesada correctamente.</p>
            
            <div className="payment-summary">
              <h3>Resumen de la compra</h3>
              <div className="summary-row">
                <span>Fecha:</span>
                <span>{getCurrentDateTime().date}</span>
              </div>
              <div className="summary-row">
                <span>Hora:</span>
                <span>{getCurrentDateTime().time}</span>
              </div>
              <div className="summary-row">
                <span>Total de la compra:</span>
                <span>{formatCurrency(total)} COP</span>
              </div>
              <div className="summary-row">
                <span>Cuotas:</span>
                <span>{paymentData.installments}</span>
              </div>
              <div className="summary-row">
                <span>Valor por cuota:</span>
                <span>{formatCurrency(total / paymentData.installments)} COP</span>
              </div>
              <div className="summary-row">
                <span>Tarjeta terminada en:</span>
                <span>
                  ****-****-****-
                  {paymentData.cardNumber.slice(-4).replace(/-/g, '')}
                </span>
              </div>
              {cardType && (
                <div className="summary-row">
                  <span>Franquicia:</span>
                  <img 
                    src={getCardImage()} 
                    alt={cardType} 
                    className="card-logo-small"
                  />
                </div>
              )}
            </div>
            
            <button 
              className="close-success-modal"
              onClick={closeSuccessModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="compare-plans-section">
        <h2>Comparar planes</h2>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Características</th>
              <th>Básica</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Acceso a eventos y noticias</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Eventos activos simultáneos</td>
              <td>10</td>
              <td>14</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Subida de archivos</td>
              <td>50MB</td>
              <td>50MB</td>
              <td>500MB</td>
            </tr>
            <tr>
              <td>Conexiones</td>
              <td>Hasta 50</td>
              <td>Hasta 100</td>
              <td>Ilimitadas</td>
            </tr>
            <tr>
              <td>Foros y grupos públicos</td>
              <td>❌</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Grupos privados</td>
              <td>❌</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Crear eventos o grupos privados</td>
              <td>❌</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Perfil/grupo destacado</td>
              <td>❌</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default License;