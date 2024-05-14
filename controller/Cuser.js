const User = require('../models/User');

exports.post_user = (req,res)=>{
    const {username, phone, userpw} = req.body;
    User.postUser({username, phone, userpw}, (result)=>{
        res.send(result)
    })
}