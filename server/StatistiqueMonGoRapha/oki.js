// run node index.js in the terminal below
// complete tutorial can be found : http://thejackalofjavascript.com/mapreduce-in-mongodb
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin123@ds029287.mongolab.com:29287/mapreducedb', ['sourceData', 'example1_results']);
var example1 = {};
example1.execute = function () {
    var mapper = function () {
        emit(this.gender, 1);
    };

    var reducer = function (gender, count) {
        return Array.sum(count);
    };

    db.sourceData.mapReduce(
        mapper,
        reducer, {
            out: "example1_results"
        }
    );

    db.example1_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("\n", docs);
    });
};

module.exports = example1;