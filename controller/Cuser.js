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
            res.send({ isLogin: true });
        } else {
            res.send({ isLogin: false });
        }
    });
};