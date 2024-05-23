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

const indexRouter = require('./routes/index');
app.use('/', indexRouter)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
