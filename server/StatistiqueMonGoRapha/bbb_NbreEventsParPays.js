global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

var mongojs = require('mongojs');
var db = mongojs(global.config.db, ['events', 'NbreEventsParPays_results']);

// minuit ce matin
var Dateminuit = new Date();
Dateminuit.setSeconds(0);
Dateminuit.setMinutes(0);
Dateminuit.setHours(0);
db.events.find({
                $or: [{ start_time: {$gt: Dateminuit }}, {end_time: {$gt: Dateminuit }}]
        }, function(err, docs) {
    // docs is an array of all the documents in mycollection
    console.log(docs.length);
});




//Map reduce: Nombre d'events par pays
var NbreEventsParPays = {};

NbreEventsParPays.execute = function () {
console.log(Dateminuit);
    var mapper = function () {
            emit(this.venue.country, 1);

        //var countries = this.venue.country.split(',');
       // for (i in countries) {
       //     emit(countries[i], 1);
       // }
        
    };

    var reducer = function (key, values) {
        var count = 0;
        for (index in values) {
            count += values[index];
        }

        return count;
    };

    db.events.mapReduce(
        mapper,
        reducer,
        {out: "NbreEventsParPays_results"}
    );

    db.NbreEventsParPays_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("nombre events par pays TOTAL \n", docs);
    });

};


NbreEventsParPays.execute();

module.exports = NbreEventsParPays;


