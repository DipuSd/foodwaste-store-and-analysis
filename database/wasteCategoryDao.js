const pool = require('./db')

const findAllWasteCategory = async () => {
    const [wasteCategories] = await pool.query(`SELECT * FROM foodwastedatacategory`)
    return wasteCategories;
}

module.exports = { findAllWasteCategory } 