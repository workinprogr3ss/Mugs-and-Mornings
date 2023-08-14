// App.js

/*
    SETUP
*/
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 9215; // Set a port number at the top so it's easy to change in the future

// Database
var db = require("./database/db-connector");

// Engine
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// HOME PAGE
app.get("/", function (req, res) {
  res.render("layouts/index");
});

// CUSTOMERS
app.get("/customers", function (req, res) {
  // Declare query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.name === undefined) {
    query1 = "SELECT * FROM `Customers`;"; // Define query
  }

  // If there is a query string, we assume this is a search and return desired results
  else {
    query1 = `SELECT * FROM Customers WHERE name LIKE "${req.query.name}%"`;
  }

  // Query 2 is the same in both cases
  let query2 = "SELECT * FROM `Customers`;"; // Define query

  // Run Query 1
  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    let customers = rows;

    // Run Query 2
    db.pool.query(query2, (error, rows, fields) => {
      let people = rows;

      return res.render("layouts/customers", {
        data: customers,
        people: people,
      });
    }); // Render the customers.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
}); // received back from the query

app.post("/add-customer-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Customers (name, email, phoneNumber, birthday) VALUES ('${data["input-name"]}', '${data["input-email"]}', ${data["input-phoneNumber"]}, ${data["input-birthday"]})`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/customers");
    }
  });
});

app.delete("/delete-customer-ajax", function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
  let setCustomerNull = `UPDATE Orders SET customerID = NULL WHERE customerID = ?`;

  // Run the 1st query
  db.pool.query(setCustomerNull, [customerID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(
        deleteCustomer,
        [customerID],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

app.put("/put-customer-ajax", function (req, res, next) {
  let data = req.body;

  let customerID = parseInt(data.id);

  let name = data.name;
  let email = data.email;
  let phoneNumber = data.phoneNumber;
  let birthday = data.birthday;

  let queryUpdateCustomer = `UPDATE Customers SET name = ?, email = ?, phoneNumber = ?, birthday = ? WHERE Customers.customerID = ?`;
  let selectCustomer = `SELECT * FROM Customers WHERE customerID = ?`;

  // Run the 1st query
  db.pool.query(
    queryUpdateCustomer,
    [name, email, phoneNumber, birthday, customerID],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      }

      // If there was no error, we run our second query and return that data so we can use it to update the people's
      // table on the front-end
      else {
        // Run the second query
        db.pool.query(
          selectCustomer,
          [customerID],
          function (error, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.send(rows);
            }
          }
        );
      }
    }
  );
});

// EMPLOYEES

app.get("/employees", function (req, res) {
  // Declare query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.employee === undefined) {
    query1 = "SELECT * FROM `Employees`;"; // Define query
  }

  // If there is a query string, we assume this is a search and return desired results
  else {
    query1 = `SELECT * FROM Employees WHERE name LIKE "${req.query.employee}%"`;
  }

  // Query 2 is the same in both cases
  let query2 = "SELECT * FROM `Employees`;"; // Define query

  // Run Query 1
  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    let employees = rows;

    // Run Query 2
    db.pool.query(query2, (error, rows, fields) => {
      let people = rows;

      return res.render("layouts/employees", {
        data: employees,
        people: people,
      });
    });
  });
});

app.post("/add-employee-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Employees (name, position, email, phoneNumber) VALUES ('${data["input-name"]}', '${data["input-position"]}', '${data["input-email"]}', ${data["input-phoneNumber"]})`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/employees");
    }
  });
});

app.delete("/delete-employee-ajax", function (req, res, next) {
  let data = req.body;
  let employeeID = parseInt(data.id);
  let deleteEmployee = `DELETE FROM Employees WHERE employeeID = ?`;
  let setEmployeeNull = `UPDATE Orders SET employeeID = NULL WHERE employeeID = ?`;

  // Run the 1st query
  db.pool.query(setEmployeeNull, [employeeID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(
        deleteEmployee,
        [employeeID],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

// ORDERS

app.get("/orders", function (req, res) {
  // Declare query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.order === undefined) {
    query1 = "SELECT * FROM `Orders`;";
  }

  // If there is a query string, we assume this is a search and return desired results
  else {
    query1 = `SELECT * FROM Orders WHERE orderID = ${req.query.order}`;
  }

  let query2 = "SELECT * FROM `Orders`;"; // Define query 2

  // Run Query 1
  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    let orders = rows;

    // Run Query 2
    db.pool.query(query2, (error, rows, fields) => {
      let order = rows;

      return res.render("layouts/orders", { data: orders, order: order });
    });
    // Render the customers.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.post("/add-order-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Orders (customerID, employeeID, dateTime, orderTotal) VALUES ('${data["input-customerID"]}', ${data["input-employeeID"]}, '${data["input-dateTime"]}', ${data["input-orderTotal"]})`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/orders");
    }
  });
});

app.delete("/delete-order-ajax", function (req, res, next) {
  let data = req.body;
  let orderID = parseInt(data.id);
  let deleteOrder = `DELETE FROM Orders WHERE orderID = ?`;
  //let setOrderNull = `UPDATE Order_Details SET orderID = NULL WHERE orderID = ?`;

  // Run the 1st query
  db.pool.query(deleteOrder, [orderID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// ORDER DETAILS

app.get("/order-details", function (req, res) {
  let query1 = "SELECT * FROM `Order_Details`;"; // Define query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    res.render("layouts/order_details", { data: rows }); // Render the customers.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.post("/add-order-details-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Order_Details (orderID, productID, soldQuantity) VALUES ('${data["input-orderID"]}', ${data["input-productID"]}, '${data["input-soldQuantity"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/order-details");
    }
  });
});

// PRODUCTS

app.get("/products", function (req, res) {
  // Declare query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.product === undefined) {
    query1 = "SELECT * FROM `Products`;";
  }

  // If there is a query string, we assume this is a search and return desired results
  else {
    query1 = `SELECT * FROM Products WHERE name LIKE "${req.query.product}%"`;
  }

  let query2 = "SELECT * FROM `Products`;"; // Define query 2

  // Run Query 1
  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    let products = rows;

    // Run Query 2
    db.pool.query(query2, (error, rows, fields) => {
      let product = rows;

      return res.render("layouts/products", {
        data: products,
        product: product,
      });
    });
    // Render the products.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.post("/add-product-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Products (supplierID, name, price, stockQuantity, deliveryDate, description) VALUES (${data["input-supplierID"]}, '${data["input-name"]}', '${data["input-price"]}', '${data["input-stockQuantity"]}', '${data["input-deliveryDate"]}','${data["input-description"]}' )`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/products");
    }
  });
});

app.delete("/delete-product-ajax", function (req, res, next) {
  let data = req.body;
  let productID = parseInt(data.id);
  let deleteProduct = `DELETE FROM Products WHERE productID = ?`;
  //let setProductNull = `UPDATE Order_Details SET productID = NULL WHERE productID = ?`;

  // Run the 1st query
  db.pool.query(deleteProduct, [productID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// Suppliers

app.get("/suppliers", function (req, res) {
  // Declare query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.supplier === undefined) {
    query1 = "SELECT * FROM `Suppliers`;";
  }

  // If there is a query string, we assume this is a search and return desired results
  else {
    query1 = `SELECT * FROM Suppliers WHERE name LIKE "${req.query.supplier}%"`;
  }

  let query2 = "SELECT * FROM `Suppliers`;"; // Define query 2

  // Run Query 1
  db.pool.query(query1, function (error, rows, fields) {
    // Execute query

    let suppliers = rows;

    // Run Query 2
    db.pool.query(query2, (error, rows, fields) => {
      let supplier = rows;

      return res.render("layouts/suppliers", {
        data: suppliers,
        supplier: supplier,
      });
    });
    // Render the suppliers.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.post("/add-supplier-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log("data is", data);

  // Create the query and run it on the database
  query1 = `INSERT INTO Suppliers (name, email, phoneNumber) VALUES ('${data["input-name"]}', '${data["input-email"]}', '${data["input-phoneNumber"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/suppliers");
    }
  });
});

app.delete("/delete-supplier-ajax", function (req, res, next) {
  let data = req.body;
  let supplierID = parseInt(data.id);
  let deleteSupplier = `DELETE FROM Suppliers WHERE supplierID = ?`;
  let setSupplierNull = `UPDATE Products SET supplierID = NULL WHERE supplierID = ?`;

  // Run the 1st query
  db.pool.query(setSupplierNull, [supplierID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(
        deleteSupplier,
        [supplierID],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
    PORT +
    "; press Ctrl-C to terminate."
  );
});
