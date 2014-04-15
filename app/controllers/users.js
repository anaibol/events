var Users = global.db.get('users');
/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    // graph.setAccessToken(req.user.accessToken);

    // var query = 'select eid, uid, rsvp_status from event_member where uid = me()';
    // var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM ev WHERE eid in(SELECT eid FROM ev_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
        //var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM ev WHERE eid in(SELECT eid FROM ev_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
    // graph.fql(query, function(err, res) {
    //     console.log(res.data);
    // });


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
exports.create = function(req, res, next) {
    var message = null;

    user.provider = 'local';
    Users.insert(req.body, function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    Users.findById(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};