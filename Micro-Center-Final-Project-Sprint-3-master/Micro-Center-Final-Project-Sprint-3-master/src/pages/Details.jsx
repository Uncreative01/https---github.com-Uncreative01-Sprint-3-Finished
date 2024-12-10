import { Link, useParams } from "react-router-dom"; // IMPORTING REACT ROUTER UTILITIES FOR NAVIGATION AND URL PARAMETERS
import { useState, useEffect } from "react"; // IMPORTING REACT HOOKS FOR MANAGING STATE AND SIDE EFFECTS
import Cookies from "js-cookie"; // IMPORTING JS-COOKIE TO HANDLE COOKIES

export default function Details() {
  const { id } = useParams(); // EXTRACTING THE `ID` PARAMETER FROM THE URL
  const [product, setProduct] = useState(null); // STATE TO STORE PRODUCT DETAILS
  const [loading, setLoading] = useState(true); // STATE TO TRACK LOADING STATUS
  const [error, setError] = useState(false); // STATE TO TRACK IF AN ERROR OCCURRED

  const getUrl = `http://localhost:3000/products/${id}`; // CONSTRUCTING THE API URL FOR FETCHING THE PRODUCT

  useEffect(() => {
    // FUNCTION TO FETCH PRODUCT DETAILS
    async function fetchProduct() {
      try {
        const response = await fetch(getUrl); // FETCH PRODUCT DATA FROM THE API
        if (!response.ok) { // CHECK IF THE RESPONSE IS NOT OK
          throw new Error("Failed to fetch product details"); // HANDLE NON-200 RESPONSES
        }
        const data = await response.json(); // PARSE JSON RESPONSE
        setProduct(data); // SET THE FETCHED PRODUCT DATA TO STATE
      } catch (error) {
        console.error("Error fetching product:", error); // LOG ERRORS TO THE CONSOLE
        setError(true); // SET ERROR STATE TO TRUE IF FETCHING FAILS
      } finally {
        setLoading(false); // STOP LOADING REGARDLESS OF SUCCESS OR FAILURE
      }
    }

    fetchProduct(); // CALL THE FETCH FUNCTION WHEN THE COMPONENT MOUNTS OR THE `ID` CHANGES
  }, [id]); // DEPENDENCY ARRAY TO RE-RUN THE EFFECT IF THE `ID` CHANGES

  // FUNCTION TO ADD PRODUCT ID TO THE CART COOKIE
  const addToCart = (productId) => {
    const cart = Cookies.get("cart"); // GET THE EXISTING CART FROM THE COOKIE
    let cartItems = cart ? cart.split(",") : []; // SPLIT THE COMMA-DELIMITED STRING INTO AN ARRAY
    cartItems.push(productId); // ADD THE NEW PRODUCT ID TO THE ARRAY
    Cookies.set("cart", cartItems.join(","), { expires: 7 }); // SAVE THE UPDATED CART IN THE COOKIE WITH A 7-DAY EXPIRATION
    console.log("Product added to cart:", cartItems); // LOG THE UPDATED CART TO THE CONSOLE
  };

  if (loading) return <p>Loading product details...</p>; // DISPLAY A LOADING MESSAGE WHILE FETCHING DATA
  if (error || !product) return <p>Error fetching product details</p>; // DISPLAY AN ERROR MESSAGE IF FETCHING FAILS

  return (
    <div className="details-container">
      <h1>{product.name}</h1> {/* DISPLAY THE PRODUCT NAME */}
      <img
        src={`http://localhost:3000/${product.image_filename}`} // CORRECTED IMAGE PATH FOR DISPLAYING PRODUCT IMAGE
        alt={product.name} // ALT TEXT FOR THE IMAGE
        className="product-image" // CSS CLASS FOR THE IMAGE STYLE
      />
      <p><strong>Description:</strong> {product.description}</p> {/* DISPLAY THE PRODUCT DESCRIPTION */}
      <p><strong>Price:</strong> ${product.cost}</p> {/* DISPLAY THE PRODUCT PRICE */}

      {/* ACTION BUTTONS */}
      <div className="details-actions">
        <button onClick={() => addToCart(product.product_id)}>Add to Cart</button> {/* ADD THE PRODUCT TO THE CART */}
        
        <Link to="/" className="btn btn-secondary"> {/* LINK TO NAVIGATE BACK TO THE PRODUCT LIST */}
          <button onClick={() => home(product.product_id)}>Return to Home</button> {/* BUTTON TO RETURN TO HOME */}
        </Link>
      </div>
    </div>
  );
}
