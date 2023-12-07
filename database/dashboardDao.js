const pool = require("./db");

const getCountryWiseTotalWasteData = async () => {
  const [data] = await pool.query(
    `SELECT f.countryID, c.countryName, SUM(f.quantity) totalWaste
    FROM foodwastedata f
             JOIN country c ON c.countryID = f.countryID
    GROUP BY f.countryID`
  );

  return data;
};

const getCityWiseTotalWasteData = async () => {
  const [data] = await pool.query(
    `SELECT f.cityID, c.cityName, SUM(f.quantity) totalWaste
    FROM foodwastedata f
             JOIN city c ON c.cityID = f.cityID
    GROUP BY f.cityID`
  );

  return data;
};

const getSourceWiseTotalWasteData = async () => {
  const [data] = await pool.query(
    `SELECT f.sourceId, s.sourceName, SUM(f.quantity) totalWaste
    FROM foodwastedata f
            JOIN source s ON s.sourceID = f.sourceID
    GROUP BY f.sourceId;`
  );

  return data;
};

module.exports = {
  getCityWiseTotalWasteData,
  getCountryWiseTotalWasteData,
  getSourceWiseTotalWasteData,
};
