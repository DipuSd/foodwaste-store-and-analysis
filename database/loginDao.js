const pool = require('./db')

const getLoginByID = async (id)=>{
    const [rows] = await pool.query('SELECT * FROM DataContributorLogin WHERE contributorID = ?', [id])
    return rows;
}

module.exports = {getLoginByID}