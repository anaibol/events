'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
  any: {}
});

/**
 * Validations
 */
/*EventSchema.path('title').validate(function(title) {
  return title.length;
}, 'Title cannot be blank');*/

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};


EventSchema.statics.findNameLike = function findNameLike(q, term) {
  return this.find({
    'name': new RegExp(q.name || term, 'i')
  });
};


EventSchema.statics.findFromNow = function findFromNow() {
  return this.find({
    'start_time': {
      $gte: new Date()
    }
  }).sort({
    'start_time': 1
  });
};

mongoose.model('Event', EventSchema);