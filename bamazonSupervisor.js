const inquirer = require("inquirer");
const mysql=require("mysql");
const cTable = require("console.table");

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
  inquirer.prompt([
    {
      type:'list',
      choices:['View Product Sales by Department','Create New Department'],
      message:'Choose what would you like to do?',
      name:'option'
    }
  ]).then(({option}) => {
    if(option === "Create New Department"){
      getDeptDetails();
    }else{
      display("PS");
    }
  });
};

// Get and Save, Dept
const getDeptDetails =()=>{
  inquirer.prompt([
    {
      name:'department_name',
      message:'Department Name ?'
    },{
      name:'over_head_costs',
      message:'Enter Overhead Costs ?',
      default:'0',
      validate:function(input){
        return !isNaN(input);
      }
    }
  ])
  .then((userInput) => {
    let deptData = {
      department_name : userInput.department_name,
      over_head_costs :userInput.over_head_costs
    };
 
    createDept(deptData);
  });
}

//save Department
const createDept = (deptData) =>{
  const sQuery ="INSERT INTO departments SET ?";
 
  const query = db.query(sQuery, deptData , function(err, dbResult){
    if(err) throw err;
    console.log(`${dbResult.affectedRows} department inserted!\n`);
    display("D");
  });
}

// Product sales by dept
const display = (mode) => {
  let sQuery ="";
  if(mode === 'PS'){
    sQuery = "SELECT department_name AS 'Department Name',sum(product_sales) AS 'Total Sales' FROM products GROUP BY department_name";
  }else{
    sQuery = "SELECT * FROM departments";
  }
   
  const query = db.query(sQuery, function(err,data){
    if(err) throw err;
    console.table(data);
    doAgain();
  });
};

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


module.exports ={
  start:start
}