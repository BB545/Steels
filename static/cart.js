const cartBtn = document.querySelectorAll(".btnSave");
const cartView = document.querySelectorAll(".cartView");

document.addEventListener('DOMContentLoaded', function () {
    updateCartAmount1();
    updateCartAmount2();
    cartBtn.forEach((btn) => {
        btn.addEventListener('click', function () {
            const clickedIndex = this.getAttribute('data-index');
            let basket = JSON.parse(localStorage.getItem('basket') || '[]');
            const clickedIndexInt = parseInt(clickedIndex, 10);
            const productIndex = basket.findIndex(item => item.id === clickedIndexInt);

            if (productIndex !== -1) {
                basket[productIndex].quantity += 1;
            } else {
                basket.push({ id: parseInt(clickedIndex, 10), quantity: 1 });
            }

            localStorage.setItem('basket', JSON.stringify(basket));

            updateCartAmount1();
            updateCartAmount2();

            alert('장바구니에 추가되었습니다.');
            sendBasketData();
        });
    });

    cartView.forEach((view) => {
        view.addEventListener('click', function () {
            sendBasketData();
        });
    });

    document.querySelector('.remBtn').addEventListener('click', function() {
        localStorage.removeItem('basket');
        updateCartAmount1();
        updateCartAmount2();
        sendBasketData();
        location.reload();
    });

    document.querySelectorAll('.selecCartOrder').forEach(button => {
        button.addEventListener('click', function () {
            const alertContainer = document.querySelector('.alertcontainer3');
            alertContainer.style.display = 'block';
        });
    });

    document.querySelectorAll('.allCartOrder').forEach(button => {
        button.addEventListener('click', function () {
            const alertContainer = document.querySelector('.alertcontainer4');
            alertContainer.style.display = 'block';
        });
    });
    
    document.querySelectorAll('.removeCartAll').forEach(button => {
        button.addEventListener('click', function () {
            const alertContainer = document.querySelector('.alertcontainer5');
            alertContainer.style.display = 'block';
        });
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('alertClose3')) {
            document.querySelector('.alertcontainer3').style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('alertClose4')) {
            document.querySelector('.alertcontainer4').style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('alertClose5')) {
            document.querySelector('.alertcontainer5').style.display = 'none';
        }
    });
});

function updateCartAmount1() {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    const cartAmountElement = document.getElementById("cartAmount1");
    cartAmountElement.textContent = totalItems;
}

function updateCartAmount2() {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    const cartAmountElement = document.getElementById("cartAmount2");
    cartAmountElement.textContent = totalItems;
}

function sendBasketData() {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    axios.post('/cart', { basket: basket }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            updateTotalPrice(response.data.totalPrice);
        })
        .catch(error => {
            console.error('There was an error sending the basket data:', error);
        });
}

function updateTotalPrice(totalPrice) {
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice;
}

function removeItem(id) {
    let basket = JSON.parse(localStorage.getItem('basket') || '[]');
    basket = basket.filter(item => item.id != id);
    localStorage.setItem('basket', JSON.stringify(basket));
    updateCartAmount1();
    updateCartAmount2();
    sendBasketData();
    location.reload();
}

function decrement(id) {
    let basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const item = basket.find(item => item.id == id);
    if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
        localStorage.setItem('basket', JSON.stringify(basket));
        updateCartAmount1();
        updateCartAmount2();
        sendBasketData();
        location.reload();
    }
}

function increment(id) {
    let basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const item = basket.find(item => item.id == id);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('basket', JSON.stringify(basket));
        updateCartAmount1();
        updateCartAmount2();
        sendBasketData();
        location.reload();
    }
}