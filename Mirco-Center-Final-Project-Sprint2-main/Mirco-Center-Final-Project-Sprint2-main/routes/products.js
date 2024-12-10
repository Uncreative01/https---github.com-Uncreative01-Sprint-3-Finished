const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all products route
router.get('/all', async (req, res) => {
  try {
    const products = await prisma.product.findMany(); // Fetch all products from database
    res.json(products);  // Send the products as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Get product by ID route
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Get the product ID from the URL params

  // Validate that the ID is an integer
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid product ID. It must be an integer.' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { product_id: Number(id) }  // Find the product by ID
    });

    if (product) {
      res.json(product);  // If product is found, return product data
    } else {
      res.status(404).json({ error: 'Product not found.' });  // Product not found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
});

module.exports = router;
