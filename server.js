const express = require("express");
const routes = require("./routes");
const server = express();
const exphbs = require('express-handlebars');

server.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

server.set('view engine', 'hbs');
server.use(express.json());
server.use(express.static(__dirname + '/public'));
server.use(routes);

module.exports = server;