const inquirer = require("inquirer");
var customer = require("./bamazonCustomer");

var start = () => {
  inquirer.prompt([
    {
      message:"Login as :",
      type:'list',
      choices:['Customer','Manager','Supervisor','Exit'],
      name:'option'
    }
  ]).then(({option}) => {
    switch(option){
      case 'Customer':
        customer.start();
      case 'Manager':
        break;
      case 'Supervisor':
        break;
      case 'Exit':  
        process.exit(0);
    }
  }).catch((err)=>{
    console.log(err);
  });
}

start();