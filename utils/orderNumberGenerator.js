/**
 * 주문번호 생성 유틸리티
 * 형식: YYYYMMDDHHmmss + 랜덤 6자리 숫자
 * 예시: 20250125143052123456
 */

/**
 * 고유한 주문번호를 생성
 * @param {number} productNum - 상품 번호 (선택사항, 포함 시 더 고유성 보장)
 * @returns {string} 생성된 주문번호
 */
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
 * 간단한 주문번호 생성 (더 짧은 형식)
 * 형식: ORD + YYYYMMDD + 랜덤 8자리
 * 예시: ORD2025012512345678
 */
function generateShortOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    
    // 랜덤 8자리 숫자
    const randomNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    
    return `ORD${date}${randomNum}`;
}

module.exports = {
    generateOrderNumber,
    generateShortOrderNumber
};
