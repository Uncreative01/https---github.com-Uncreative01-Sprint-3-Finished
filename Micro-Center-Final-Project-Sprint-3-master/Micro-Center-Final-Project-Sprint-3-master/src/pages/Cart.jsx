import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]); // Store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  const apiHost = "http://localhost:3000"; // API host
  const taxRate = 0.15; // Define tax rate (15%)

  // Function to fetch product details based on IDs
  useEffect(() => {
    const cart = Cookies.get("cart"); // Get the cart from cookies
    if (cart) {
      const productIds = cart.split(","); // Split cart items by comma

      // Count each item's occurrences
      const itemCounts = productIds.reduce((counts, id) => {
        counts[id] = (counts[id] || 0) + 1; // Increment count or initialize it
        return counts;
      }, {});

      console.log("Item counts:", itemCounts);

      fetchProducts(itemCounts); // Fetch product details using item counts
    } else {
      setLoading(false); // If no products in cart, stop loading
      console.log("Cart is empty");
    }
  }, []); // Empty dependency array to run once after initial render

  // Function to fetch product details using item counts
  const fetchProducts = async (itemCounts) => {
    try {
      const uniqueIds = Object.keys(itemCounts); // Get unique product IDs
      const responses = await Promise.all(
        uniqueIds.map((id) => fetch(`${apiHost}/products/${id}`)) // Fetch product data for each unique ID
      );
      const products = await Promise.all(responses.map((res) => res.json())); // Parse the response JSON

      // Add quantity for each product
      const productDetails = products.map((product) => ({
        ...product,
        quantity: itemCounts[product.product_id], // Assign quantity from itemCounts
      }));

      setCartProducts(productDetails); // Update the cart with product details
    } catch (error) {
      console.error("Error fetching cart products:", error); // Log errors
      setError(true); // Set error state to true if fetching fails
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  if (loading) return <p>Loading cart...</p>; // Display loading state while fetching data
  if (error) return <p>Error fetching cart products</p>; // Error handling if fetching fails

  // Calculate the subtotal cost
  const subtotal = cartProducts.reduce(
    (acc, product) => acc + product.cost * product.quantity,
    0
  ); // Calculate total based on price and quantity

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1> {/* Header for the cart page */}
      <div className="cart-products">
        {cartProducts.length === 0 ? (
          <p>Your cart is empty. Start shopping!</p> // Message when the cart is empty
        ) : (
          cartProducts.map((product) => {
            // Calculate tax for the current product
            const productTax = (product.cost * product.quantity * taxRate).toFixed(2);
            const productTotal = (product.cost * product.quantity + parseFloat(productTax)).toFixed(2);

            return (
              <div key={product.product_id} className="cart-item">
                <img
                  src={`http://localhost:3000/${product.image_filename}`} // Corrected image path
                  alt={product.name} // Alt text for the image
                  className="product-image" // CSS class for the image
                />
                <div className="cart-item-details">
                  <h2>{product.name}</h2> {/* Display product name */}
                  <p>{`$${product.cost.toFixed(2)}`}</p> {/* Display product cost with 2 decimals */}
                  <p>Quantity: {product.quantity}</p> {/* Display product quantity */}
                  <p>Tax: ${productTax}</p> {/* Display tax for the item */}
                  <p>Total (with tax): ${productTotal}</p> {/* Total including tax */}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Subtotal */}
      <div className="cart-subtotal">
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3> {/* Display the subtotal with 2 decimals */}
      </div>

      {/* Cart options */}
      <div className="cart-actions">
        <Link to="/" className="btn btn-primary"> {/* Link to continue shopping */}
          Continue Shopping
        </Link>
        <Link to="/checkout" className="btn btn-success"> {/* Link to complete purchase */}
          Complete Purchase
        </Link>
      </div>
    </div>
  );
}
