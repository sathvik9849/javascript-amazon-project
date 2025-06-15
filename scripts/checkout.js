import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutheader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

// new Promise(() => {
//   loadProductsFetch();
// }).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// loadProductsFetch().then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

async function loadPage() {
  await loadProductsFetch()
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// }).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
// loadProducts(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
