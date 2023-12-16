const express = require('express')
const router = express.Router()

const { findOneContributorInfoById, findContributionCountByContributorId } = require('../database/contributroDao')
const { findAllCountry } = require('../database/countryDao')
const { findAllWasteCategory } = require('../database/wasteCategoryDao')
const { saveNewFoodWasteData } = require('../database/foodWasteDataDao')

router.get("/dashboard", async (req, res) => {
    let contributor = req.session.contributor
    let contributorInfo = await findOneContributorInfoById(contributor.contributorID)
    let contributionCount = await findContributionCountByContributorId(contributor.contributorID)
    contributorInfo.contributionCount = contributionCount
    res.render('contributorDashboard', { title: "Welcome " + contributorInfo.firstName + " " + contributorInfo.lastName, contributorInfo: contributorInfo })
});

router.get('/new', async (req, res) => {
    const countries = await findAllCountry()
    const wasteCategories = await findAllWasteCategory()

    // getting any messages found in previous request
    let success = req.session?.success
    let error = req.session?.error

    // clearing session variables
    req.session.success = undefined
    req.session.error = undefined

    res.render('contributeData', { title: 'Contribute New Data', success: success, error: error, countries: countries, wasteCategories: wasteCategories })
})

router.post('/new', async (req, res) => {
    const contributorID = req.session?.contributor?.contributorID;

    if (!contributorID) {
        req.session.error = "Contributor ID not found in session"
        res.redirect('/contribute/new')
        return
    }

    let foodWasteData = req.body
    // setting contributor id into request body
    foodWasteData.contributorID = contributorID
    saveNewFoodWasteData(foodWasteData)
    req.session.success = "Data created successfully"
    // redirecting to get endpoint form
    res.redirect('/contribute/new')
})

module.exports = router