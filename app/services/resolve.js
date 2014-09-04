
function getActionResult(db, action) {

    if (!db)
    {
        console.log("Database is null");
        return ;
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
                            });

    return (resultat);
}

function resolveGames(db, event_id) {

    if (!db)
    {
        console.log("Database is null");
        return ;
    }

	var Events = db.get('events');

	var Actions = db.get('actions');

    var Results = db.get('results');

	Events.findOne({
        'eid': parseInt(event_id)
      }, function(err, event) {
        if (err) {
        	console.log(err);
        }
       	else if (event)
        {
            var list_players = event.list_event_players;

            console.log("Game resolution for the event with id: " + event_id);

            for (i = 0; i < list_players.length; i++) {

            	Actions.find({
        			'event_id': event_id,
        			'user_id' : list_players[i]
      				}, function(err, actions) {
        				if (err) {
        					console.log(err);
        				}
       					else if (actions)
                        {
                            var resultat_user = 0;

                            for (j = 0; j < actions.length; j++) {
                                resultat_user += getActionResult(db, actions[j]);
                            }
                            console.log("User: " + actions[0].user_id + " get " + resultat_user + "point");

                        var result = {
                            user_id: actions[0].user_id,
                            event_id: event_id,
                            result: resultat_user
                        }

                        Results.insert(result, function(err, action) {
                            if (err) {
                                console.log(err);
                            }
                        });

                        }
    			});

            }
        }
        else
            console.log("Event not found");
    });

}

module.exports.resolveGames = resolveGames;
module.exports.getActionResult = getActionResult;
