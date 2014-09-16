
var graph = require('fbgraph');

function updatePost(db, post, cb)
{
	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	var Users = db.get('users');

	var Actions = db.get('actions');

	Users.findOne({
        'facebook.id': post.user_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
            cb(err);
        }
        else if (user)
        {
			graph.get('/' + post.user_id + '_' + post.post_id + '?access_token=' + user.accessToken, function(err, result) {
        		if (err) {
           			console.log(err);
           			console.log("The post with id: " + post.post_id + " have been deleted");
           			Actions.update({_id: post._id}, 
	        			{$set: {"active": false}}, 
	        			function(err) {
	        			if (err)
	        				console.log(err);
	        		});
                    cb(err);
        		}
        		else if (result)
       			{
        			Actions.update({_id: post._id}, 
	        			{$set: {data: result}}, 
	        			function(err, action) {
	        			if (err) {
	        				console.log(err);
                            cb(err);
	        			}
                        else {
	        			    console.log("Update done for the post with id: " + post.post_id);
                            cb();
                        }
	        		});
        		}
        		else
                    cb();
    		});

        }
        else
            cb();
    });
}

function updateActions(db, event_id, cb)
{
	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	var Actions = db.get('actions');

	Actions.find({
        'event_id': event_id
      }, function(err, actions) {
        if (err) {
        	console.log(err);
            cb(err);
        }
        else if (actions && actions.length > 0)
        {
        	console.log("Updating " + actions.length + " actions for the event with id: " + event_id);

            var nb_done = 0;

			for (i = 0; i < actions.length; i++) {
				updatePost(db, actions[i], function(err) {
                    nb_done++;
                    if (err)
                        console.log(err);
                    if (nb_done == actions.length)
                        cb();
                });
            }
        }
        else {
        	console.log("Nothing to do");
            cb();
        }
    });

}

module.exports.updateActions = updateActions;
module.exports.updatePost = updatePost;