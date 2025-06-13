import React, { useState, useEffect } from "react";
import "../../styles/Home/License.css";

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

const License = () => {
  const handlePurchase = () => {
    if (
      window.confirm(`¿Confirmas la compra por ${formatCurrency(total)} COP?`)
    ) {
      console.log("Compra confirmada:", cart);
      alert("¡Gracias por tu compra!");
      setCart([]);
    }
  };
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
    console.log(
      `Nueva valoración para ${licenseTypes[licenseIndex].name}:`,
      newRating
    );

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
