const express = require('express');
const mongoose = require('mongoose');
//const hbs = require('hbs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv= require('dotenv');
const authRoutes = require('./routes/authroutes');
console.log(authRoutes);
//const fileRoutes = require('./routes/fileRoutes');//n use
const dashboard = require('./routes/dashboard');
console.log(dashboard);
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();


// database connection here
mongoose.connect('mongodb://127.0.0.1:27017/academichub')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Middleware---------
 //no need //app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views'));
//hbs.registerPartials(path.join(__dirname, 'views/layouts')); for future use if needed

// for parse -------
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Routes---------
app.use('/auth', authRoutes); 

app.use('/dashboard',dashboard);

port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
