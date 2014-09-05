
function createTree(db, event_id) {

	if (!db)
    {
        console.log("Database is null");
        return ;
    }

	var Actions = db.get('actions');

    Actions.find({
        'event_id': event_id,
    }, function(err, actions) {
        if (err) {
        	console.log(err);
        }
       	else if (actions)
        {
            for (i = 0; i < actions.length; i++) {
            	console.log(i + ": " + actions[i].post_id);

				 if (actions[i].data && actions[i].data.from && actions[i].data.from.id != actions[i].user_id)
				 {
				 	console.log("Post: " + actions[i].post_id);
				 	console.log("From" + actions[i].data.from.id);

				 	Actions.find({
						'event_id': event_id,
						'user_id': actions[i].data.from.id
					}, function(err, actions) {
					if (err) {
						console.log(err);
					}
					else if (actions)
					{
						var best = 0;

						console.log("Post of user:");
						for (j = 0; j < actions.length; j++) {
							console.log("Post:" + actions[j].post_id);
							if (actions[best].resultat <= actions[j].resultat)
							{
								if (actions[best].resultat == actions[j].resultat)
									if (actions[best].resultat.creation_date < actions[j].resultat.creation_date)
										best = j;
								else
									best = j;
							}
						}
						console.log(actions[best]);
					}
					});
				 }
            }
        }
    });
}

module.exports.createTree = createTree;
