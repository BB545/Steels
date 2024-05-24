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
    impKey: '0364533486857027',
    impSecret: 'DUbx3qnHA7235eLHZai3y2wTnsTtWGQYY8uWWRqNqjiPNZM2Bm9ZTEmpomwYdw87qPA69JoqYQH8WnH7'
});

app.post('/payments', async (req, res) => {
    const { imp_uid } = req.body;

    try {
        const accessToken = await iamport.payment.getToken();

        const paymentResult = await iamport.payment.getByImpUid({
            impUid: imp_uid,
            accessToken: accessToken.response.access_token,
        });

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
