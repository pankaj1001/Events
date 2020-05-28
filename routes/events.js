const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Events = require('../models/Events');
const checkAuth = require('../middleware/check_auth');


router.get('/:userId',checkAuth,(req,res,next)=>{
    // Retrieves all events of a user 


    //console.log(res.userData);
    if(res.userData.userId!=req.params.userId){
        res.status(404).json({
            msg:'Not Authorized'
        })
    }
    Events.find({ user_id:req.params.userId }).exec()
    .then((result)=>{
        res.status(200).json({
            result,
            length:result.length
        })
    })
    .catch(err=>{
        res.status(404).json({
            err
        })
    })
})


router.post('/:userId',checkAuth,(req,res,next)=>{
    // API to create new Event
    if(res.userData.userId!=req.params.userId){
        res.status(404).json({
            msg:'Not Authorized'
        })
    }

    let event = new Events({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        user_id:req.params.userId,
        desc:req.body.desc
    })
    event.save().then(()=>{
        res.status(200).json({
            msg:'Event Added'
        })
    })
    .catch(err=>{
        res.status(404).json({
            msg:'Error Occured'
        })
    })
})

router.get('/:userId/:id',checkAuth,(req,res,next)=>{
    // API to retrieve one Event using its id
    if(res.userData.userId!=req.params.userId){
        res.status(404).json({
            msg:'Not Authorized'
        })
    }
    Events.findById(req.params.id).exec()
    .then((result)=>{
        res.status(200).json({
            data:result
        })
    })
    .catch(err=>{
        res.status(404).json({
            err
        })
    })
})

router.patch('/:userId/:id',checkAuth,(req,res,next)=>{
    // API to update an event
    if(res.userData.userId!=req.params.userId){
        res.status(404).json({
            msg:'Not Authorized'
        })
    }
    const updateOps={};
    updateOps.name=req.body.name;
    updateOps.desc=req.body.desc;
    Events.findByIdAndUpdate(req.params.id,updateOps).exec()
    .then((result)=>{
        res.status(200).json({
            result
        })
    })
    .catch(err=>{
        res.status(404).json({
            err
        })
    })
})

router.delete('/:userId/:id',checkAuth,(req,res,next)=>{
    // API to delete an event
    if(res.userData.userId!=req.params.userId){
        res.status(404).json({
            msg:'Not Authorized'
        })
    }
    Events.findByIdAndRemove(req.params.id).exec()
    .then((result)=>{
        res.status(200).json({
            result
        })
    })
    .catch(err=>{
        res.status(404).json({
            err
        })
    })
})

module.exports = router;