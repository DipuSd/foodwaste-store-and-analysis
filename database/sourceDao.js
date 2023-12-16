const pool = require('./db')

const findAllSources = async () => {
    const [sources] = await pool.query('SELECT * FROM source')
    return sources;
}

module.exports = { findAllSources }