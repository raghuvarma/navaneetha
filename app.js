
//module dependencies
var express = require('express')
  , http = require('http')
  , mysql = require('mysql')
  , path = require('path');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function( req, res) {
	res.render('index');
});
//connect to mysql database
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'navaneetha'
});
connection.connect();
app.get('/users', function (req, res) {
	connection.query('select * from users', function(err, docs) {
	res.render('users', {users: docs});
	});
});
// Add a new User
app.get("/users/new", function (req, res) {
	res.render("new");
});
// Save the Newly created User
app.post("/users", function (req, res) {
	var id=req.body.id,
		name=req.body.name,
		role=req.body.role;
	connection.query('INSERT INTO users (id, name, role) VALUES (? , ?, ?);', [id, name, role], function(err, docs) {
	if (err) res.json(err);
	
	res.redirect('users');
	});
});


var home = require('./routes/home');

app.get("/about", home.about);

app.get("/departments", home.departments);

app.get("/users", home.users);

//app.get("/doctors", home.doctors);

app.get("/doctors", function(req, res){
	connection.query('select * from users where(role="doctor")', function(err, docs) {
		res.render('doctors', {doctors: docs});
	});
  //res.render('doctors', { title: 'Welcome to Navaneetha Homeo Hospital' });
});

app.get("/managers", function(req, res){
	connection.query('select * from users where(role="manager")', function(err, docs) {
		res.render('managers', {managers: docs});
	});
  //res.render('doctors', { title: 'Welcome to Navaneetha Homeo Hospital' });
});

app.get("/admins", function(req, res){
	connection.query('select * from users where(role="Admin")', function(err, docs) {
		res.render('admins', {admins: docs});
	});
  //res.render('doctors', { title: 'Welcome to Navaneetha Homeo Hospital' });
});

app.get("/contact", home.contact);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
