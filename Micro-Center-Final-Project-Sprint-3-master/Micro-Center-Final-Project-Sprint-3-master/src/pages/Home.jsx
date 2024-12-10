import React, { useState, useEffect } from "react"; // IMPORT REACT AND HOOKS (useState, useEffect)
import { Link } from "react-router-dom"; // IMPORT LINK COMPONENT FROM REACT ROUTER FOR NAVIGATION
import "./Home.css";  // ASSUMING THE Home.css FILE IS IN THE ui FOLDER

function Home() {
  const [products, setProducts] = useState([]); // STATE TO STORE PRODUCTS DATA

  // FETCH THE PRODUCTS FROM THE BACKEND
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products/all"); // FETCH PRODUCTS FROM API
        if (!response.ok) { // CHECK IF RESPONSE IS NOT OK
          throw new Error("Failed to fetch products"); // THROW ERROR IF FETCH FAILS
        }
        const data = await response.json(); // PARSE RESPONSE JSON DATA
        setProducts(data); // UPDATE THE STATE WITH THE FETCHED DATA
      } catch (error) {
        console.error(error); // LOG ANY ERROR TO THE CONSOLE
      }
    }

    fetchProducts(); // CALL THE FUNCTION TO FETCH PRODUCTS
  }, []); // EMPTY DEPENDENCY ARRAY MEANS THIS EFFECT ONLY RUNS ONCE AFTER THE INITIAL RENDER

  return (
    <div className="home-container"> {/* MAIN CONTAINER FOR HOME PAGE */}
      <h1>Welcome to Micro-Center</h1> {/* TITLE OF THE PAGE */}
      <div className="product-list"> {/* CONTAINER FOR THE LIST OF PRODUCTS */}
        {products.map((product) => (  // LOOP THROUGH EACH PRODUCT IN THE STATE
          <div key={product.product_id} className="product-item"> {/* EACH PRODUCT ITEM */}
            {/* WRAP THE PRODUCT ITEM IN A LINK TO NAVIGATE TO THE DETAILS PAGE */}
            <Link to={`/details/${product.product_id}`} className="product-link">
              <img
                src={`http://localhost:3000/${product.image_filename}`}  // CORRECT IMAGE PATH FOR DISPLAYING PRODUCT IMAGE
                alt={product.name}  // ALT TEXT FOR THE IMAGE
                className="product-image"  // CSS CLASS FOR THE IMAGE STYLE
              />
              <h2>{product.name}</h2> {/* DISPLAY PRODUCT NAME */}
              <p>{product.description}</p>  {/* DISPLAY THE PRODUCT DESCRIPTION */}
              <p>{`$${product.cost}`}</p> {/* DISPLAY THE PRODUCT PRICE */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;  // EXPORT THE HOME COMPONENT
