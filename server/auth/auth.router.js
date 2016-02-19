'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('../api/users/user.model');
var crypto = require('crypto');
var iterations = 1;
var bytes = 64;

var hashedPassword = function(password) {
	var salt = crypto.randomBytes(16);
	var buffer = crypto.pbkdf2Sync(password, salt, iterations, bytes);
	var hash = buffer.toString('base64');
	// User.findOne()
	// if(password === )
	return hash
}


router.post('/login', function (req, res, next) {

	User.findOne(req.body.email)
	.then(function(user) {
		if(hashedPassword(user.password) === hashedPassword(req.body.password)) {
				User.findOne(req.body).exec()
				.then(function (user) {
					// if (!user) throw HttpError(401);
					req.login(user, function () {
						res.json(user);
					});
				})
			}
		else {
			throw HttpError(401);
		}	
	})
	.then(null, next)
})


router.post('/signup', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		req.login(user, function () {
			res.status(201).json(user);
		});
	})
	.then(null, next);
});

router.get('/me', function (req, res, next) {
	res.json(req.user);
});

router.delete('/me', function (req, res, next) {
	req.logout();
	res.status(204).end();
});

router.use('/google', require('./google.oauth'));

router.use('/twitter', require('./twitter.oauth'));

router.use('/github', require('./github.oauth'));

module.exports = router;