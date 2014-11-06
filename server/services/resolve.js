var db = require('monk')(global.config.db);
var Game = require('./game.js');
var Up = require('./retrieve.js');
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
            console.log(action.data);
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

    var resultat_user = 0;

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
Results.findOne({user_id:user_id,event_id:event_id},function(err,results){
        if (!results)
        {
            Results.insert({user_id:user_id,event_id:event_id, result:0, result_boosted:0, score:0});
        }
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
                Results.findOne({user_id:user_id, event_id:event_id}, function(err, result){
                    if (result)
                    {
                        result.score *= -1;
                        Game.AddPoints(user_id, event_id, result.score)
                    }
                    Results.update({user_id:user_id,event_id:event_id},{$set:{score:resultat_user}});
                    Game.AddPoints(user_id, event_id, resultat_user);
                });
            });
        }
    });
});}


function resolveGames(event_id) {


    var Events = db.get('events');

    var Actions = db.get('actions');

    var Results = db.get('results');

Up.retrieveForEvent(event_id, function(cb){

});
    Events.findOne({
        'eid': parseInt(event_id)
    }, function(err, event) {
        if (err) {
            console.log(err);
        } else if (event) {
            var list_players = event.list_event_players;

            var nb_done = 0;

            console.log("Game resolution for the event with id: " + event_id);
            for (i = 0; list_players && i < list_players.length; i++) {

                exports.getActionsResult(event, event_id, list_players[i], function(err) {
                    nb_done++;
                    if (err)
                        console.log(err)
                });

            }
        } else {
            console.log("Event not found");
        }
    });
}

module.exports.resolveGames = resolveGames;
module.exports.getActionResult = getActionResult;
module.exports.getActionsResult = getActionsResult;