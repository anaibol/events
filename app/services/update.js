
var graph = require('fbgraph');

function updatePost(db, post)
{
	if (!db)
	{
		console.log("Database is null");
		return ;
	}

	var Users = db.get('users');

	var Actions = db.get('actions');

	Users.findOne({
        'facebook.id': post.user_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else if (user)
        {
			graph.get('/' + post.post_id + '?access_token=' + user.accessToken, function(err, result) {
        		if (err) {
           			console.log(err);
           			console.log("The post with id: " + post.post_id + " have been deleted");
           			Actions.update({_id: post._id}, 
	        			{$set: {"active": false}}, 
	        			function(err, action) {
	        			if (err) {
	        				console.log(err);
	        			}
	        		});
        		}
        		else if (result)
       			{
        			Actions.update({_id: post._id}, 
	        			{$set: {data: result}}, 
	        			function(err, action) {
	        			if (err) {
	        				console.log(err);
	        			}
	        			console.log("Update done for the post with id: " + post.post_id);
	        		});
        		}
        		else
        			console.log("The post with id: " + post.post_id + " have been deleted");
    		});

        }
    });
}

function updateActions(event_id, db)
{
	if (!db)
	{
		console.log("Database is null");
		return ;
	}

	var Actions = db.get('actions');

	Actions.find({
        'event_id': event_id
      }, function(err, actions) {
        if (err) {
        	console.log(err);
        }
        else if (actions && actions.length > 0)
        {
        	console.log("Updating " + actions.length + " actions for the event with id: " + event_id);
			for (i = 0; i < actions.length; i++)
				updatePost(db, actions[i]);
        }
        else
        	console.log("Nothing to do");
    });
}

module.exports.updateActions = updateActions;
module.exports.updatePost = updatePost;