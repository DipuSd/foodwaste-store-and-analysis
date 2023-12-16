const express = require("express");
const { findAllCityByCountryId } = require('../database/cityDao')

const router = express.Router()

router.get('/', async (req, res) => {
    const countryID = req.query.countryID
    if (!countryID) {
        res.status(404)
        return
    }
    const cities = await findAllCityByCountryId(countryID)
    res.json(cities)
})

module.exports = router