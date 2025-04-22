const express =  require("express");
const authrouter =  express.Router(); // router bnane ke liye
const authController = require('../controllers/authcontroller'); //  this contain signup controller and login controller
const authMiddleware = require('../middlewares/authmiddleware');/// verfiy tooken to jrurt nhi hai 
// this route use for just give you login page 
authrouter.get("/", (req,res)=> {
    res.status(200);

});

// this route is use to give you signup page 
authrouter.get('/signup',(req,res)=>{
    res.status(200);

})
//this route is use for to give you login data and create token
authrouter.post("/", authController.login);

// this route is use for to store it data succefully 
authrouter.post("/signup",authController.signup );
module.exports = authrouter; // export and take by app.js 

