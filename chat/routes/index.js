var express = require('express');
var router = express.Router();



var users = {};


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
	if(req.cookies.user == null) {
		res.redirect('/signin');
	} else {
		res.sendfile('views/index.html');
	}
});

router.get('/signin', function(req, res) {
	res.sendfile('views/signin.html')
});

router.post('/signin', function(req, res) {
	if (users[req.body.name]) {
		res.redirect('/signin'); 
		//user name existed, back to signin, require user create a new username
	} else {
		res.cookie('user', req.body.name, {maxAge: 1000*60*60*24*30});
		res.redirect('/');
	}
});


module.exports = router;
