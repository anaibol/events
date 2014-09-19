
var graph = require('fbgraph');

/* La fonction retrieveAction va chercher dans le Flux d'actualité de l'utilisateur d'id user_id tous 
les posts qui sont en rapport avec 'wooepa' et les enregistre dans la table action */
function updatePicture(user)
{

	if (!db)
	{
		console.log("Database is null");
		return ;
	}

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