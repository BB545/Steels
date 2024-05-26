function displaySelectedProducts(products) {
    const container = document.querySelector('.pur-product-form');
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');

    container.innerHTML = '';
    let totalAmount = 0;

    products.forEach(product => {
        const item = basket.find(item => item.id == product.pro_num);
        const totalPrice = product.pro_price * item.quantity;
        container.innerHTML += `
      <div class="pur-product">
          <img src="/item${product.pro_num}.jpg" alt="Product Image" class="pro-img" />
          <div class="pur-product-info">
            <h2 class="pro-name">${product.pro_name}</h2>
            <p class="pro-price">${totalPrice} 원</p>
          </div>
        </div>
      `;
        totalAmount += totalPrice;
    });

    document.querySelector('.pur-price').textContent = `${totalAmount} 원`;
}

document.addEventListener('DOMContentLoaded', () => {
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
        const products = JSON.parse(storedProducts);
        displaySelectedProducts(products);
    }
});
