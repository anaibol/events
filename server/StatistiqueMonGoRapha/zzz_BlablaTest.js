// run node index.js in the terminal below
// complete tutorial can be found : http://thejackalofjavascript.com/mapreduce-in-mongodb
//var mongojs = require('mongojs');
//var db = mongojs('wooepa-dev', ['events']);

// connect now, and worry about collections later
var db = mongojs('wooepa-dev'); //wooepa.com:27017 admin 0303456
var mycollection = db.collection('mycollection');

// find everything
db.events.find(function(err, docs) {
    // docs is an array of all the documents in mycollection
});

var example1 = {};
example1.execute = function () {
    var mapper = function () {
        emit(this.eid , 1);
    };

    var reducer = function (gender, count) {
        return Array.sum(count);
    };
console.log('va fan culo');
    db.sourceData.mapReduce(
        mapper,
        reducer, {
            out: "example1_results"
        }
    );
console.log('va fan culo');
    db.example1_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("\n", docs);
    });
};

module.exports = example1;