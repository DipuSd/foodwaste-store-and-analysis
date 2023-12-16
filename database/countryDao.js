const pool = require('./db')

const findAllCountry = async () => {
    const [countries] = await pool.query(`SELECT * FROM country`)
    return countries;
}

module.exports = { findAllCountry }