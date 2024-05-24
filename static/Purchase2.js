document.addEventListener('DOMContentLoaded', function () {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
        const product = JSON.parse(productData);
        displayProductInfo(product);
    } else {
        console.error('Error: 로컬스토리지에서 제품 정보를 가져올 수 없습니다.');
    }

    function displayProductInfo(product) {
        const productImg = document.querySelector('.pro-img');
        const productName = document.querySelector('.pro-name');
        const productPrice = document.querySelector('.pro-price');
        const purchasePrice = document.querySelector('.pur-price');

        if (productImg) {
            productImg.src = `/item${product.pro_num}.jpg`;
            console.log('Product Image Updated:', productImg.src);  // 이미지 업데이트 확인
        } else {
            console.error('Error: .pro-img 요소를 찾을 수 없습니다.');
        }

        if (productName) {
            productName.innerText = product.pro_name;
            console.log('Product Name Updated:', productName.innerText);  // 이름 업데이트 확인
        } else {
            console.error('Error: .pro-name 요소를 찾을 수 없습니다.');
        }

        if (productPrice) {
            productPrice.innerText = `${product.pro_price}원`;
            console.log('Product Price Updated:', productPrice.innerText);  // 가격 업데이트 확인
        } else {
            console.error('Error: .pro-price 요소를 찾을 수 없습니다.');
        }

        if (purchasePrice) {
            purchasePrice.innerText = `${product.pro_price}원`;
            console.log('Purchase Price Updated:', purchasePrice.innerText);  // 총 금액 업데이트 확인
        } else {
            console.error('Error: .pur-price 요소를 찾을 수 없습니다.');
        }
    }
});