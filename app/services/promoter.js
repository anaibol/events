
var config = require('../../config/config');

var db = require('monk')(config.db);

function associatePromoter(promoter_id, event_id)
{

	var Users = db.get('users');

	var Events = db.get('events');

	Users.findOne({
        'facebook.id': promoter_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else if (user)
        {
        	Events.findOne({
        		'eid': parseInt(event_id)
      		  }, function(err, event) {
        		if (err) {
        			console.log(err);
        		}
       			else if (event)
        		{
        			if (!user.list_promoter_events || user.list_promoter_events.indexOf(event_id) == -1)
        			{
        				Users.update({_id: user._id}, 
	        				{$push: {'list_promoter_events': event_id}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        				});
        			}
        			if (!event.list_event_promoters || event.list_event_promoters.indexOf(promoter_id) == -1)
        			{
        				Events.update({_id: event._id}, 
	        				{$push: {'list_event_promoters': promoter_id}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        				});
        			}
        			if ((user.list_promoter_events && user.list_promoter_events.indexOf(event_id) != -1) &&
        				(event.list_event_promoters && event.list_event_promoters.indexOf(promoter_id) != -1))
        				console.log("Promoter: L'association existe déja");

        		}
        		else
        			console.log("Promoter: Aucun événement trouvé pour l'id " + event_id);
    		});
        }
        else
        	console.log("Promoter: Aucun utilisateur trouvé pour l'id " + promoter_id);
    });
}

function associatePlayer(player_id, event_id)
{

	var Users = db.get('users');

	var Events = db.get('events');

	Users.findOne({
        'facebook.id': player_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else if (user)
        {
        	Events.findOne({
        		'eid': parseInt(event_id)
      		  }, function(err, event) {
        		if (err) {
        			console.log(err);
        		}
       			else if (event)
        		{
                    console.log("Association entre l'event d'id: " + event_id + " et l'user d'id: " + player_id);
                    
        			if (!user.list_player_events || user.list_player_events.indexOf(event_id) == -1)
        			{
	        			Users.update({_id: user._id}, 
	        				{$push: {'list_player_events': event_id}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        				});
	        		}
	        		if (!event.list_event_players || event.list_event_players.indexOf(player_id) == -1)
	        		{
	        			Events.update({_id: event._id}, 
	        				{$push: {'list_event_players': player_id}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        				});
        			}
        			if ((user.list_player_events && user.list_player_events.indexOf(event_id) != -1) &&
        				(event.list_event_players && event.list_event_players.indexOf(player_id) != -1))
        				console.log("Player: L'association existe déja");
        			
        		}
        		else
        			console.log("Player: Aucun événement trouvé pour l'id " + event_id);
    		});
        }
        else
        	console.log("Player: Aucun utilisateur trouvé pour l'id " + player_id);
    });
}

module.exports.associatePromoter = associatePromoter;
module.exports.associatePlayer = associatePlayer;