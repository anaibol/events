
function resolveBoost(db, event_id) {

	if (!db)
    {
        console.log("Database is null");
        return ;
    }

	var Boosts = db.get('boosts');

	Boosts.find({
		'event_id': event_id
	}, function(err, boosts) {
		if (err)
			console.log(err);
		else if (boosts)
		{
			for (i = 0; i < boosts.length; i++) {
				
			}
		}
	});

}