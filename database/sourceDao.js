const pool = require('./db')

const findAllSources = async () => {
    const [sources] = await pool.query('SELECT * FROM source')
    return sources;
}

const findAllSourceByCityId = async (cityId) => {
    const [sources] = await pool.query('select s.* from citysource c join source s on c.sourceID = s.sourceID where c.cityID = ?', [cityId])
    return sources;
}


module.exports = { findAllSources, findAllSourceByCityId }