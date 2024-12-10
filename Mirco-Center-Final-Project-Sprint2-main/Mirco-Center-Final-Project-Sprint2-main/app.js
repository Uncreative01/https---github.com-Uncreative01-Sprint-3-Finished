const express = require('express');
const session = require('express-session');
const usersRouter = require('./routes/users');  // Import users routes
const productsRouter = require('./routes/products');  // Import products routes
const purchasesRouter = require('./routes/purchases');
const cors = require('cors');
const multer = require('multer');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// cors middleware
app.use(cors({
  credentials: true // allow cookies
}));

// express-session middleware
app.use(session({
  secret: 'fkldjbnfdkFTFT5efd3$$sdg89F',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    secure: false,  // Set to `true` if using HTTPS in production
    sameSite: 'lax',  // Consider 'none' if client and server are on different origins
    maxAge: 3600000 // 1 hour in milliseconds
  }
}));

// Use the users and products routes
app.use('/users', usersRouter);  // Prefix all user routes with /users
app.use('/products', productsRouter);  // Prefix all product routes with /products
app.use('/purchases', purchasesRouter);

// Example Route: Test Route to check server status
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
