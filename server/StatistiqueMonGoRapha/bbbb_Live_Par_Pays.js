global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

var mongojs = require('mongojs');
var db = mongojs(global.config.db, ['events','LiveParPays_results']);

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



//===================== Map reduce: Nombre d'events LIVE par pays
var LiveParPays = {};

LiveParPays.execute = function () {
// Minuit est compris par la fonction
//console.log("Minuit est compris par la fonction : " + Dateminuit);
    
//Le plan
    var mapper = function () {

        emit(this.venue.country, 1);
        //countries est un tabeau avec tous les pays trouvés
       // var countries = this.venue.country.split(',');
        //for (i in countries) {
            // on émet par elements du tableau {pays, 1}
         //   emit(countries[i], 1);
        //}
        
    };

//Le reducer
    var reducer = function (key, values) {
        var count = 0;
        //là il ne va rester qu'une seule key pays et on somme les 1
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
        out: "LiveParPays_results"
    }
    );

    db.LiveParPays_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("nombre events Live par pays \n", docs);
    });

};
//===================== 

LiveParPays.execute();
console.log("raphastar est là ? Fuerza viejo");
module.exports = LiveParPays;


