import { loadStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart.js";
import { loadProducts,loadProductsFetch } from "../../data/products.js";
describe("Test Suite: renderOrderSummary", () => {
  const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done()
    })
  })
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-item-container").innerHTML = `
    <div class = "js-order-summary"></div>
    <div class = "js-payment-summary"></div>
    <div class = "js-checkout-header"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          deliveryOptionId: 2,
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: 2,
        },
      ]);
    });
    loadStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-item-container").innerHTML = "";
  });
  it("load order summary", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${product1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain("Quantity: 1");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${product1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);
  });
});
