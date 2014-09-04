var Users = global.db.get('users');

var Ev = require('../../ev');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
  Ev.getFromUser(req.user.username, req.user.accessToken, true, function(){});
  res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: {}
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
// exports.create = function(req, res, next) {
//     var user = new User(req.body);
//     var message = null;

//     user.provider = 'local';
//     Users.insert(user, function(err) {
//         if (err) {
//             switch (err.code) {
//                 case 11000:
//                 case 11001:
//                     message = 'Username already exists';
//                     break;
//                 default:
//                     message = 'Please fill all the required fields';
//             }

//             return res.render('users/signup', {
//                 message: message,
//                 user: user
//             });
//         }
//         req.logIn(user, function(err) {
//             if (err) return next(err);
//             return res.redirect('/');
//         });
//     });
// };

/**
 * Send User
 */
// exports.me = function(req, res) {
//     res.jsonp(req.user || null);
// };

/**
 * Find user by id
 */
// exports.user = function(req, res, next, id) {
//     Users.findById(id, function(err, user) {
//         if (err) return next(err);
//         if (!user) return next(new Error('Failed to load User ' + id));
//         req.profile = user;
//         next();
//     });
// };

exports.getEvents = function(req, res) {
    var events = {};

     res.render('index', {
       title: 'Wooepa',
       user: req.user ? JSON.stringify(req.user) : 'null',
       fbAppId: global.fbAppId,
       events: events
     });
};

exports.getMyEvents = function(req, res) {
    var events = {};

    res.render('index', {
        title: 'Wooepa',
        user: req.user ? JSON.stringify(req.user) : 'null',
        fbAppId: global.fbAppId,
        events: events
    });
};

exports.getOne = function(req, res) {
  Users.findOne({'facebook.id': parseInt(req.params.uid)}, function(err, data) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.json(data);
    }
  });
};