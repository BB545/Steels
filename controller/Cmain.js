// const user = require('../model/Cuser');

exports.main = (req,res) => {
    res.render('index')
}

exports.productAll = (req,res) => {
    res.render('productAll')
}

exports.productLiving = (req,res) => {
    res.render('productLiving')
}

exports.productOut = (req,res) => {
    res.render('productOut')
}

exports.productLife = (req,res) => {
    res.render('productLife')
}