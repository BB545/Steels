const cart = document.getElementById("cart"),
    cartop = document.getElementById("cart-open"),
    cartBtn = document.getElementById("cart-btn"),
    cartClose = document.getElementById("cart-close");

    cartop.addEventListener("click", () => {
        cart.classList.add("show-cart");
    });
    cartBtn.addEventListener("click", () => {
        cart.classList.add("show-cart");
    });

    cartClose.addEventListener("click", () => {
        cart.classList.remove("show-cart");
    });