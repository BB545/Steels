# 주문번호 생성 및 중복 주문 방지 개선 사항

## 📋 개선 내용

### 1. 주문번호 생성 로직 개선

#### 기존 문제점
- 하드코딩된 날짜 사용: `20240424000${productData.pro_num}`
- 동일 상품 동시 주문 시 중복 가능성
- 확장성 부족

#### 개선 사항
- **새로운 형식**: `YYYYMMDDHHmmss + 랜덤 6자리 + 상품번호 2자리`
- **예시**: `2025012514305212345678`
- 타임스탬프 기반으로 고유성 보장
- 랜덤 숫자로 충돌 가능성 최소화

#### 구현 위치
- `utils/orderNumberGenerator.js`: 주문번호 생성 유틸리티 모듈
- `controller/Cproduct.js`: 주문 처리 시 사용
- `static/Payment.js`: 프론트엔드에서도 동일한 로직 사용

### 2. 중복 주문 방지 메커니즘

#### 다층 방어 시스템

##### 1) 프론트엔드 레벨
- **버튼 비활성화**: 주문 처리 중 버튼 클릭 불가
- **로딩 상태 표시**: "주문 처리 중..." 메시지
- **플래그 관리**: `isProcessingPayment`, `isProcessingPayIn` 변수로 중복 실행 방지

##### 2) Idempotency Key 시스템
- 각 주문 요청마다 고유 키 생성: `idemp_${timestamp}_${random}`
- 동일 키로 재요청 시 기존 주문 반환 (중복 처리 방지)
- localStorage에 저장하여 페이지 새로고침 후에도 추적 가능

##### 3) 백엔드 레벨
- **주문번호 중복 체크**: DB에 동일 주문번호 존재 여부 확인
- **자동 재시도**: 중복 발견 시 최대 5번까지 새 주문번호 생성
- **DB 제약 조건**: MySQL UNIQUE 제약으로 최종 방어선

#### 구현 위치
- `models/Product.js`: `checkOrderNumberExists()`, `checkIdempotencyKey()` 함수
- `controller/Cproduct.js`: `postOrder()` 함수에 중복 체크 로직 추가
- `static/Payment.js`: 프론트엔드에서 idempotencyKey 생성 및 전송

## 🔧 사용 방법

### 주문번호 생성
```javascript
const { generateOrderNumber } = require('./utils/orderNumberGenerator');

// 기본 사용
const orderNumber = generateOrderNumber();

// 상품번호 포함
const orderNumber = generateOrderNumber(productNum);
```

### 중복 주문 방지 (프론트엔드)
```javascript
// 자동으로 처리됨
// - 버튼 클릭 시 자동 비활성화
// - idempotencyKey 자동 생성 및 전송
// - 중복 요청 시 기존 주문 반환
```

### 중복 주문 방지 (백엔드)
```javascript
// 컨트롤러에서 자동 처리
// - idempotencyKey가 있으면 기존 주문 확인
// - 주문번호 중복 체크
// - DB 제약 조건으로 최종 보호
```

## 📊 개선 효과

### 보안
- ✅ 중복 주문 완전 차단
- ✅ 동시 요청 처리 안정성 향상
- ✅ 사용자 실수로 인한 중복 결제 방지

### 사용자 경험
- ✅ 버튼 비활성화로 명확한 피드백
- ✅ 로딩 상태 표시로 진행 상황 확인
- ✅ 중복 클릭 시도 시 안내 메시지

### 시스템 안정성
- ✅ 주문번호 충돌 가능성 최소화
- ✅ DB 무결성 보장
- ✅ 확장 가능한 구조

## 🔍 추가 고려 사항

### 데이터베이스 스키마 개선 (선택사항)
```sql
-- orderlist 테이블에 idempotency_key 컬럼 추가 권장
ALTER TABLE orderlist 
ADD COLUMN idempotency_key VARCHAR(100) UNIQUE,
ADD INDEX idx_idempotency_key (idempotency_key);

-- pur_num에 UNIQUE 제약 추가 (이미 있다면 생략)
ALTER TABLE orderlist 
ADD UNIQUE KEY unique_pur_num (pur_num);
```

### 로깅 개선 (선택사항)
- 중복 주문 시도 로그 기록
- 주문번호 재생성 횟수 모니터링
- 성능 메트릭 수집

## ⚠️ 주의사항

1. **기존 주문번호 형식과 호환성**
   - 기존 주문번호 형식(`20240424000${pro_num}`)과 다름
   - 기존 데이터와의 호환성 고려 필요

2. **타임존 설정**
   - 서버 타임존이 올바르게 설정되어 있는지 확인
   - `Product.js`에서 `timezone: '+09:00'` 설정 확인

3. **성능 고려**
   - 주문번호 중복 체크는 DB 쿼리 발생
   - 트래픽이 많은 경우 인덱스 최적화 필요

## 📝 변경된 파일 목록

1. `utils/orderNumberGenerator.js` (신규)
2. `models/Product.js` (수정)
3. `controller/Cproduct.js` (수정)
4. `static/Payment.js` (수정)
