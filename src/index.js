const { getItemById, calculateTotal, applyDiscount } = require("./cartUtils");

const cart = [
  { id: 1, name: "Widget", price: 9.99, quantity: 2 },
  { id: 2, name: "Gadget", price: 19.99, quantity: 1 },
];

const total = calculateTotal(cart);
const discounted = applyDiscount(total, "SAVE10");

console.log(`Cart total: $${total.toFixed(2)}`);
console.log(`After discount: $${discounted.toFixed(2)}`);
console.log(getItemById(cart, 1));
