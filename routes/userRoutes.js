const express = require ("express");


const User = require('../models/user');
const router = express.Router();

router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
         console.log('register successfully');
         res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})


module.exports = router;