const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// POST route to handle the purchase process
router.post('/', async (req, res) => {

  // Check if the user is logged in
  if (!req.session.user) {
    return res.status(401).json({ error: 'User not logged in.' });
  }

  // Destructure data from the request body
  const {
    street,
    city,
    province,
    country,
    postal_code,
    credit_card,
    credit_expire,
    credit_cvv,
    cart, // Comma-delimited string of product IDs
    invoice_amt,
    invoice_tax,
    invoice_total,
  } = req.body;

  // // Log the input values for debugging purposes
  // console.log("Raw Input Values:", {
  //   street,
  //   city,
  //   province,
  //   country,
  //   postal_code,
  //   credit_card,
  //   credit_expire,
  //   credit_cvv,
  //   cart,
  //   invoice_amt,
  //   invoice_tax,
  //   invoice_total,
  // });

  // Validate required fields
  if (
    !street ||
    !city ||
    !province ||
    !country ||
    !postal_code ||
    !credit_card ||
    !credit_expire ||
    !credit_cvv ||
    !cart ||
    invoice_amt === undefined ||
    invoice_tax === undefined ||
    invoice_total === undefined
  ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Convert invoice amounts to float and validate
  const invoiceAmount = parseFloat(invoice_amt);
  const invoiceTax = parseFloat(invoice_tax);
  const invoiceTotal = parseFloat(invoice_total);





  // Parse the cart string and convert to an array of integers (product IDs)
  const productIds = cart.split(',').map((id) => parseInt(id, 10));

  // // Validate product IDs (ensure no NaN values)
  // if (productIds.some(isNaN)) {
  //   console.error('Invalid product IDs:', productIds);
  //   return res.status(400).json({ error: 'Cart contains invalid product IDs.' });
  // }

  try {
    // Create a new purchase record in the database
    const purchase = await prisma.purchase.create({
      data: {
        customer_id: req.session.user.customer_id, // User ID from session
        street,
        city,
        province,
        country,
        postal_code,
        credit_card,
        credit_expire,
        credit_cvv,
        invoice_amt: invoiceAmount,
        invoice_tax: invoiceTax,
        invoice_total: invoiceTotal,
        order_date: new Date(), // Set current date as order date
      },
    });

    // Create a unique set of product IDs
const uniqueProductIds = [...new Set(productIds)];

// Create purchase item records for each unique product
const purchaseItems = uniqueProductIds.map((productId) => ({
  purchase_id: purchase.purchase_id, // Reference to the purchase
  product_id: productId, // Product ID from cart
  quantity: productIds.filter((id) => id === productId).length, // Quantity of each product
}));

    console.log(purchaseItems);
    // // Insert purchase items into the database
    // await prisma.purchaseItem.createMany({
    //   data: purchaseItems,
    // });

    // Respond with success message and the created purchase data
    res.status(201).json({
      message: 'Purchase completed successfully.',
      purchase,
      items: purchaseItems,
    });
  } catch (error) {
    // Log and return an error if something goes wrong
    console.error('Error during purchase processing:', error);
    res.status(500).json({ error: 'Error processing purchase.' });
  }
});

module.exports = router;

//https://www.w3schools.com/jsref/jsref_parsefloat.asp//
