const express = require('express');
const router = express.Router();
const connection = require('./../modules/dbConnection');

// Home Route
router.get('/', (req, res) => {
    connection.connection.query("SELECT * FROM `book`",(err,result)=>{
        if (err) throw err;
        console.log(result[0]);
        return res.render('home',{_title:'Inventory Management System',bookData:result});
    })
})

router.post('/', (req, res) => {
    connection.connection.query("SELECT * FROM `book`",(err,result)=>{
        if (err) throw err;
        console.log(result[0]);
        return res.render('home',{_title:'Inventory Management System',bookData:result});
    })
})


// new book entry Route
router.get('/add-new', (req, res) => {
    connection.connection.query("SELECT DISTINCT `category` FROM `book`",(err,result)=>{
        if (err) throw err;
        console.log(result);
        return res.render('addBook',{_title:'Add New Books',category:result});
    })
})

router.post('/add-new', (req, res) => {
    console.log(req.body.category,'))))))))');
    data={
        name:req.body.name,
        author:req.body.author,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        quantity:req.body.quantity,       
    };
    console.log(data);
    connection.connection.query("INSERT INTO `book` SET ?;",[data],(err,result)=>{
        if (err) throw err;
        console.log(result);
        return res.send("Data Recorded Sucessfully");
    })
})

router.post('/delete', (req, res) => {
    console.log(req.body.id,'))))))))');
    id=parseInt(req.body.id)+1;  // id started from 1 in sql table
    console.log(id);
    connection.connection.query("DELETE FROM `book` WHERE `id`=?;",[id],(err,result)=>{
        if (err) throw err;
        console.log(result);
        return res.send("Entry Removed Sucessfully");
    })
})


module.exports = router;