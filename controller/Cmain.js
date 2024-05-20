exports.main = (req,res) => {
    res.render('index')
}

exports.productAll = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('productAll', { isLogged, user })
}

exports.productLiving = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('productLiving', { isLogged, user })
}

exports.productOut = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('productOut', { isLogged, user })
}

exports.productLife = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('productLife', { isLogged, user })
}

exports.Customer = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('Customer', { isLogged, user })
}

exports.Mypage = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('myPage', { isLogged, user })
}

exports.Purchase = (req,res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('Purchase', { isLogged, user })
}