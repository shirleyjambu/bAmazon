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
  start();
});

const start =() => {
  inquirer.prompt([
    {
      type:'list',
      choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product'],
      name:'option',
      message:'Choose what you like to do:'
    }
  ])
  .then(({option})=>{
    switch(option){
      case 'View Products for Sale':
        products('S');
        break;
      case 'View Low Inventory':
        products('L');
        break;
      case 'Add to Inventory':
        addToInventory();
        break;
      case 'Add New Product':
        getProductDetails();
        break;
    }
  });
}

const products =(mode)=>{
  var pQuery = "select * from products";
  if(mode === 'L'){
    pQuery = "select * from products where stock_quantity < 5"
  }
  
  const query = db.query(pQuery,(err,data)=>{
    if(err) throw err;
    
    console.table(data);
  });
  console.log(query.sql);
}

const getProductDetails =()=>{
  inquirer.prompt([
    {name:'product_name', message:'Product Name?'},
    {name:'department_name',message:'Department Name?', default:'Misc'},
    {name:'price',message:'Enter price ?',
      validate: function (input){
        return !isNaN(input);
      }},
    {
      name:'stock_quantity',
      message:'Enter Quantity ?',
      validate: function (input){
        return !isNaN(input);
      }
    }
]).then((userInput)=>{
  addProduct(userInput);
});
}

// Add New Product
const addProduct = (userInput) => {
  const itemData = {
      product_name: userInput.product_name,
      department_name: userInput.department_name,
      price: userInput.price,
      stock_quantity : userInput.stock_quantity
  }; 
    
  var query = db.query(
    "INSERT INTO products SET ?", itemData,
     function (err, dbResult) {
      if(err) throw err;
      console.log(`${dbResult.affectedRows} item inserted!\n`);
       //getUserInput();
    });
};


// User input for Inventory
// Get Products from DB
const addToInventory = ()=>{
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
            stock_quantity: data[i].stock_quantity
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
        type:'list',
        choices:items,
        name:'item',
        message:'Choose item to add inventory'
      },
      {
        name:'stock_quantity',
        message:'Enter quantity ?',
        validate:function(input){
          return !isNaN(input);
        }
      }
    ]).then((userInput)=>{
        const uWhere = {item_id : userInput.item.item_id};
        const uSet = {stock_quantity : userInput.stock_quantity};
        const query = 
        db.query("UPDATE products SET ? WHERE ?", [uSet,uWhere], function(err,updatedProductDb){
          if(err) throw err;
          console.log(query.sql);
          console.log(`${updatedProductDb.affectedRows} Product items updated!`);
          //getUserInput();
        } )
    }).catch((err)=>{
      if(err) throw err;
    });
});

itemFetcher.catch((err)=>{
  console.log(err);
});
}