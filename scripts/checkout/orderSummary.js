import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutheader.js";
import { updateProductQuantity } from "../../data/cart.js";

export function renderOrderSummary() {
  let checkoutSummaryHTML = "";

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    let matchedProduct = getProduct(productId);
    let delivery = getDeliveryOption(cartItem);

    const now = dayjs();
    const deliveryDate = now.add(delivery.deliveryDays, "day");
    let dateString = deliveryDate.format("dddd, MMMM D");

    checkoutSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        matchedProduct.id
      }">
          <div class="delivery-date">
              Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
              <img class="product-image"
              src="${matchedProduct.image}">

              <div class="cart-item-details">
              <div class="product-name">
                  ${matchedProduct.name}
              </div>
              <div class="product-price">
                  ${matchedProduct.productPriceCents()}
              </div>
              <div class="product-quantity js-product-quantity-${matchedProduct.id}">
                  <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchedProduct.id}">${
                    cartItem.quantity
                  }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = ${
                    matchedProduct.id
                  }>
                  Update
                  </span>
                  <input class = "quantity-input js-quantity-input-${matchedProduct.id}">
                  <span class = "save-quantity-link link-primary js-save-link" data-product-id="${
                    matchedProduct.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchedProduct.id}" data-product-id = ${
                    matchedProduct.id
                  }>
                  Delete
                  </span>
              </div>
              </div>

              <div class="delivery-options">
                  <div class="delivery-options-title">
                      Choose a delivery option:
                  </div>
                  ${deliveryOption(matchedProduct, cartItem)}
              </div>
          </div>
      </div>
      `;
  });

  function deliveryOption(matchedProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const now = dayjs();
      const deliveryDate = now.add(deliveryOption.deliveryDays, "day");
      let dateString = deliveryDate.format("dddd, MMMM D");
      let priceString = "";
      if (deliveryOption.priceCents == 0) {
        priceString = "FREE";
      } else {
        priceString = `$${formatCurrency(deliveryOption.priceCents)} -`;
      }
      html += `
                  <div class="delivery-option js-delivery-option" data-product-id = ${
                    matchedProduct.id
                  } data-delivery-option-id = ${deliveryOption.id}>

                      <input type="radio"
                      ${
                        deliveryOption.id == cartItem.deliveryOptionId
                          ? "checked"
                          : ""
                      }
                      class="delivery-option-input"
                      name="delivery-option-${matchedProduct.id}">
                      <div>
                      <div class="delivery-option-date">
                          ${dateString}
                      </div>
                      <div class="delivery-option-price">
                          ${priceString} Shipping
                      </div>
                      </div>
                  </div>
          `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = checkoutSummaryHTML;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
      const newQuantity = Number(quantityInput.value)
      updateProductQuantity(newQuantity, productId)
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity
      renderCheckoutHeader()
      renderPaymentSummary()
    });
  });
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

}
