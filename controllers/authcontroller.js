const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const user = require('../models/user');
const { createToken } = require('../util/jwttoken')

exports.login = async(req,res) =>{
    try{
        const { username , password} =  req.body;
        const user1 = await user.findone({username});
        if(!user1){
            return res.status(401).render('/signup', {
                message: 'user not registerd. please signup.'
            });
        }
        const valid = await bcrypt.compare(password , user1.password);
        if(!valid){
            return res.render('login');
        }
        const token = createtoken(user.id);
        res.cookie('token',token , {http: false , expires: new Date(date.now()+ 60*60*1000)});
        res.render('some');
    }
    catch (err){
      res.send('invalid credetinals')      
    }
}
exports.signup = async (req, res) => {
    try {
      const { username, email, password, confirmPassword, role } = req.body;
      if (password !== confirmPassword) return res.send('Passwords do not match');
      
      const user1 = new User({ username, email, password, role });
      await user1.save();
      res.redirect('/login');
    } catch (err) {
      res.send('Signup failed: ');
    }
  };