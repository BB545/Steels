document.addEventListener('DOMContentLoaded', function(event) {
    axios.get('/mypage/data')
        .then(function (response) {
            const orders = response.data.orders;
            if (!orders || orders.length === 0) {
                console.log('주문 내역이 없습니다.');
                return;
            }

            const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
            const ordersContainer = document.getElementById('orders-container');
            ordersContainer.innerHTML = '';
            orders.forEach(order => {
                const utcDateString = `${order.pur_date}`;
                const date = new Date(utcDateString);
                const orderElement = document.createElement('div');
                orderElement.className = 'order-info';
                orderElement.innerHTML = `
                    <img src="/item${selectedProduct.pro_num}.jpg" alt="item${selectedProduct.pro_num}" class="pro-img">
                    <div class="check-pur">
                        <div class="purCheck pur-num">${order.pur_num}</div>
                        <div class="purCheck pur-date">${date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
                        <div class="purCheck pur-dest">${order.pur_dest}</div>
                        <div class="purCheck pur-price">${order.pur_price}원</div>
                        <div class="purCheck pur-pay">결제 수단 : ${order.pur_pay}</div>
                        <div class="purCheck pur-btn">
                            <button type="button" class="btn btn-outline-info pur-btn-item orderDelBtn">주문 취소</button>
                            <button type="button" class="btn btn-outline-info pur-btn-item orderChangeBtn">주문 교환</button>
                            <button type="button" class="btn btn-outline-info pur-btn-item changeAddBtn">배송지 변경</button>
                        </div>
                    </div>
                `;
                ordersContainer.appendChild(orderElement);
            });

            document.querySelectorAll('.orderDelBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const alertContainer = document.querySelector('.alertcontainer');
                    alertContainer.style.display = 'block';
                });
            });
            document.querySelectorAll('.orderChangeBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const alertContainer = document.querySelector('.alertcontainer2');
                    alertContainer.style.display = 'block';
                });
            });

            document.querySelectorAll('.changeAddBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const alertContainer = document.querySelector('.alertcontainer6');
                    alertContainer.style.display = 'block';
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertClose')) {
                document.querySelector('.alertcontainer').style.display = 'none';
            }
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertBtn')) {
                alert('취소요청이 완료되었습니다.');
                document.querySelector('.alertcontainer').style.display = 'none';
            }
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertClose2')) {
                document.querySelector('.alertcontainer2').style.display = 'none';
            }
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertBtn2')) {
                alert('교환요청이 완료되었습니다.');
                document.querySelector('.alertcontainer2').style.display = 'none';
            }
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertClose6')) {
                document.querySelector('.alertcontainer6').style.display = 'none';
            }
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('alertBtn3')) {
                alert('취소요청이 완료되었습니다.');
                document.querySelector('.alertcontainer6').style.display = 'none';
            }
        });

    axios.get('/customer/data')
        .then(function (response) {
            const customerData = response.data.customers;
            let tableContent = '';
            customerData.forEach((customer, index) => {
                const utcDateString = `${customer.date}`;
                const date = new Date(utcDateString);
                tableContent += `
                            <td class="cus_num">${index + 1}</td>
                            <td class="cus_cont">${customer.usercontent}</td>
                            <td class="cus_date">${date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                           `;
            });
            document.getElementById('cus_con').innerHTML = tableContent;
        })
        .catch(function (error) {
            console.log(error);
        });
});