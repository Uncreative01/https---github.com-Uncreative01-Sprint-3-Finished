import React from 'react'; // IMPORT REACT LIBRARY
import ReactDOM from 'react-dom/client'; // IMPORT REACTDOM FOR RENDERING COMPONENTS TO THE DOM
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // IMPORT REACT ROUTER COMPONENTS FOR NAVIGATION
import App from './App'; // IMPORT MAIN APP COMPONENT
import Home from './pages/Home'; // IMPORT HOME PAGE COMPONENT
import Login from './pages/Login'; // IMPORT LOGIN PAGE COMPONENT
import Cart from './pages/Cart'; // IMPORT CART PAGE COMPONENT
import Logout from './pages/Logout'; // IMPORT LOGOUT PAGE COMPONENT
import Details from './pages/Details'; // IMPORT PRODUCT DETAILS PAGE COMPONENT

// RENDER THE REACT APP TO THE DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> Micro-Center
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  </BrowserRouter> // CLOSES THE BROWSERROUTER COMPONENT
);
