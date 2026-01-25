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

function generateOrderNumber(productNum = null) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const productSuffix = productNum ? String(productNum).slice(-2).padStart(2, '0') : '';
    return `${dateTime}${randomNum}${productSuffix}`;
}

/**
 * Idempotency Key 생성 (중복 주문 방지용)
 */
function generateIdempotencyKey() {
    return 'idemp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

let isProcessingPayment = false; // 결제 처리 중 플래그

function payment() {
    // 중복 클릭 방지
    if (isProcessingPayment) {
        alert('결제가 진행 중입니다. 잠시만 기다려주세요.');
        return;
    }

    IMP.init('imp37630382');
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!productData) {
        alert('오류: 제품 정보를 불러올 수 없습니다.');
        return;
    }

    const merchant_uid = generateOrderNumber(productData.pro_num);
    const idempotencyKey = generateIdempotencyKey();
    
    // idempotencyKey를 localStorage에 저장 (중복 방지용)
    localStorage.setItem('currentOrderKey', idempotencyKey);
    localStorage.setItem('currentOrderNumber', merchant_uid);

    // 결제 버튼 비활성화
    isProcessingPayment = true;
    const paymentBtn = $('#paymentBtn');
    const originalText = paymentBtn.text();
    paymentBtn.prop('disabled', true).text('결제 처리 중...');

    IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchant_uid,
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
                    merchant_uid: merchant_uid,
                    paid_amount: productData.pro_price,
                    apply_num: rsp.apply_num,
                    product_id: productData.pro_num,
                    product_name: productData.pro_name,
                    product_price: productData.pro_price,
                    idempotencyKey: idempotencyKey
                }
            }).done(function (data) {
                if (data.success) {
                    var msg = '결제가 완료되었습니다.';
                    msg += '\n고유ID : ' + rsp.imp_uid;
                    msg += '\n상점 거래ID : ' + merchant_uid;
                    msg += '\n결제 금액 : ' + productData.pro_price;
                    msg += '\n카드 승인번호 : ' + rsp.apply_num;
                    alert(msg);
                    
                    localStorage.removeItem('currentOrderKey');
                    localStorage.removeItem('currentOrderNumber');
                    localStorage.removeItem('selectedProduct');
                    
                    window.location.href = "/";
                } else {
                    alert('서버 오류: ' + (data.error_msg || '알 수 없는 오류'));
                }
            }).fail(function(xhr, status, error) {
                alert('결제 정보 전송 중 오류가 발생했습니다.');
                console.error('Payment error:', error);
            }).always(function() {
                isProcessingPayment = false;
                paymentBtn.prop('disabled', false).text(originalText);
            });
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '\n에러내용 : ' + rsp.error_msg;
            alert(msg);
            
            isProcessingPayment = false;
            paymentBtn.prop('disabled', false).text(originalText);
        }
    });
}

let isProcessingPayIn = false; // 무통장 입금 처리 중 플래그

function processPayIn() {
    // 중복 클릭 방지
    if (isProcessingPayIn) {
        alert('주문이 진행 중입니다. 잠시만 기다려주세요.');
        return;
    }

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

    if (!fullname || !tel || !sample6_address) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }

    const idempotencyKey = generateIdempotencyKey();
    localStorage.setItem('currentOrderKey', idempotencyKey);

    // 버튼 비활성화 및 로딩 상태
    isProcessingPayIn = true;
    const paymentBtn = $('#paymentBtn');
    const originalText = paymentBtn.text();
    paymentBtn.prop('disabled', true).text('주문 처리 중...');

    axios.post('/order', {
        fullname,
        tel,
        productData,
        sample6_address,
        sample6_detailAddress,
        payment,
        idempotencyKey: idempotencyKey
    })
    .then(function (response) {
        if (response.data && response.data.success) {

            if (response.data.isDuplicate) {
                alert('이미 처리된 주문입니다.\n주문번호: ' + response.data.orderNumber);
            } else {
                alert(response.data.message + '\n주문번호: ' + response.data.orderNumber);
            }
            
            localStorage.removeItem('currentOrderKey');
            localStorage.removeItem('selectedProduct');
            
            window.location.href = "/";
        } else {
            alert('서버 오류: ' + (response.data.message || '알 수 없는 오류가 발생했습니다.'));
        }
    })
    .catch(function (error) {
        console.error('Error:', error);
        
        if (error.response && error.response.status === 409) {
            alert('중복된 주문입니다. 이미 처리된 주문이 있는지 확인해주세요.');
        } else {
            alert('주문 처리 중 오류가 발생했습니다.');
        }
    })
    .finally(function() {
        isProcessingPayIn = false;
        paymentBtn.prop('disabled', false).text(originalText);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    $('#payment').trigger('change');
});