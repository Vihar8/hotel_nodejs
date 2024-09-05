const express = require ("express");


const MenuItem = require('../models/MenuItem');
const router = express.Router();

//this is for menu get and post of menu
router.post('/',  async(req, res) => {
    try{
         const menudata = req.body;
         const newMenu = new MenuItem(menudata);
         const response = await newMenu.save();
         console.log('data saved');
         res.status(200).json(response);
 
    }
    catch{
     console.log(err);
     res.status(500).json({error: 'enternal server error'});
    }
 })
 
 router.get('/', async (req, res) => {
     try{
         const menudata = await MenuItem.find();
         console.log('data saved');
         res.status(200).json(menudata);
     }
     catch(err){
         console.log(err);
         res.status(500).json({error: 'enternal server error'});
     }
 
 })

 router.get('/:tasteType', async(req, res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await MenuItem.find({taste: tasteType});

            console.log('response fetched' );
            res.status(200).json(response);

        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'enternal server error'})
    }
 })
 
 router.put('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            console.log('menu not found');
        }

        console.log('menu updated');
        res.status(200).json(response);


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
 })


router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            console.log('menu not found');
        }
        console.log('menu deleted');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

 
 module.exports = router;