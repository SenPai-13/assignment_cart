const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.json());

// BD 3.4 - Assignment Shopping Cart Operations
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
// function addToCart(product) {
//   cart.push(product);
//   return cart;
// }

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let product = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(product);
  res.json(cart);
});

// Endpoint 2: Edit Quantity of an Item in the Cart
function updateQuantity(cart, id, quantity) {
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === id) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantity(cart, productId, quantity);
  res.json(result);
});

// Endpoint 3: Delete an Item from the Cart
function deleteCart(cart, id) {
  return cart.productId !== id;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter((product) => deleteCart(product, productId));
  res.json(cart);
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItmes: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
function totalQuantity(cart) {
  let quantity = 0;
  for (i = 0; i < cart.length; i++) {
    quantity += cart[i].quantity;
  }
  return quantity;
}
app.get('/cart/total-quantity', (req, res) => {
  let total = totalQuantity(cart);
  res.json({ totalQuantity: total });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
function totalPrice(cart) {
  let price = 0;
  for (i = 0; i < cart.length; i++) {
    price += cart[i].price * cart[i].quantity;
  }
  return price;
}
app.get('/cart/total-price', (req, res) => {
  let total = totalPrice(cart);
  res.json({ totalPrice: total });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
