const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');
const db = mysql.createConnection(
  {
    host:"localhost", port : 3306, user :"root", password: "password", database:"bamazon"
  }
);

db.connect((err) =>{
  if(err)throw err;
  //start();
});

const start = () =>{
  let itemFetcher = new Promise((resolve, reject) => {
    db.query("select * from products",(err,data)=>{
      if(err){
        reject(new Error(err));
      } 
    
      let items = [];
      for(let i=0;i< data.length;i++)
      {
        var itemData = {
          name : data[i].product_name + ", $" + data[i].price + ", Avl: "+ data[i].stock_quantity,
          value : {
            item_id:data[i].item_id,
            product_name: data[i].product_name,
            department_name: data[i].department_name,
            price: data[i].price,
            stock_quantity: data[i].stock_quantity,
            product_sales: data[i].product_sales
          }
        }

        items.push(itemData);
        resolve(items);
      }
    });  
});

itemFetcher.then((items) => {
    inquirer.prompt([
        {
          type: 'list',
          message: 'Choose an item to Buy:',
          choices: items,
          name: "item"
      },{
        name:"quantity",
        message:"Enter Quantity:",
        validate :function(input){
          return !isNaN(input);
        } 
      }]).then(function(userInput) {
        
        if(userInput.item.stock_quantity < userInput.quantity){
          console.log("Insufficient Quantity!");
          doAgain();
        }else{
          let quantity = userInput.item.stock_quantity - userInput.quantity;
          let cost = userInput.quantity * userInput.item.price;
          let pSales = userInput.item.product_sales + cost;
        
          updateProducts(quantity, userInput.item.item_id, cost, pSales);
        }
    });
});

itemFetcher.catch((err)=>{
  console.log(err);
});
}
  
const updateProducts = (quantity, item_id, cost, pSales) =>{
  const uWhere = {item_id};
  const uSet = {stock_quantity:quantity, product_sales:pSales};
  const uQuery = " UPDATE products SET ? WHERE ?";

  const query = db.query(uQuery, [uSet,uWhere], function(err,updatedProductDb){
     if(err) throw err;
     console.log(query.sql);
     console.log(`${updatedProductDb.affectedRows} Product items updated!`);
     console.log('Your Total Price : ' + cost);
     doAgain();
   } )
}

const doAgain = () =>{
  inquirer.prompt([
    {
      type:'confirm',
      message: 'Do you want to continue?',
      name:'userConfirm'
    }
  ]).then(({userConfirm}) => {
    if(userConfirm){
      start();
    }else{
      process.exit(0);
    }
  });
}

module.exports = {
  start: start
};