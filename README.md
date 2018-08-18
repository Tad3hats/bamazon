# bamazon

In this homework assignment, I have created an Amazon-like storefront with the MySQL skills that I learned in the past week. The app will display an inventory, take in orders from customers, deplete stock from the store's inventory, and display an online purchase receipt.

Please note this is not a web browser facing application.  It relies on MySQL running on a local machine acting as the server, and the console acts as the client.

Once the database is initiated, the user can invoke "node bamazonCustomer.js" to begin.  
When the user starts in the console, they are shown a product inventory list.
They are prompted to select an item to buy and specify how many items to buy.
If there is enough inventory remaining, then the item's inventory is updated accordingly. 

The first screenshot here shows a successful purchase.  A receipt is displayed with the total sales price paid. 
####screenshot1 (receipt):
![Image of Yaktocat](https://github.com/Tad3hats/bamazon/blob/master/bamazon_screenshot1.png)

The second screenshot shows the error message if there is not enough inventory to cover the requested purchase.
####screenshot2 (insufficient quantity):
![Image of ](https://github.com/Tad3hats/bamazon/blob/master/bamazon_screenshot2.png)

The last screenshot shows what happens when the user decides to quit shopping.
####screenshot3 (Next steps and quitting):
![Image of ](https://github.com/Tad3hats/bamazon/blob/master/bamazon_screenshot3.png)
