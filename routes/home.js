

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to Navaneetha Homeo Hospital' });
};

exports.about = function(req, res){
  res.render('about', { title: 'Welcome to Navaneetha Homeo Hospital' });
};

exports.departments = function(req, res){
  res.render('departments', { title: 'Welcome to Navaneetha Homeo Hospital' });
};

exports.users = function(req, res){
  res.render('users', { title: 'Welcome to Navaneetha Homeo Hospital' });
};

/*exports.doctors = function(req, res){
  res.render('doctors', { title: 'Welcome to Navaneetha Homeo Hospital' });
};*/

exports.contact = function(req, res){
  res.render('contact', { title: 'Welcome to Navaneetha Homeo Hospital' });
};

