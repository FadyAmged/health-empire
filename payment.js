document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemsContainer = document.querySelector(".items");
  const subtotalEl = document.querySelector(".subtotal p");
  const shippingEl = document.querySelector(".shipping p");
  const totalEl = document.querySelector(".total p");

  const form = document.querySelector(".payment-form");

  // inputs
  const cardNumber = document.querySelector("input[placeholder='Card number']");
  const cardName = document.querySelector("#cardholder-name");
  const cvv = document.querySelector("#cvv");

  // =========================
  // عرض المنتجات
  // =========================
  function renderPayment() {

    itemsContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

      subtotal += item.price * item.qty;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.image}" class="cart-img" alt="product" />

        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.qty} × ${item.price} EGP</p>
        </div>
      `;

      itemsContainer.appendChild(div);
    });

    let shipping = subtotal > 0 ? 50 : 0;
    let total = subtotal + shipping;

    subtotalEl.textContent = "Subtotal: " + subtotal + " EGP";
    shippingEl.textContent = "Shipping: " + shipping + " EGP";
    totalEl.textContent = "Total: " + total + " EGP";
  }

  renderPayment();

  // =========================
  // الدفع
  // =========================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty 🛒");
      return;
    }

    if (
      cardNumber.value.trim() === "" ||
      cardName.value.trim() === "" ||
      cvv.value.trim() === ""
    ) {
      alert("Please fill all payment fields ❗");
      return;
    }

    if (cvv.value.length < 3) {
      alert("Invalid CVV ❗");
      return;
    }

    alert("Payment Successful 🎉 Your order has been placed");

    // حفظ الأوردر للتراك
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    // مسح السلة
    localStorage.removeItem("cart");
    cart = [];

    form.reset();
    window.location.href = "track.html";
  });
});