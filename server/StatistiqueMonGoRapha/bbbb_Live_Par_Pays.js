global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

var mongojs = require('mongojs');
var db = mongojs(global.config.db, ['events', 'LiveParPays_results']);

db.events.find(function(err, docs) {
    // docs is an array of all the documents in mycollection
    console.log(docs.length);
});




//Map reduce: Nombre d'events par pays
var LiveParPays = {};

LiveParPays.execute = function () {
    var mapper = function () {
            //emit(this.venue.country, 1);

        var countries = this.venue.country.split(',');
        for (i in countries) {
            emit(countries[i], 1);
        }
        
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
        reducer, {
            out: "LiveParPays_results"
        }
    );

    db.LiveParPays_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("\n", docs);
    });

};

LiveParPays.execute();

module.exports = LiveParPays;

