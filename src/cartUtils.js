/**
 * Cart utility functions — baseline, working version.
 * This file intentionally has a "before" (clean) and "after" (buggy) state,
 * see README.md for the PR test flow.
 */

function getItemById(items, id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return null;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(total, discountCode) {
  const discounts = {
    SAVE10: 0.1,
    SAVE20: 0.2,
  };

  const rate = discounts[discountCode];
  if (!rate) {
    return total;
  }

  return total - total * rate;
}

module.exports = { getItemById, calculateTotal, applyDiscount };
