const express = require('express');
const router = express.Router();
const connection=require('./../modules/dbConnection');

router.get('/',(req,res)=>{
    return res.render('home');
})

module.exports=router;