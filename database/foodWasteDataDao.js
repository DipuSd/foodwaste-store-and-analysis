const pool = require('./db')

const saveNewFoodWasteData = async (data) => {
    const [result] = await pool.query(`insert into 
    foodwastedata(sourceID, contributorID, cityID,  countryID, reason, quantity, wasteGenerationDate, contributionTime, contributionDate) 
    values (?, ?, ?, ?, ?, ?, ?, current_time(), current_date());`, [data.sourceID, data.contributorID, data.cityID, data.countryID, data.reason, data.quantity, data.wasteGenerationDate])

    const newFoodWasteDataID = result.insertId
    insertWasteCategoryData({ foodWasteDataID: newFoodWasteDataID, wasteCategoryIds: data.foodWasteCategories })
}

const insertWasteCategoryData = async (data) => {
    let values = [];
    // converting even single waste category from client to array
    [].concat(data.wasteCategoryIds).map(categoryID => {
        values.push([data.foodWasteDataID, categoryID])
    })

    await pool.query(`insert into foodwastedatacategorytable (dataID, categoryID) values ?`, [values], err => {
        if (err) {
            throw err
        }
    })
}
const getWholeTable = async () => {
    const [data] = await pool.query('SELECT * FROM foodwastedata')
    return data
}
module.exports = { saveNewFoodWasteData, getWholeTable }