var graph = require('fbgraph');

var Ev = require('../../ev.js');

var Pro = require('../services/promoter.js');

function unique(array) {
  var result = [];

  for (i = 0; i < array.length; i++) {
    if (!(array[i] in result))
      result.push(array[i]);
  }

  return (result);
}

//! Function to retrieve action for users and events

//Elle enregistre tout les post dans le flux d'actualité renvoyer par la requete request
function searchPost(db, request, date_end, cb) {

	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	//console.log(request);

	var Actions = db.get('actions');

	var less_than_2_months = 1;

	graph.get(request, function(err, result) {
					
					if (result.data == null)
					{
						console.log("Invalid");
						cb();
					}
					else if (err) {
					    console.log(err);
					    cb(err);
					}
					else
					{

						var data = result.data;

						for(i = 0; i < data.length && less_than_2_months; i++)
						{
							var date_str = JSON.stringify(data[i].created_time).substring(1, 11);

							var hour_str = JSON.stringify(data[i].created_time).substring(13, 20);

							var date_splited = date_str.split('-');

							var hour_splited = hour_str.split(':');

							var created_time_obj = new Date(
								date_splited[0], date_splited[1], date_splited[2],
								hour_splited[0], hour_splited[1], hour_splited[2]);

							if (created_time_obj < date_end)
							{
								less_than_2_months = 0;
								cb();
							}
							else if(data[i].caption)
							{
								if (data[i].caption.indexOf("www.wooepa.com") != -1)
								{
									var link_splited = data[i].link.split('/');

									var id = data[i].id.split('_');

									var event_id = link_splited[link_splited.length - 1];

									Pro.associatePlayer(id[0], event_id);

									var action = {
										user_id: id[0],
										post_id: id[1],
										event_id: event_id,
										type: "post",
										creation_date: created_time_obj,
										active: true,
										data: data[i]
									}

									Actions.insert(action, function(err) {
								    	if (err)
								        	console.log(err);
								    });
								}
							}
						}

						if (less_than_2_months)
						{
							//console.log("Next page...");
							if (result.paging && result.paging.next)
								searchPost(db, result.paging.next, date_end, function(err) {
									if (err)
										console.log(err);
									cb();
								});
							else {
								cb();
							}
						}

					}
		  		});

}

function searchPostForEvent(db, request, date_end, eid, cb) {

	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	//console.log(request);

	var Actions = db.get('actions');

	var less_than_2_months = 1;

	graph.get(request, function(err, result) {
					
					if (result.data == null)
					{
						console.log("Invalid");
						cb();
					}
					else if (err) {
					    console.log(err);
					    cb(err);
					}
					else
					{

						var data = result.data;

						for(i = 0; i < data.length && less_than_2_months; i++)
						{
							var date_str = JSON.stringify(data[i].created_time).substring(1, 11);

							var hour_str = JSON.stringify(data[i].created_time).substring(13, 20);

							var date_splited = date_str.split('-');

							var hour_splited = hour_str.split(':');

							var created_time_obj = new Date(
								date_splited[0], date_splited[1], date_splited[2],
								hour_splited[0], hour_splited[1], hour_splited[2]);

							if (created_time_obj < date_end)
							{
								less_than_2_months = 0;
								cb();
							}
							else if(data[i].caption)
							{
								if (data[i].caption.indexOf("www.wooepa.com") != -1)
								{
									var link_splited = data[i].link.split('/');

									var id = data[i].id.split('_');

									var event_id = link_splited[link_splited.length - 1];

									if (event_id == eid) {
										Pro.associatePlayer(id[0], event_id);

										var action = {
											user_id: id[0],
											post_id: id[1],
											event_id: event_id,
											type: "post",
											creation_date: created_time_obj,
											active: true,
											data: data[i]
										}

										Actions.insert(action, function(err) {
									    	if (err)
									        	console.log(err);
									    });
									}
								}
							}
						}

						if (less_than_2_months)
						{
							//console.log("Next page...");
							if (result.paging && result.paging.next) {
								searchPostForEvent(db, result.paging.next, date_end, eid, function(err) {
									if (err)
										console.log(err);
									cb();
								});
							}
							else
								cb();
						}

					}
		  		});

}


/* La fonction retrieveAction va chercher dans le Flux d'actualité de l'utilisateur d'id user_id tous 
les posts qui sont en rapport avec 'wooepa' et les enregistre dans la table action */
function retrieveActions(user_id, db, cb)
{
	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	var Users = db.get('users');

	Users.findOne({
        'facebook.id': user_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        	cb(err);
        }
        else if (user)
        {
			var date_end = new Date();

			date_end.setMonth(date_end.getMonth() - 2);

			var request = '/' + user_id + '/feed' + '?access_token=' + user.accessToken;

			searchPost(db, request, date_end, function(err) {
				if (err)
					console.log(err);
				console.log("End for: " + user_id);
				cb();
			});

        }
        else
        	cb();
    });
}

function retrieveEventActions(db, user_id, event_id, cb)
{
	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	var Users = db.get('users');

	Users.findOne({
        'facebook.id': user_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        	cb(err);
        }
        else if (user)
        {
			var date_end = new Date();

			date_end.setMonth(date_end.getMonth() - 2);

			var request = '/' + user_id + '/feed' + '?access_token=' + user.accessToken;

			var requestAttending

			searchPostForEvent(db, request, date_end, event_id, function(err) {
				if (err)
					console.log(err);
				console.log("End for: " + user_id);
				cb();
			});

        }
        else
        	cb();
    });
}

function retrieveForEvent(db, event_id, cb) {

	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	var Events = db.get('events');

  	Events.findOne({'eid': parseInt(event_id)}, function(err, event) {
	    if (err) {
	    	console.log(err);
	    	cb(err);
	    }
	    else if (event) {
	    	console.log("Retrieve for event: " + event.name);

	    	var list_players = exports.unique(event.list_event_players);

	    	var nb_done = 0;

	    	for (i = 0; i < list_players.length; i++) {
	    		console.log(list_players[i]);
	    		retrieveEventActions(db, list_players[i], event_id, function(err) {
	    			nb_done++;
	    			if (err)
	    				console.log(err)
	    			if (nb_done == list_players.length)
	    				cb();
	    		});

	      	}
	    }
	    else
	    	cb();

  	});

}

function retrieveEventAttendingUser(db, user_id, cb) {
	graph.get(request , function(err, result) {
		if (err)
			console.log(err);
		console.log(result)
	});
}

module.exports.retrieveEventAttendingUser = retrieveEventAttendingUser;
module.exports.retrieveActions = retrieveActions;
module.exports.retrieveForEvent = retrieveForEvent;
module.exports.unique = unique;
