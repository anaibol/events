
function associatePromoter(db, promoter_id, event_id)
{
	var Users = db.get('users');

	var Events = db.get('events');

	Users.findOne({
        'facebook.id': promoter_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else
        {
        	Events.findOne({
        		'eid': parseInt(event_id)
      		  }, function(err, event) {
        		if (err) {
        			console.log(err);
        		}
       			else
        		{
        			var list_promoter_events = user.list_promoter_events;

        			if (list_promoter_events == null )
        				list_promoter_events = new Array();
        			
        			list_promoter_events.push(parseInt(event_id));

        			var list_event_promoters = event.list_event_promoters;

        			console.log(list_event_promoters);

        			if (list_event_promoters == null )
        				list_event_promoters = new Array();
        			
        			list_event_promoters.push(parseInt(promoter_id));

        			console.log(list_event_promoters);

        			Users.update({_id: user._id}, 
        				{$set: {list_promoter_events: list_promoter_events}}, 
        				function(err, event) {
        					if (err) {
        						console.log(err);
        					}
        				});

        			Events.update({_id: event._id}, 
        				{$set: {list_event_promoters: list_event_promoters}}, 
        				function(err, event) {
        					if (err) {
        						console.log(err);
        					}
        				});

        		}
    		});
        }
    });
}

function associatePlayer(db, player_id, event_id)
{
	var Users = db.get('users');

	var Events = db.get('events');

	Users.findOne({
        'facebook.id': player_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else
        {
        	Events.findOne({
        		'eid': parseInt(event_id)
      		  }, function(err, event) {
        		if (err) {
        			console.log(err);
        		}
       			else
        		{
        			var list_player_events = user.list_player_events;

        			if (list_player_events == null )
        				list_player_events = new Array();
        			
        			list_player_events.push(parseInt(event_id));

        			var list_event_players = event.list_event_players;

        			if (list_event_players == null )
        				list_event_players = new Array();
        			
        			list_event_players.push(parseInt(player_id));

        			Users.update({_id: user._id}, 
        				{$set: {list_player_events: list_player_events}}, 
        				function(err, event) {
        					if (err) {
        						console.log(err);
        					}
        				});

        			Events.update({_id: event._id}, 
        				{$set: {list_event_players: list_event_players}}, 
        				function(err, event) {
        					if (err) {
        						console.log(err);
        					}
        				});
        			
        		}
    		});
        }
    });
}

module.exports.associatePromoter = associatePromoter;
module.exports.associatePlayer = associatePlayer;