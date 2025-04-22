const jwt = require('jsonwebtoken'); //  ye asehi hai 
const bcrypt = require('bcrypt'); // password verfiy ke liye chiye login mein 

const user = require('../models/user'); // user ka model require hai 
const { createToken } = require('../util/jwttoken')// ye token genrate ke liye use kr rha hu 
// 
exports.login = async(req,res) =>{
    try{
        const { username , password} =  req.body;
        const user1 = await user.findOne({username});
        if(!user1){  // user nahi hai tu signup pr redirect
            return res.status(401).render('/signup', {
                message: 'user not registerd. please signup.'
            });
        }
        const valid = await bcrypt.compare(password , user1.password); // password check kr rha hai  boolen value return krega 
        if (!valid) {
          return res.status(401).json({
              success: false,
              message: 'Invalid credentials'
          });
      }
          const token = createToken(user1._id);
            return res.status(202).json({

              success: true,
      message: 'Login successful',
      token,
      user: {
        id: user1._id,
        username: user1.username,
        email: user1.email,
        role: user1.role
              
            }
        })
         // token genrae krrha hai 
        // res.cookie('token',token , {http: false , expires: new Date(date.now()+ 60*60*1000)});
        // res.render('dashboard');
    }
    catch (err){
      res.send('invalid credetinals')      
    }
}
exports.signup = async (req, res) => {
    try {
      const { username, email, password, confirmPassword, role } = req.body;
      if (password !== confirmPassword) return res.status(404).send('Passwords do not match');
      
      const user1 = new user({ username, email, password, role }); // create mogoose instance
      await user1.save();
      res.status(200).json({
        message: "user signed succefully",
       
      });
    } catch (err) {
      res.send('Signup failed: ');
    }
  };