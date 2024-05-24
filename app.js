const express = require('express');
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser');
const Iamport = require('iamport');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/static'))
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const iamport = new Iamport({
    impKey: '0364533486857027', // 여기에 아임포트에서 발급받은 REST API 키를 입력하세요.
    impSecret: 'DUbx3qnHA7235eLHZai3y2wTnsTtWGQYY8uWWRqNqjiPNZM2Bm9ZTEmpomwYdw87qPA69JoqYQH8WnH7' // 여기에 아임포트에서 발급받은 REST API Secret을 입력하세요.
});

app.post('/payments', async (req, res) => {
    const { imp_uid } = req.body; // 클라이언트로부터 imp_uid 받기

    try {
        // 액세스 토큰(access token) 요청
        const accessToken = await iamport.payment.getToken();

        // 결제 정보 조회
        const paymentResult = await iamport.payment.getByImpUid({
            impUid: imp_uid,
            accessToken: accessToken.response.access_token, // 접근 토큰 사용
        });

        // 조회된 결제 정보를 클라이언트로 응답
        res.json({ success: true, paymentInfo: paymentResult.response });
    } catch (error) {
        res.status(500).json({ success: false, message: '결제 정보 조회 실패', error });
    }
});

const indexRouter = require('./routes/index');
app.use('/', indexRouter)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
