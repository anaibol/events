
function getActionResult(db, action, cb) {

    if (!db)
    {
        console.log("Database is null");
        cb();
    }

    var Actions = db.get('actions');

    var likes = 0;

    var shares = 0;

    if (action)
    {
        if (action.data)
        {
            if (action.data.likes)
                likes = action.data.likes.data.length;
            if (action.data.shares)
                shares = action.data.shares['count'];
        }
    }

    var resultat = (likes + (2 * shares));

    Actions.update({_id: action._id}, 
                            {$set: {'resultat': resultat}}, 
                            function(err, event) {
                                if (err) {
                                    console.log(err);
                                }
                                cb();
                            });

    return (resultat);
}

function getActionsResult(db, event_id, user_id, cb) {

    if (!db)
    {
        console.log("Database is null");
        cb();
    }

    var Actions = db.get('actions');

    var Results = db.get('results');

                Actions.find({
                    'event_id': event_id,
                    'user_id' : user_id
                    }, function(err, actions) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        }
                        else if (actions)
                        {
                            var resultat_user = 2;

                            for (j = 0; j < actions.length; j++) {
                                resultat_user += getActionResult(db, actions[j], function(err) {
                                    if (err)
                                        console.log(err);
                                });
                            }
                            
                            console.log("User: " + user_id + " get " + resultat_user + "point");

                            var result = {
                                user_id: user_id,
                                event_id: event_id,
                                result: resultat_user,
                                result_boosted: resultat_user
                            }

                            Results.findOne({
                                'user_id': result.user_id, 
                                'event_id': result.event_id
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                    cb(err);
                                }
                                else if (result)
                                {
                                    Results.update({
                                        'user_id': result.user_id, 
                                        'event_id': result.event_id
                                    },
                                        {$set: {'result': resultat_user, 'result_boosted': resultat_user}}, 
                                        function(err, event) {
                                            if (err) {
                                                console.log(err);
                                                cb(err);
                                            }
                                            else
                                                cb();
                                    });
                                }
                                else
                                {
                                    Results.insert(result, function(err, action) {
                                        if (err) {
                                            console.log(err);
                                            cb(err);
                                        }
                                        else
                                            cb();
                                    });
                                }

                            });

                        }
                        else
                            cb();
                });


}

function resolveGames(db, event_id, cb) {

    if (!db)
    {
        console.log("Database is null");
        cb();
    }

	var Events = db.get('events');

	var Actions = db.get('actions');

    var Results = db.get('results');

	Events.findOne({
        'eid': parseInt(event_id)
      }, function(err, event) {
        if (err) {
        	console.log(err);
            cb(err);
        }
       	else if (event)
        {
            var list_players = event.list_event_players;

            var nb_done = 0;

            console.log("Game resolution for the event with id: " + event_id);

            for (i = 0; i < list_players.length; i++) {

            	exports.getActionsResult(db, event_id, list_players[i], function(err) {
                    nb_done++;
                    if (err)
                        console.log(err)
                    if (nb_done == list_players.length)
                        cb();
                })

            }
        }
        else {
            console.log("Event not found");
            cb();
        }
    });

}

module.exports.resolveGames = resolveGames;
module.exports.getActionResult = getActionResult;
module.exports.getActionsResult = getActionsResult;
