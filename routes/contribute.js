const express = require('express')
const router = express.Router()

const { findOneContributorInfoById, findContributionCountByContributorId } = require('../database/contributroDao')
const { findAllCountry } = require('../database/countryDao')

router.get("/dashboard", async (req, res) => {
    let contributor = req.session.contributor
    let contributorInfo = await findOneContributorInfoById(contributor.contributorID)
    let contributionCount = await findContributionCountByContributorId(contributor.contributorID)
    contributorInfo.contributionCount = contributionCount
    res.render('contributorDashboard', { title: "Welcome " + contributorInfo.firstName + " " + contributorInfo.lastName, contributorInfo: contributorInfo })
});

router.get('/new', async (req, res) => {
    const countries = await findAllCountry()
    res.render('contributeData', { title: 'Contribute New Data', countries: countries })
})

module.exports = router