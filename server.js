var express = require('express');

var app = express(); 
app.use(express.static(__dirname + '/WWW'));

app.listen(80);