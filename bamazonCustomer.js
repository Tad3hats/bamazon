var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    show();
});


function show() {
    console.clear();
    console.log("Hi, welcome to BAMAZON, where you can buy all sorts of stuff ")
    console.log("=====================================");
    console.log("Here is our current inventory: ")
    console.log("-------------------------------------");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(
                `id: ${results[i].item_id} | ${results[i].product_name} ......Price: ${results[i].price} ....Qty: ${results[i].stock_quantity}`
            )
        }
        console.log("=====================================");
        buy();

    })
}

function buy() {

    // query the database for all items for sale
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // console.log(results);
        //         // once you have the items, prompt the user to make their selection
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {

                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;

                    },
                    message: "Select the ID of the product you would like to buy"
                },
                {
                    name: "howmany",
                    type: "input",
                    message: "How many would you like to buy?"

                }
            ])
            .then(function (answer) {
                // console.log(answer.choice);
                // console.log(answer.howmany);

                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                // console.log(chosenItem.stock_quantity);

                //check to see what impact the purchase will have on the inventory
                var newProductCount = (chosenItem.stock_quantity - answer.howmany);

                var totalCost = (answer.howmany * chosenItem.price);

                if (newProductCount > 0) {
                    // console.log(newProductCount);

                    // if the stock_quantity is not 0 , then update db, 
                    //let the user know, and start over

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newProductCount
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;

                        });
                    console.log("======================");    
                    console.log("Receipt:")
                    console.log("You have successfully purchased " + answer.howmany + " " + chosenItem.product_name + "(s) for a total of $" + totalCost+ "!");
                    console.log("Thanks for shopping at BAMAZON!");
                    console.log("======================");
                    nextSteps();
                }

                if (newProductCount < 1) {
                    // if inventory =0 apologize and start over
                    console.log("sorry, we are all out of inventory for this item.  Please select another item");
                    nextSteps();
                }
            });
    });
}

//prompt the customer for next steps

function nextSteps() {
    inquirer
        .prompt({
            name: "next",
            type: "rawlist",
            message: "What would you like to do next?",
            choices: [
                "Continue shopping",
                "Check inventory",
                "Quit"
            ]
        })
        .then(function (answer) {
            switch (answer.next) {
                case "Continue shopping":
                    buy();
                    break;

                case "Check inventory":
                    show();
                    break;
                case "Quit":
                    quit();
                    break;
            }
        })
};


function quit() {
    console.log("Thanks for shopping at BAMAZON.  Come again soon!");
    process.exit(0);
};