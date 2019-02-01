# bAmazon

Using Node.js & MySQL
Uses inquirer, mysql, console.table npm's

## Instructions

# Customer View
1. The user is prompted asking to choose the items for sale with details of Product Name, Price and Available Quantity displayed.

2. Once he chooses an item, the user is prompted for a quantity. Once the user enters the quantity, it is checked against the available stock, if it is lesser an appropriate message is displayed.

3. If the available stock is more than the quantity entered, the products table will be updated and the cost price will be displayed. The cost is also added to the product's product_sales column.


# Manager View 

1. The application provides these options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app  lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it  lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.

# Supervisor View 

Logging in as Supervisor will list these set of menu options:

   * View Product Sales by Department
   
   * Create New Department

 * When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in their terminal/bash window. 

 * The Create New Department allows the user create a new Department.

 Video Link:
 https://drive.google.com/file/d/13DY1BXfnVtHsPTHPATKW1_PxjtaXpAiu/view

