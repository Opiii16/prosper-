import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import './Homepage.css';

const Homepage = () => {
  const [cartNotification, setCartNotification] = useState(null);

  const addToCart = (product) => {
    setCartNotification(`${product.name} added to cart`);
    setTimeout(() => setCartNotification(null), 3000);
    console.log('Added to cart:', product);
  };

  const renderProductCard = useCallback((product) => (
    <div key={product.id} className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/assets/fallback-image.jpg';
            console.error(`Failed to load image: ${product.image}`);
          }}
        />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-colors">
          {product.colors.map((color) => (
            <span
              key={color}
              className={`color-dot ${color}`}
              title={color}
            ></span>
          ))}
        </div>
        <div className="product-sizes">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="size-option"
              title={size}
            >{size}</span>
          ))}
        </div>
        <div className="product-price">{product.price.toLocaleString()} KSH</div>
        <button
          className="btn btn-success"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  ), []);

  return (
    <div className="homepage">
      <Navbar />
      <Carousel />

      {cartNotification && (
        <div className="cart-notification">
          {cartNotification}
          <span className="notification-close" onClick={() => setCartNotification(null)}>
            ×
          </span>
        </div>
      )}

      {/* Products defined after Carousel */}
      {(() => {
        const products = {
          hoods: [
            { id: 1, name: 'Urban Hoodie', price: 2500, colors: ['black', 'gray', 'navy'], image: '/assets/products/hoodies/hoodie-1.jpg' },
            { id: 2, name: 'Street Zip Hood', price: 2800, colors: ['red', 'black'], image: '/assets/products/hoodies/hoodie-2.jpg' },
            { id: 3, name: 'Classic Pullover', price: 2200, colors: ['white', 'green'], image: '/assets/products/hoodies/hoodie-3.jpg' }
          ],
          tshirts: [
            { id: 4, name: 'Graphic Tee', price: 1200, colors: ['white', 'black'], image: '/assets/products/tshirts/tshirt-1.jpg' },
            { id: 5, name: 'Pocket Tee', price: 1500, colors: ['gray', 'blue'], image: '/assets/products/tshirts/tshirt-2.jpg' },
            { id: 6, name: 'Oversized Tee', price: 1800, colors: ['black', 'white'], image: '/assets/products/tshirts/tshirt-3.jpg' }
          ],
          caps: [
            { id: 7, name: 'Snapback Cap', price: 800, colors: ['black', 'red'], image: '/assets/products/caps/cap-1.jpg' },
            { id: 8, name: 'Dad Hat', price: 700, colors: ['khaki', 'navy'], image: '/assets/products/caps/cap-2.jpg' },
            { id: 9, name: 'Bucket Hat', price: 900, colors: ['black', 'camo'], image: '/assets/products/caps/cap-3.jpg' }
          ],
          croptops: [
            { id: 10, name: 'Basic Crop', price: 600, colors: ['white', 'pink'], image: '/assets/products/croptops/crop-1.jpg' },
            { id: 11, name: 'Ribbed Crop', price: 800, colors: ['black', 'beige'], image: '/assets/products/croptops/crop-2.jpg' },
            { id: 12, name: 'Sleeveless Crop', price: 700, colors: ['gray', 'green'], image: '/assets/products/croptops/crop-3.jpg' }
          ]
        };

        const addSizesToProducts = (products) => {
          return Object.entries(products).reduce((acc, [category, items]) => {
            acc[category] = items.map(item => ({
              ...item,
              sizes: ['S', 'M', 'L', 'XL', 'XXL']
            }));
            return acc;
          }, {});
        };

        const productsWithSizes = addSizesToProducts(products);

        return (
          <>
            {Object.entries(productsWithSizes).map(([category, items]) => (
              <section key={category} className="product-category">
                <h2 className="section-title">
                  <Link to={`/shop/${category}`}>
                    {category.toUpperCase()} COLLECTION
                  </Link>
                </h2>
                <p className="section-subtitle">
                  {category === 'hoods' && 'Premium quality from 2000 KSH'}
                  {category === 'tshirts' && 'Stylish designs from 3000 KSH'}
                  {category === 'caps' && 'Trendy styles from 700 KSH'}
                  {category === 'croptops' && 'Fashionable from 500 KSH'}
                </p>
                <div className="product-grid">
                  {items.map(renderProductCard)}
                </div>
              </section>
            ))}
          </>
        );
      })()}
    </div>
  );
};

export default Homepage;
