var Events = global.db.get('events');

exports.getInPromotion = function(req, res)
{
	Events.find({in_promotion:true,start_time:{$gt:new Date()}}, function(err, evs){
		res.json(evs);
	});
};

exports.getMyEvents = function(req, res)
{
	Events.find({$and:[{start_time:{$gt: new Date()}}, {attending:parseInt(req.params.uid)}]}).success(function(evs){
		res.json(evs);
	});
};
