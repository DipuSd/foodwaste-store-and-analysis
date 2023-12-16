const authorizeContrubutor = (req, res, next) => {
    // if (req.session.contributor) {
    //     next()
    // } else {
    //     res.redirect('/login')
    // }

    // Temporary disabling middleware for countribution form development
    next()
}

module.exports = { authorizeContrubutor }