const mongoose = require('mongoose'); //  to use mongoose 

const bcrypt = require('bcrypt'); // to bcryt the password i use bcr
const validator = require('validator'); //  for validtaor like email 
const userschema = new mongoose.Schema({
    username : {
        type: String,
        required : [true , 'username is requierd'],
        minlength: 3,

    },
    email :{
        type : String,
        required : [true , 'email is required'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, " please provide a valid email"]
    },
    password : {
        type : String,
        required : [true, 'please provide password'],
        minlength : [9 , 'password must be at list 9 character long'],
        message: 'password must contain at least one number and one special character'
        
    },
   


   
   role : {
    type : String,
    required: true,
    enum : ['student', 'proffesor']
   },

    

});

userschema.pre('save',async function(next){ // ye route se phle chalega but only in update and save 
    if(!this.isModified('password')) { // password modified tu nhi hai na 
        return next();
    }
   this.password = await bcrypt.hash(this.password, 10); // hash kr rha hai 10 rounds mein  
   //this.confirmPassword = undefined; // undefine kr dyia hai taki vo store na hu 
    next()    ;

})

const user  = mongoose.model('user', userschema);
module.exports = user;