const express = require("express");
const { findAllSourceByCityId } = require('../database/sourceDao')

const router = express.Router()

router.get('/', async (req, res) => {
    const cityID = req.query.cityID
    if (!cityID) {
        res.status(404)
        return
    }
    const sources = await findAllSourceByCityId(cityID)
    res.json(sources)
})

module.exports = router