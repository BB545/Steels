window.onload = function (event) {
    // 마이페이지 링크에 클릭 이벤트 리스너 추가
    event.preventDefault(); // 기본 이벤트를 방지하여 페이지 새로고침을 막음

    // 여기서부터는 기존에 작성한 axios.get('/mypage') 코드를 사용
    axios.get('/mypage/data')
        .then(function (response) {
            const orders = response.data.orders;
            if (!orders || orders.length === 0) {
                console.log('주문 내역이 없습니다.');
                return;
            }

            const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
            const ordersContainer = document.getElementById('orders-container');
            ordersContainer.innerHTML = ''; // 이전에 추가된 주문 정보를 초기화
            orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.className = 'order-info';
                orderElement.innerHTML = `
                    <img src="/item${selectedProduct.pro_num}.jpg" alt="item${selectedProduct.pro_num}" class="pro-img">
                    <div class="check-pur">
                        <div class="purCheck pur-num">${order.pur_num}</div>
                        <div class="purCheck pur-date">${order.pur_date}</div>
                        <div class="purCheck pur-dest">${order.pur_dest}</div>
                        <div class="purCheck pur-price">${order.pur_price}원</div>
                        <div class="purCheck pur-pay">결제 수단 : ${order.pur_pay}</div>
                        <div class="purCheck pur-btn">
                            <button type="button" class="btn btn-outline-info pur-btn-item">주문 취소</button>
                            <button type="button" class="btn btn-outline-info pur-btn-item">주문 교환</button>
                            <button type="button" class="btn btn-outline-info pur-btn-item">배송지 변경</button>
                        </div>
                    </div>
                `;
                ordersContainer.appendChild(orderElement);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
  }