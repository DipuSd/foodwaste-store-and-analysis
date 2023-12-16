const authorizeContrubutor = (req, res, next) => {
    if (req.session.contributor) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = { authorizeContrubutor }