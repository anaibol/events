global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');
console.log(global.config.db);
global.config.db = global.config.db.replace("localhost", "wooepa.com") //passer en prod BD
//export NODE_ENV=test pour être sur la base de donnée de tests.

console.log(global.config.db);

//console.log(global.config);

var db = require('monk')(config.db);

var Events = db.get('events');

var Dateminuit = new Date();

  Dateminuit.setSeconds(0);
  Dateminuit.setMinutes(0);
  Dateminuit.setHours(0);

// Date d'aujourd'hui à minuit
console.log(Dateminuit);

// Lives
Events.count({$or: [{ start_time: { $gt: Dateminuit }}, {end_time: { $gt: Dateminuit }}]},function(e, count){
  console.log("Nombre d'event live EN VIE " + count)
});

// Importé depuis hier matin
Events.count({ saved: { $gt: Dateminuit }},function(e, count){
	console.log("Nombre d'event importés aujourd'hui après minuit : " + count);
  if(e){
  console.log("erruer est : " + e);
   }
});

// une semaine plus tôt
var DateUneSemaine = new Date();
DateUneSemaine.setHours(-168);
console.log(DateUneSemaine);

// Importé depuis une semaine
Events.count({ saved: { $gt: DateUneSemaine }},function(e, count){
  console.log("Nombre d'event importés depuis une semaine : " + count)
});






//var pays = new Array();
// var Quoi = {
// 	pays: ["France", "Germany", "The United States"], 
// combien: [0,0,0]
// };

// Events.find({ saved: { $gt: Dateminuit }}, function(err, tousEvents) {
//           if (err) {
//             res.render('error', {
//               status: 500
//             });
//           } else if (tousEvents)
//           {console.log("okey");
//            for (var i = 0; i<tousEvents.length; i++) {
//            		for (var j =0; j<Quoi.pays.length; j++){
//            			if ( tousEvents[i].venue.country == Quoi.pays[j]){
//            				Quoi.combien[j]+=1;
//            				//console.log(Quoi.combien[j]);
//            			}

//            	}
//            }
           	   

//            	for (i=0; i<3; i++){
// 			 console.log(Quoi.pays[i] + " haha yen a -> " + Quoi.combien[i] + "\n");
// }
// }
//        }
//        ); 



