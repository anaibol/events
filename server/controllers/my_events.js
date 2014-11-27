var Events = global.db.get('events');

exports.getInPromotion = function(req, res)
{
	Events.find({in_promotion:true,start_time:{$gt:new Date()}}, function(err, evs){
		res.json(evs);
	});
};

exports.getMyEvents = function(req, res)
{
	var eids = req.query.evs.split(',');
	var my_evs = [];
	Events.find({start_time:{$gt:new Date()}}, function(err, evs){
			if (err)
				console.log(err);
			if (evs)
			{
				var i = 0;
				var j = 0;
				while (evs[i])
				{
					while (eids[j])
					{
						if (parseInt(eids[j]) == evs[i].eid)
							my_evs.push(evs[i]);
						++j;
					}
					j = 0;
					++i;
				}
				res.json(my_evs);
			}
	});
};