var db = require('monk')(global.config.db);

function getActionResult(action, cb) {

    if (!db) {
        console.log("Database is null");
        cb();
    }

    var Actions = db.get('actions');

    var likes = 0;

    var shares = 0;

    if (action) {
        if (action.data) {
            if (action.data.likes)
                likes = action.data.likes.data.length;
            if (action.data.shares)
                shares = action.data.shares['count'];
        }
    }

    var resultat = (likes + (2 * shares));

    Actions.update({
            _id: action._id
        }, {
            $set: {
                'resultat': resultat
            }
        },
        function(err, event) {
            if (err) {
                console.log(err);
            }
            cb(resultat);
        });
}

function getAllActionsResult(actions, cb) {

    var nb_done = 0;

    var resultat_user = 2;

    console.log("There is " + actions.length + " actions")

    if (actions.length == 0)
        cb(resultat_user);

    for (j = 0; j < actions.length; j++) {
        getActionResult(actions[j], function(resultat, err) {
            nb_done++;
            resultat_user += resultat;
            if (err) {
                console.log(err);
                if (nb_done == actions.length)
                    cb(resultat_user);
            }
            if (nb_done == actions.length)
                cb(resultat_user);
        });
    }

}

function getAttendingBonus(event, user_id, cb) {

    var nb_done = 0;

    var bonus = 0;

    for (j = 0; j < event.attending.length; j++) {
        nb_done++;
        if (event.attending[j] == user_id) {
            console.log("Attending BONUS");
            bonus = 6;
        }
        if (nb_done == event.attending.length)
            cb(bonus);
    }

}

function getActionsResult(event, event_id, user_id, cb) {

    var Actions = db.get('actions');

    var Results = db.get('results');

    console.log("----- EID -----");
    console.log(event.eid);

    Actions.find({
        'event_id': event_id,
        'user_id': user_id
    }, function(err, actions) {
        if (err) {
            console.log(err);
            cb(err);
        } else if (actions) {

            console.log("GETTING");
            console.log(actions.length);
            getAllActionsResult(actions, function(resultat_user, err) {
                if (err)
                    console.log(err);
                console.log("GET ALL ENDED");

                console.log(resultat_user);

                getAttendingBonus(event, user_id, function(attending_bonus) {
                    if (err)
                        console.log(err);
                    resultat_user += attending_bonus;

                    console.log("User: " + user_id + " get " + resultat_user + "point");

                    var new_result = {
                        user_id: user_id,
                        event_id: event.eid,
                        result: resultat_user,
                        result_boosted: resultat_user
                    }

                    Results.findOne({
                        'user_id': new_result.user_id,
                        'event_id': new_result.event_id
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        } else if (result) {
                            Results.update({
                                    'user_id': result.user_id,
                                    'event_id': result.event_id
                                }, {
                                    $set: {
                                        'result': resultat_user,
                                        'result_boosted': resultat_user
                                    }
                                },
                                function(err, result) {
                                    console.log(result);
                                    if (err) {
                                        console.log(err);
                                        cb(err);
                                    } else
                                        cb();
                                });
                        } else {
                            console.log(new_result);
                            Results.insert(new_result, function(err, action) {
                                if (err) {
                                    console.log(err);
                                    cb(err);
                                } else
                                    cb();
                            });
                        }

                    });

                });

            });

        } else
            cb();
    });


}

function resolveGames(event_id, cb) {


    var Events = db.get('events');

    var Actions = db.get('actions');

    var Results = db.get('results');

    Events.findOne({
        'eid': parseInt(event_id)
    }, function(err, event) {
        if (err) {
            console.log(err);
            cb(err);
        } else if (event) {
            var list_players = event.list_event_players;

            var nb_done = 0;

            console.log("Game resolution for the event with id: " + event_id);

            for (i = 0; i < list_players.length; i++) {

                exports.getActionsResult(event, event_id, list_players[i], function(err) {
                    nb_done++;
                    if (err)
                        console.log(err)
                    if (nb_done == list_players.length)
                        cb();
                })

            }
        } else {
            console.log("Event not found");
            cb();
        }
    });

}

module.exports.resolveGames = resolveGames;
module.exports.getActionResult = getActionResult;
module.exports.getActionsResult = getActionsResult;