const express = require('express')
const router = express.Router()

const { findOneContributorInfoById, findContributionCountByContributorId } = require('../database/contributroDao')

router.get("/dashboard", async (req, res) => {
    let contributor = req.session.contributor
    let contributorInfo = await findOneContributorInfoById(contributor.contributorID)
    let contributionCount = await findContributionCountByContributorId(contributor.contributorID)
    contributorInfo.contributionCount = contributionCount
    res.render('contributorDashboard', { title: "Welcome " + contributorInfo.firstName + " " + contributorInfo.lastName, contributorInfo: contributorInfo })
});

module.exports = router