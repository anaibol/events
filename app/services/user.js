
var graph = require('fbgraph');

function updatePicture(user)
{

	var Users = db.get('users');

	graph.get('/' + user.facebook.id + '?fields=picture' + '&access_token=' + user.accessToken, function(err, result) {
      if (err)
        console.log(err);
      else if (result)
      {
      	Users.update(
      		{_id: user._id}, 
      		{$set: {'facebook.picture': result.picture.data.url}}, function (err) {
      			if (err)
      				console.log(err);
      		});
      }
    });
}

module.exports.updatePicture = updatePicture;