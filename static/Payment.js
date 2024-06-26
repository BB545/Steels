$(document).ready(function () {
    $('#payment').change(function () {
        if ($(this).val() == 'creditcard') {
            $('#paymentBtn').off('click').on('click', function (e) {
                e.preventDefault();
                payment();
            });
        } else if ($(this).val() == 'payin') {
            $('#paymentBtn').off('click').on('click', function (e) {
                e.preventDefault();
                processPayIn();
            });
        } else {
            $('#paymentBtn').off('click');
        }
    });
});

function payment() {
    IMP.init('imp37630382');
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!productData) {
        alert('오류: 제품 정보를 불러올 수 없습니다.');
        return;
    }
    IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `20240424000${productData.pro_num}`,
        name: productData.pro_name,
        amount: productData.pro_price,
        buyer_email: 'iamport@siot.do',
        buyer_name: $('#fullname').val(),
        buyer_tel: $('#tel').val(),
        buyer_addr: $('#sample6_postcode').val(),
        buyer_postcode: $('#sample6_address').val()
    }, function (rsp) {
        if (rsp.success) {
            $.ajax({
                url: "/payments",
                type: 'POST',
                dataType: 'json',
                data: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: `20240424000${productData.pro_num}`,
                    paid_amount: productData.pro_price,
                    apply_num: rsp.apply_num,
                    product_id: productData.pro_num,
                    product_name: productData.pro_name,
                    product_price: productData.pro_price
                }
            }).done(function (data) {
                if (data.success) {
                    if (data.success) {
                        var msg = '결제가 완료되었습니다.';
                        msg += '\n고유ID : ' + rsp.imp_uid;
                        msg += '\n상점 거래ID : ' + "order_no_0001";
                        msg += '\결제 금액 : ' + 14000;
                        msg += '\n카드 승인번호 : ' + rsp.apply_num;
                        alert(msg);
                    } else {
                        alert('서버 오류: ' + data.error_msg);
                    }
                } else {
                    alert('서버 오류: ' + data.error_msg);
                }
            });
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '\n에러내용 : ' + rsp.error_msg;
            alert(msg);
        }
    });
}

function processPayIn() {
    const fullname = $('#fullname').val();
    const tel = $('#tel').val();
    const sample6_address = $('#sample6_address').val();
    const sample6_detailAddress = $('#sample6_detailAddress').val();
    const payment = $('#payment').val();
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!productData || payment !== 'payin') {
        alert('제품 정보가 없거나 유효하지 않은 결제 방법입니다.');
        return;
    }

    axios.post('/order', {
        fullname,
        tel,
        productData,
        sample6_address,
        sample6_detailAddress,
        payment
    })
    .then(function (response) {
        if (response.data && response.data.success) {
            alert(response.data.message);
            window.location.href = "/";
        } else {
            alert('서버 오류: ' + (response.data.message || '알 수 없는 오류가 발생했습니다.'));
        }
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('주문 처리 중 오류가 발생했습니다.');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    $('#payment').trigger('change');
});