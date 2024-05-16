const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Iamport = require('iamport');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/static'))

const indexRouter = require('./routes/index');
app.use('/', indexRouter)

const signRouter = require('./routes/signUser');
app.use('/signup', signRouter)

const loginRouter = require('./routes/loginUser');
app.use('/', loginRouter)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
