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
        console.log('-----');
        req.session.destroy(err=>{
            res.redirect('/')
        })
        alert('로그아웃되었습니다.')
    } else{
        res.send('잘못된 접근입니다.')
    }
}