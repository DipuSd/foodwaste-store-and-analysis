const express = require('express')
const {getLoginByID} = require('../database/loginDao')

const router = express.Router()

router.post('/login', async (req, res)=>{
    try{
        const {contributorID, password} = req.body
        const data = await getLoginByID(contributorID)
        if(data.length == 0){
            res.status(401).json("Invalid contributor id or password")
        }
        else{
            const storedPass = data[0].password
            if(password !== storedPass){
                res.status(401).json("Invalid contributor id or password")
            }
            else{
                res.render('contributordashboard', {contributorID: contributorID})

            }
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json("Internal server Error")    
    }
});