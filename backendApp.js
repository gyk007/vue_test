var express = require('express');

var app = express();
 

app.get('/auth', function(req, res) {
  	 
});

app.get('/about', function(req, res) {
  	res.render('about');
});

app.get('/projects', function(req, res) {
  	res.render('projects');
});

app.get('/contact', function(req, res) {
  	res.render('contact');
});

app.get('/single', function(req, res) {
  	res.render('single');
}); 


app.listen(7000)
