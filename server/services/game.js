var Results = db.get('results');
var Invitations = db.get('invitations');

function AddPoints(uid, eid, point)
{
	Results.findOne({user_id:uid,event_id:eid},function(err,results){
		if (results)
		{
			Results.update({user_id:uid,event_id:eid},{$inc:{result:point,result_boosted:point}});
			console.log("Result value is '" + point + "' points");
		}
	});
}

function calcPoints(eid, uid, uids)
{
	Invitations.findOne({user_id:uid,event_id:eid},function(err,inv){
		if (err)
			console.log(err);
		var total = inv.invited.length * 3;
		inv.score *= -1;
		AddPoints(uid, eid, inv.score)
		Invitations.update({user_id:uid,event_id:eid},{user_id:uid, event_id:eid, invited: inv.invited, score:total});
		AddPoints(uid, eid,total);
	});
}

function giveInvitePoints(eid, uid, uids)
{
	var tabuids = new Array();
	tabuids = uids.split(',');
	Results.findOne({user_id:uid,event_id:eid},function(err,results){
		if (!results)
		{
			Results.insert({user_id:uid,event_id:eid, result:0, result_boosted:0, score:0});
		}
		Invitations.findOne({user_id: uid, event_id: eid}, function(err, inv){
			if (!inv)
			{
				Invitations.insert({user_id:uid,event_id:eid,score:0,invited:tabuids});
			}
			Invitations.update({user_id:uid, event_id:eid},{$addToSet:{invited:{$each:tabuids}}});
			Invitations.findOne({user_id: uid, event_id: eid}, function(err, inv){
				if (inv)
				{	
					calcPoints(eid, uid, uids);
				}
			});
		});
	});
}

function getAttendingBonus2(event, uid) {

    var nb_done = 0;

    var bonus = 0;
    if (event.attending)
    {
    	for (j = 0; j < event.attending.length; j++) {
        	nb_done++;
        	if (event.attending[j] == uid) {
            	console.log("Attending BONUS");
            	bonus = 6;
        	}
        	if (nb_done == event.attending.length)
            	AddPoints(uid, event.eid, 6)
    	}
    }

}

module.exports.giveInvitePoints= giveInvitePoints;
module.exports.AddPoints=AddPoints;