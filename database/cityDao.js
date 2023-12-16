const pool = require('./db')

const findAllCityByCountryId = async (countryId) => {
    const [cities] = await pool.query(`SELECT * FROM city where countryID = ?`, [countryId])
    return cities;
}

module.exports = { findAllCityByCountryId }