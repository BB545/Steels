const User = require('../models/User');

exports.post_user = (req,res) => {
    const {username, phone, userpw} = req.body;
    User.postUser({username, phone, userpw}, (result)=>{
        res.send(result)
    })
}

exports.post_login = (req, res) => {
    const { loginPhone, loginUserpw } = req.body;

    User.loginUser({loginPhone, loginUserpw}, (result) => {
        if (result.length > 0) {
            req.session.user=loginPhone;
            res.send({ isLogin: true });
        } else {
            res.send({ isLogin: false });
        }
    });
};

exports.get_loginSession = (req,res) => {
    const user = req.session.user;
    if(user !== undefined){
        res.render('index', {isLogged: true, user: user})
    } else{
        res.render('index', {isLogged: false})
    }
}

exports.get_logoutSession = (req,res) => {
    const user = req.session.user;
    if(user!==undefined){
        req.session.destroy(err=>{
            res.redirect('/')
        })
    } else{
        res.send('잘못된 접근입니다.')
    }
}

exports.fromCustomer = (req,res) => {
    const { username, phone, usercontent, date } = req.body;
    User.fromCustomer({username, phone, usercontent, date}, (err, results) => {
        if (err) {
            res.status(500).send('서버 오류가 발생했습니다.');
        } else {
            res.status(200).send('문의 내용이 성공적으로 등록되었습니다.');
        }
    });
}

exports.getCustomer = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    if (!user) {
        return res.status(401).send({ message: '로그인이 필요합니다.' });
    }

    User.getCustomer(user, (customers) => {
        res.json({ customers: customers, isLogged, user });
    });
};