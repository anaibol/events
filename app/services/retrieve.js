var graph = require('fbgraph');

var Ev = require('../../ev.js');

//! Function to retrieve action for users and events

function searchPost(db, request, date_end) {

	console.log(request);

	var Actions = db.get('actions');

	var less_than_2_months = 1;

	var result_of_get = graph.get(request, function(err, result) {
					
					if (result.feed == null)
					{
						console.log("Invalid");
						console.log(result);
						return ;
					}
					if (err) {
					    console.log(err);
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
								console.log("End");
								less_than_2_months = 0;
							}
							else if(data[i].caption)
							{
								if (data[i].caption.indexOf("www.wooepa.com") != -1)
								{
									var link_splited = data[i].link.split('/');

									var id = data[i].id.split('_');

									var event_id = link_splited[link_splited.length - 1];

									var action = {
										user_id: id[0],
										post_id: id[1],
										event_id: event_id,
										type: "Post",
										creation_date: created_time_obj,
										data: data[i]
									}

									Actions.insert(action, function(err) {
								    if (err)
								        console.log(err);
								    else
								        console.log(action);
								    });
								}
							}
						}

						if (less_than_2_months)
						{
							console.log("Next page...");
							searchPost(db, result.paging.next, date_end);
						}

					}
		  		});

}

function retrieveActions(user_id, db)
{
	var Users = db.get('users');

	Users.findOne({
        'facebook.id': user_id
      }, function(err, user) {
        if (err) {
        	console.log(err);
        }
        else
        {
        	var less_than_2_months = 1;

        	var accessToken = user.accessToken;

			var date_end = new Date();

			var request = '/' + user_id + '/feed' + '?access_token=' + accessToken;

			date_end.setMonth(date_end.getMonth() - 2);

			searchPost(db, request, date_end);

        }
    });
}

module.exports.retrieveActions = retrieveActions;
