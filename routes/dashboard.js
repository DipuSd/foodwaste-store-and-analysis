const express = require("express");
const {
  getCountryWiseTotalWasteData,
  getCityWiseTotalWasteData,
  getSourceWiseTotalWasteData,
} = require("../database/dashboardDao");

const router = express.Router();

router.get("/countrywise-total-waste", async (req, res) => {
  const data = await getCountryWiseTotalWasteData();
  res.json(data);
});

router.get("/citywise-total-waste", async (req, res) => {
  const data = await getCityWiseTotalWasteData();
  res.json(data);
});

router.get("/sourcewise-total-waste", async (req, res) => {
  const data = await getSourceWiseTotalWasteData();
  res.json(data);
});

module.exports = router;
