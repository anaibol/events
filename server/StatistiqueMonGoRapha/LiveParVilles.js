global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/production.js');// + process.env.NODE_ENV + '.js');
console.log(global.config.db);
//global.config.db = global.config.db.replace("localhost", "wooepa.com") //passer en prod BD
console.log(global.config.db);
//export NODE_ENV=test pour être sur la base de donnée de tests.


var mongojs = require('mongojs');
var db = mongojs('admin:0303456@wooepa.com/wooepa', ['events','LiveParVilles_results']);

// minuit ce matin
var Dateminuit = new Date();
Dateminuit.setSeconds(0);
Dateminuit.setMinutes(0);
Dateminuit.setHours(0);

// Il y a combien d'events live ?
db.events.find({$or: [{ start_time: {$gt: Dateminuit }}, {end_time: {$gt: Dateminuit }}]},

//{
                //$or: [{ start_time: {$gt: Dateminuit }}, {end_time: {$gt: Dateminuit }}]
        //}, 
        function(err, docs) {
    // docs is an array of all the documents in mycollection
    console.log(docs.length);
});



//===================== Map reduce: Nombre d'events LIVE par Villes
var LiveParVilles = {};

LiveParVilles.execute = function () {
// Minuit est compris par la fonction
//console.log("Minuit est compris par la fonction : " + Dateminuit);
    
//Le plan
    var mapper = function () {

        emit(this.venue.city, 1);
        //countries est un tabeau avec tous les Villes trouvés
       // var countries = this.venue.country.split(',');
        //for (i in countries) {
            // on émet par elements du tableau {Villes, 1}
         //   emit(countries[i], 1);
        //}
        
    };

//Le reducer
    var reducer = function (key, values) {
        var count = 0;
        //là il ne va rester qu'une seule key Villes et on somme les 1
        for (index in values) {
            count += values[index];
        }
        return count;
    };

//la map Reuce sur events
    db.events.mapReduce(
        mapper,
        reducer, 
        {
        query: {$or: [{ start_time: {$gt: Dateminuit }}, {end_time: {$gt: Dateminuit }}]},
        //query: {'venue.country': "France"},
        //query: { start_time: {$gt: new Date() }},
        //query: {start_time: 
         //   {$gt:new Date('10/10/2012')}
        //},
        out: "LiveParVilles_results"
    }
    );

    db.LiveParVilles_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("nombre events Live par Villes \n", docs);
    });

};
//===================== 

LiveParVilles.execute();
console.log("raphastar est là ? Fuerza viejo");
module.exports = LiveParVilles;


