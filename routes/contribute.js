const express = require('express')
const router = express.Router()

const { findOneContributorInfoById, findContributionCountByContributorId } = require('../database/contributroDao')
const { findAllCountry } = require('../database/countryDao')
const { findAllSources } = require('../database/sourceDao')

router.get("/dashboard", async (req, res) => {
    let contributor = req.session.contributor
    let contributorInfo = await findOneContributorInfoById(contributor.contributorID)
    let contributionCount = await findContributionCountByContributorId(contributor.contributorID)
    contributorInfo.contributionCount = contributionCount
    res.render('contributorDashboard', { title: "Welcome " + contributorInfo.firstName + " " + contributorInfo.lastName, contributorInfo: contributorInfo })
});

router.get('/new', async (req, res) => {
    const countries = await findAllCountry()
    const sources = await findAllSources()
    console.log(sources)
    res.render('contributeData', { title: 'Contribute New Data', countries: countries, sources: sources })
})

module.exports = router