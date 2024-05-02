const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Iamport = require('iamport');

app.set('view engine', 'ejs');
app.set('views', './views');


// 미들웨어 설정
app.use(bodyParser.json()); // JSON 형태의 본문 분석을 위해
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형태의 본문 분석을 위해

app.get('/', (req,res)=>{
    res.render('test')
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
