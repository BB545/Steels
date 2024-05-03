const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Iamport = require('iamport');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
