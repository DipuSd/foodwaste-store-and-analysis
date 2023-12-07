const pool = require('./db')

const findAllUser = async () => {
    const [rows] = await pool.query("SELECT * FROM user")
    return rows;
}

const findOneUserById = async (id) => {
    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id])
    return user[0];
}

const findOneUserByName = async (name) => {
    const [user] = await pool.query(`SELECT * FROM user WHERE name = ?`, [name])
    return user[0];
}

module.exports = {findOneUserById, findOneUserByName, findAllUser}