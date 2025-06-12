export let cart;
export function loadStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: 2,
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: 2,
      },
    ];
  }
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId) {
  let matchedProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchedProduct = cartItem;
    }
  });
  if (matchedProduct) {
    matchedProduct.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: 1,
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchedProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchedProduct = cartItem;
    }
  });
  matchedProduct.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateProductQuantity(quantity, productId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      cartItem.quantity = quantity;
    }
  });
  saveToStorage();
}
