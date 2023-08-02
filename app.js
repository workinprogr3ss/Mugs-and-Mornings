// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

PORT = 9215;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Engine
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

// HOME PAGE
app.get('/', function (req, res) {
    res.render('layouts/index');
});


// CUSTOMERS
app.get('/customers', function (req, res) {
    let query1 = "SELECT * FROM `Customers`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/customers', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-customer-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email, phoneNumber, birthday) VALUES ('${data['input-name']}', '${data['input-email']}', ${data['input-phoneNumber']}, ${data['input-birthday']})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/customers');
        }
    })
});

// EMPLOYEES

app.get('/employees', function (req, res) {
    let query1 = "SELECT * FROM `Employees`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/employees', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-employee-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (name, position, email, phoneNumber) VALUES ('${data['input-name']}', ${data['input-position']}, '${data['input-email']}', ${data['input-phoneNumber']})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/employees');
        }
    })
});

// ORDERS

app.get('/orders', function (req, res) {
    let query1 = "SELECT * FROM `Orders`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/orders', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-order-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (customerID, employeeID, dateTime, orderTotal) VALUES ('${data['input-customerID']}', ${data['input-employeeID']}, '${data['input-dateTime']}', ${data['input-orderTotal']})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/orders');
        }
    })
});

// ORDER DETAILS

app.get('/order-details', function (req, res) {
    let query1 = "SELECT * FROM `Order_Details`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/order_details', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-order-details-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Order_Details (orderID, productID, soldQuantity) VALUES ('${data['input-orderID']}', ${data['input-productID']}, '${data['input-soldQuantity']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/order-details');
        }
    })
});

// PRODUCTS

app.get('/products', function (req, res) {
    let query1 = "SELECT * FROM `Products`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/products', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-product-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    //query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    query1 = `INSERT INTO Products (supplierID, name, price, stockQuantity, deliveryDate, description) VALUES ('${data['input-supplierID']}, '${data['input-name']}', '${data['input-price']}', '${data['input-stockQuantity']}', '${data['input-description']} )`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/products');
        }
    })
});

// Suppliers

app.get('/suppliers', function (req, res) {
    let query1 = "SELECT * FROM `Suppliers`;"; // Define query

    db.pool.query(query1, function (error, rows, fields) { // Execute query

        res.render('layouts/suppliers', { data: rows });               // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-supplier-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers (name, email, phoneNumber) VALUES ('${data['input-name']}, '${data['input-email']}', '${data['input-phoneNumber']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/suppliers');
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});