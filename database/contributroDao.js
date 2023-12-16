const pool = require('./db')

const findOneContributorLoginById = async (id) => {
    const [user] = await pool.query(`SELECT * FROM datacontributorlogin WHERE contributorID = ?`, [id])
    return user[0];
}

const findOneContributorInfoById = async (id) => {
    const [user] = await pool.query(`SELECT * FROM datacontributor WHERE contributorID = ?`, [id])
    return user[0];
}

const findContributionCountByContributorId = async (id) => {
    const [contributionCount] = await pool.query(`select count(contributorID) contributionCount from foodwastedata where contributorID = ?`, [id])
    return contributionCount[0]?.contributionCount
}

module.exports = { findOneContributorLoginById, findOneContributorInfoById, findContributionCountByContributorId }