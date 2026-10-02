document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* =========================
     ADD TO CART
  ========================= */
  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const sellerCard = this.closest(".seller-card");

      let item;

      /* menu page */
      if (productCard) {
        item = {
          name: productCard.querySelector("h3").innerText,
          price: parseInt(productCard.querySelector(".price").innerText),
          image: productCard.querySelector("img").src,
          qty: parseInt(productCard.querySelector(".qty span").innerText),
        };
      }

      /* home page */
      else if (sellerCard) {
        item = {
          name: sellerCard.querySelector("h3").innerText,
          price: parseInt(
            sellerCard.querySelector(".card-price span").innerText
          ),
          image: sellerCard.querySelector("img").src,
          qty: 1,
        };
      }

      if (item) {
  const existingItem = cart.find(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItem) {
    existingItem.qty += item.qty;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
    });
  });

  /* =========================
     CART PAGE
  ========================= */
  const orderDetails = document.querySelector(".orderDetails");
  const totalPrice = document.querySelector(".total-price");
  const checkoutLink = document.querySelector(".checkout-link");

  function renderCart() {
    if (!orderDetails) return;

    orderDetails.innerHTML = "";

    if (cart.length === 0) {
      orderDetails.innerHTML =
        "<p class='empty-cart'>Your cart is empty 🛒</p>";

      if (totalPrice) totalPrice.innerHTML = "";
      if (checkoutLink) checkoutLink.style.display = "none";
      return;
    }

    if (checkoutLink) checkoutLink.style.display = "block";

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img" />

        <div class="info">
          <h3>${item.name}</h3>
          <p>${item.price} EGP</p>
          <p>Qty: ${item.qty}</p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>`
      ;

      orderDetails.appendChild(itemDiv);
    });

    if (totalPrice) {
      totalPrice.innerHTML = `Total: ${total} EGP`;
    }
  }

  /* =========================
     REMOVE ITEM
  ========================= */
  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
});