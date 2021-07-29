const express = require('express');
const router = express.Router();
const connection = require('./../modules/dbConnection');

// Home Route
router.get('/', (req, res) => {
    connection.connection.query("SELECT * FROM `book`", (err, result) => {
        if (err) throw err;
        console.log(result[0]);

        connection.connection.query("SELECT DISTINCT `author` FROM `book`", (err, author) => {
            if (err) throw err;
            console.log(result[0]);

            connection.connection.query("SELECT DISTINCT `category` FROM `book`", (err, category) => {
                if (err) throw err;
                console.log(result[0]);
                return res.render('home', { _title: 'Inventory Management System', bookData: result, author, category });
            })

        })

    })
})

// filter data by 
router.post('/', (req, res) => {
    let filterData = req.body.filterData;

    if (req.body.filter == "category") {  // filter data by category
        connection.connection.query("SELECT * FROM `book` WHERE `category`=?", [filterData], (err, result) => {
            if (err) throw err;

            connection.connection.query("SELECT DISTINCT `author` FROM `book`", (err, author) => {
                if (err) throw err;

                connection.connection.query("SELECT DISTINCT `category` FROM `book`", (err, category) => {
                    if (err) throw err;

                    return res.render('home', { _title: 'Inventory Management System', bookData: result, author, category });
                })

            })

        })
    }
    else {
        if (req.body.filter == "author") {  // filter data by author
            connection.connection.query("SELECT * FROM `book` WHERE `author`=?", [filterData], (err, result) => {
                if (err) throw err;

                connection.connection.query("SELECT DISTINCT `author` FROM `book`", (err, author) => {
                    if (err) throw err;

                    connection.connection.query("SELECT DISTINCT `category` FROM `book`", (err, category) => {
                        if (err) throw err;
                        return res.render('home', { _title: 'Inventory Management System', bookData: result, author, category });
                    })

                })

            })
        }
        else {  // forward to home route to display all data
            return res.redirect('/');
        }
    }
})


// new book entry landing page
router.get('/add-new', (req, res) => {
    connection.connection.query("SELECT DISTINCT `category` FROM `book`", (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.render('addBook', { _title: 'Add New Books', category: result });
    })
})

// new book entry Route
router.post('/add-new', (req, res) => {
    data = {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    connection.connection.query("INSERT INTO `book` SET ?;", [data], (err, result) => {
        if (err) throw err;
        return res.send("Data Recorded Sucessfully");
    })
})


// delete a single entry 
router.post('/delete', (req, res) => {
    id = req.body.id;
    connection.connection.query("DELETE FROM `book` WHERE `id`=?;", [id], (err, result) => {
        if (err) throw err;
        return res.send("Entry Removed Sucessfully");
    })
})


// update quantity of single entry 
router.post('/edit-quantity', (req, res) => {
    id = req.body.id;
    quantity = req.body.quantity;
    connection.connection.query("UPDATE `book` SET `quantity`=? WHERE `id`=?;", [quantity, id], (err, result) => {
        if (err) throw err;
        return res.send("Entry Updated Sucessfully");
    })
})


module.exports = router;