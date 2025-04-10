const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv= require('dotenv');
const authRoutes = require('./routes/authroutes');
const fileRoutes = require('./routes/fileRoutes');
const dashboard = require('./routes/dashboard');
dotenv.config();

const app = express();

// database connection here
mongoose.connect('mongodb://127.0.0.1:27017/academichub')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Middleware---------
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/layouts'));
// for parse -------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Routes---------
app.use('/login', authRoutes);
app.use('/files', fileRoutes);
app.use('/dashboard',dashboard);

port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
