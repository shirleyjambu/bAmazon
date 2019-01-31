const inquirer = require("inquirer");
var customer = require("./bamazonCustomer");
var manager = require("./bamazonManager");
var supervisor = require("./bamazonSupervisor");

var startGlobal = () => {
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
        console.log("Back from Customer");
        break;
      case 'Manager':
        manager.start();
        console.log("Back from Customer");
        break;
      case 'Supervisor':
        supervisor.start();
        break;
      case 'Exit':  
        process.exit(0);
    }
  }).catch((err)=>{
    console.log(err);
  });
}

startGlobal();