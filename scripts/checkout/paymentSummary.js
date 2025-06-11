import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary(){
   let itemPriceCents = 0;
   let shippingPriceCents = 0;
   let totalQuantity = 0
   cart.forEach((cartItem)=>{
    let matchedProduct = getProduct(cartItem.productId)
    let delivery = getDeliveryOption(cartItem)
    totalQuantity += cartItem.quantity
    itemPriceCents += matchedProduct.priceCents * cartItem.quantity
    shippingPriceCents += delivery.priceCents
   })
   const priceCentsBeforeTax = itemPriceCents + shippingPriceCents;
   const taxCents = priceCentsBeforeTax*0.1;
   const totalPriceCents = priceCentsBeforeTax + taxCents
   let paymentSummaryHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceCentsBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `
   document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml
}