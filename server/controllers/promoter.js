
var Users = global.db.get('users');

var Events = global.db.get('events');

exports.promoteEvent = function(req, res)
{
    Events.findOne({'eid': parseInt(req.params.eid)},function(err, ev){
        if (err)
        {
            console.log(err);
        }
        else if (ev)
        {
            var promotion = {
                reward: req.body.reward,
                end_date: new Date(parseInt(req.body.end_date)),
                commentary: req.body.commentary
            };
            ev.promoter = req.user;
            ev.promotion = promotion;
            ev.in_promotion = true;
            Events.update({'eid': parseInt(req.params.eid)}, ev, function(err, ev){
                if (err)
                    console.log(err);
            })
        }
    });
}

exports.associatePromoter = function(req, res)
{
	Users.findOne({
        'facebook.id': req.user.facebook.id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else if (user)
        {
        	Events.findOne({
        		'eid': parseInt(req.params.eid)
      		  }, function(err, event) {
        		if (err) {
        			console.log(err);
        		}
       			else if (event)
        		{
        			if (!user.list_promoter_events || user.list_promoter_events.indexOf(req.params.eid) == -1)
        			{
        				Users.update({_id: user._id}, 
	        				{$push: {'list_promoter_events': req.params.eid}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        				});
        			}
        			if (!event.list_event_promoters || event.list_event_promoters.indexOf(req.user.facebook.id) == -1)
        			{
        				Events.update({_id: event._id}, 
	        				{$push: {'list_event_promoters': req.user.facebook.id}}, 
	        				function(err, event) {
	        					if (err) {
	        						console.log(err);
	        					}
	        					res.json(event);
	        				});
        			}
        			if ((user.list_promoter_events && user.list_promoter_events.indexOf(req.params.eid) != -1) &&
        				(event.list_event_promoters && event.list_event_promoters.indexOf(req.user.facebook.id) != -1)) {
        				console.log("Promoter: L'association existe déja");
        				res.json({'Erruer': "Promoter: L'association existe déja"});
        			}
        				
        		}
        		else {
        			console.log("Promoter: Aucun événement trouvé pour l'id " + event_id);
        			res.json({'Erreur' : "Promoter: Aucun événement trouvé pour l'id " + event_id});
        		}
    		});
        }
        else {
        	console.log("Promoter: Aucun événement trouvé pour l'id " + event_id);
        	res.json({'Erreur' : "Promoter: Aucun événement trouvé pour l'id " + event_id});
        }
        	
    });
}