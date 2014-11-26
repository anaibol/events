var Results = db.get('results');
var Invitations = db.get('invitations');
var Res = require('./resolve.js');
var Users = db.get('users');

function AddPointsBoost(uid, eid, point) {
  Results.findOne({
    user_id: uid,
    event_id: eid
  }, function(err, results) {
    if (results && results.result + point >= 0) {
      Results.update({
        user_id: uid,
        event_id: eid
      }, {
        $inc: {
          result_boosted: point
        }
      });
    }
  });
}

function AddPoints(uid, eid, point, type) {
  Results.findOne({
    user_id: uid,
    event_id: eid
  }, function(err, results) {
    if (results && results.result + point >= 0) {
      if (type === "join" || type === "unjoin")
      {
        if ((results.join == 0 && point == 6) || (results.join == 6 && point == -6))
          Results.update({
        user_id: uid,
        event_id: eid
      }, {
        $inc: {
          result: point,
          result_boosted: point,
          join: point
        }
      });
      }
      else if (type != "join" && type != "unjoin")
      Results.update({
        user_id: uid,
        event_id: eid
      }, {
        $inc: {
          result: point,
          result_boosted: point
        }
      });
    } else if (!results && point >= 0) {
      Users.findOne({'facebook.id':uid.toString()}, function(user){
        if (user)
        {
          if (type === "join")
          {
                    Results.insert({
          user_id: uid,
          name: user.facebook.name,
          event_id: eid,
          result: point,
          result_boosted: point,
          score: 0,
          join: 6
        });
          }
          else
          {
          Results.insert({
            user_id: uid,
            name: user.facebook.name,
            event_id: eid,
            result: point,
            result_boosted: point,
            score: 0,
            join: 0
        });
        }
      }
      });
    }
  });
}

function calcPoints(eid, uid, uids, inv) {
  var total = inv.invited.length * 3;
  Invitations.update({
    user_id: uid,
    event_id: eid
  }, {
    user_id: uid,
    event_id: eid,
    invited: inv.invited,
    score: total
  });
  AddPoints(uid, eid, total - inv.score);
}

function giveInvitePoints(eid, uid, uids) {
  var tabuids = new Array();
  tabuids = uids.split(',');
  Results.findOne({
    user_id: uid,
    event_id: eid
  }, function(err, results) {
    if (!results) {
      Results.insert({
        user_id: uid,
        event_id: eid,
        result: 0,
        result_boosted: 0,
        score: 0
      });
    }
    Invitations.findOne({
      user_id: uid,
      event_id: eid
    }, function(err, inv) {
      if (!inv) {
        Invitations.insert({
          user_id: uid,
          event_id: eid,
          score: 0,
          invited: tabuids
        });
      }
      Invitations.update({
        user_id: uid,
        event_id: eid
      }, {
        $addToSet: {
          invited: {
            $each: tabuids
          }
        }
      });
      Invitations.findOne({
        user_id: uid,
        event_id: eid
      }, function(err, inv) {
        if (inv) {
          calcPoints(eid, uid, uids, inv);
        }
      });
    });
  });
}

function getAttendingBonus2(event, uid) {

  var nb_done = 0;

  var bonus = 0;
  if (event.attending) {
    for (j = 0; j < event.attending.length; j++) {
      nb_done++;
      if (event.attending[j] == uid) {
        bonus = 6;
      }
      if (nb_done == event.attending.length)
        AddPoints(uid, event.eid, 6);
    }
  }

}

module.exports.giveInvitePoints = giveInvitePoints;
module.exports.AddPoints = AddPoints;
module.exports.AddPointsBoost = AddPointsBoost;