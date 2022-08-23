var express = require('express');

var app = express();

//Request our blogController
var blogController = require('./controllers/blogController.js');

//set up view engine
app.set('view engine','ejs');

//set up static files
app.use(express.static('./public'));

//fire controller
blogController(app);

//set up port
app.listen(3000);
console.log('Green light ready');
