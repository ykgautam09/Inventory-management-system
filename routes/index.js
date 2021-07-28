const express = require('express');
const router = express.Router();
const connection = require('./../modules/dbConnection');

router.get('/', (req, res) => {
    connection.connection.query("SELECT * FROM `book`",(err,result)=>{
        if (err) throw err;
        console.log(result[0]);
        return res.render('home',{_title:'Inventory Management System',bookData:result});
    })
    // return res.render('home',{_title:'Inventory Management System'});
})

module.exports = router;