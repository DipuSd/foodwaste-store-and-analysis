const express = require('express')
const {getLoginByID} = require('../database/loginDao')

const router = express.Router()

router.get('/:id', async (req, res)=>{
    try{
        const data = await getLoginByID(req.params.id)
        if(data.length == 0){
            res.status(401).json("Invalid id or password")
        }
        else{
            res.send(data)

        }
    }
    catch(error){
        console.log(error)
        res.status(500).json("Internal server Error")    
    }
});


module.exports = router