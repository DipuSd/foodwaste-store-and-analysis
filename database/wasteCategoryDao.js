const pool = require('./db')

const findAllWasteCategory = async () => {
    const [wasteCategories] = await pool.query(`SELECT * FROM foodwastedatacategory`)
    return wasteCategories;
}

const getWholeWasteCategoryTable = async () => {
    const [wasteCategoryTable] = await pool.query('SELECT * FROM foodwastedatacategorytable')
    return wasteCategoryTable
}

module.exports = { findAllWasteCategory, getWholeWasteCategoryTable } 