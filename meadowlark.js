/**
 * Created by Sviridov on 03.06.2016.
 */
var express = require('express');
var exphbs  = require('express-handlebars');
var fortune = require('./lib/fortune.js');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function(req, res){
    res.render('about', { fortune: fortune.getFortune() });
});
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});
// custom 404 page
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

app.use(function(req, res){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function () {
    console.log('Express started on http://localhost:'+ app.get('port')+ '; press Ctrl+C to terminate');
});
