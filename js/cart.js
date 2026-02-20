document.addEventListener("DOMContentLoaded", function () {

    const addCartBtn = document.querySelector(".add-cart");
    const cartCount = document.querySelector(".cart-count");
    const status = document.querySelector(".cart-status");

    let count = 0;

    if (addCartBtn) {
        addCartBtn.addEventListener("click", function () {
            count++;
            cartCount.textContent = count;
            status.textContent = "> Item added to cart.";
        });
    }

});