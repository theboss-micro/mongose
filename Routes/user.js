const express = require ('express')
const user = require('../Models/user')
const router = express.Router()



router.post('/',(req,res)=>{
    const newUser = new user({...req.body})
    newUser
    .save()
    .then(user=>res.status(200).json({msg:"successfuly added", user}))
    .catch(err=> res.status(400).json(err))

})

module.exports = router