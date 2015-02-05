var Users = global.db.get('users');

var Events = global.db.get('events');
var Mail = require('../services/mail.js');
var Results = global.db.get('results');
var Boosts = global.db.get('boosts');

exports.checkEnd = function(req, res)
{
  if (req.params && req.params.eid)
  {
    Events.findOne({eid:parseInt(req.params.eid)}, function(err, ev){
      var currentdate = new Date();
      if (currentdate.getTime() >= ev.promotion.end_date.getTime())
      {
        ev.promoted = false;
        Results.find({event_id:ev.eid.toString()}, function(err, results){
          var i = 0;
          var winner = {
            score: 0,
            invited:0,
            share: 0,
            join: 0,
            picture:"",
            name:"",
            uid : ""
          };
          var promotionStats = {
            wooepajoin: 0,
            invited: 0,
            share: 0,
            nbplayer: results.length,
            facebookjoin: ev.attending_count
          };
          var invpoints = 0;
          while (results[i])
          {
            invpoints = results[i].result - results[i].join - results[i].share;
            if (results[i].result_boosted > winner.score)
            {
              winner.score = results[i].result_boosted;
              winner.uid = results[i].user_id;
              if (invpoints > 0)
              {
                winner.invited = invpoints / 3
              }
              if (results[i].share == 2)
              {
                winner.share = 1;
              
              }
              if (results[i].join == 6)
              {
                winner.join = 6;
              }
            }
            if (results[i].join == 6)
            {
              promotionStats.wooepajoin++;
            }
            if (invpoints > 0)
            {
              promotionStats.invited += invpoints / 3;
            }
            if (results[i].share == 2)
            {
              promotionStats.share++;
            }
            ++i;
          }
          Users.findOne({'facebook.id':winner.uid}, function(err, win){
            if (win)
            {

            winner.picture = win.facebook.picture;
            winner.name = win.facebook.name;
            }
            Boosts.find({son_id: win.facebook.id}, function(err, boosts){
              var j = 0;
              if (boosts && !err)
              {
                var boostname = [];
                while (boosts[j])
                {
                    boostname.push(boosts[j].name);
                  ++j;
                }
                ev.winner = winner;
                ev.promotionStats = promotionStats;
                winner.boostname = boostname;
              }
              Boosts.find({event_id:ev.eid.toString()}, function(err, nbBoost){
              ev.promotionStats.nbBoost = nbBoost.length;
              Events.update({eid:ev.eid}, ev);
              Mail.endGameMail(ev);
              Mail.toWinnerMail(ev);
              res.json(ev);
              });
            });
          });
        });
      }
      else
      {
        res.json(null);
      }
    });
  }
}

function diffdate(d1,d2){
var WNbJours = d2.getTime() - d1.getTime();
return Math.ceil(WNbJours/(1000*60*60*24));
}

exports.promoteEvent = function(req, res)
{
    Events.findOne({'eid': parseInt(req.params.eid)},function(err, ev){
        if (err)
        {
            console.log(err);
        }
        else if (ev)
        {
                   var promoter = {
            name : req.user.facebook.name,
            picture : req.user.facebook.picture,
            id : req.user.facebook.id
              }
          var promotion = {
            reward: req.body.reward,
            commentary: req.body.commentary,
            value: req.body.value,
            quantity: req.body.quantity,
            facebookAttendings: ev.attending_count,
            duration: ""
            };
            if (req.body.end_date)
            {
              promotion.end_date = new Date(parseInt(req.body.end_date));
            }
            promotion.duration = diffdate(new Date(),promotion.end_date);
            ev.promoter = promoter;
            ev.promotion = promotion;
            ev.promoted = true;
            Mail.gameActive(ev);
          if (!req.body.end_date || req.body.end_date <= new Date().getTime())
         {
          Events.findOne({'eid':parseInt(req.params.eid)}, function(err, new_ev){
            if (new_ev)
            {
              ev.promotion.end_date = new_ev.promotion.end_date;
              Events.update({'eid': parseInt(req.params.eid)},ev, function(err, ev){
                if (err)
                  console.log(err);
                });
            }
            });
         }
          else
          {
            ev.promotion.end_date = new Date(parseInt(req.body.end_date)),
            Events.update({'eid': parseInt(req.params.eid)},ev, function(err, ev){
             if (err)
                console.log(err);
            });
          }
        }

    });
}

exports.associatePromoter = function(req, res) {
  Users.findOne({
    'facebook.id': req.user.facebook.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else if (user) {
      Events.findOne({
        'eid': parseInt(req.params.eid)
      }, function(err, event) {
        if (err) {
          console.log(err);
        } else if (event) {
          if (!user.list_promoter_events || user.list_promoter_events.indexOf(req.params.eid) == -1) {
            Users.update({
                _id: user._id
              }, {
                $push: {
                  'list_promoter_events': req.params.eid
                }
              },
              function(err, event) {
                if (err) {
                  console.log(err);
                }
              });
          }
          if (!event.list_event_promoters || event.list_event_promoters.indexOf(req.user.facebook.id) == -1) {
            Events.update({
                _id: event._id
              }, {
                $push: {
                  'list_event_promoters': req.user.facebook.id
                }
              },
              function(err, event) {
                if (err) {
                  console.log(err);
                }
                res.json(event);
              });
          }
          if ((user.list_promoter_events && user.list_promoter_events.indexOf(req.params.eid) != -1) &&
            (event.list_event_promoters && event.list_event_promoters.indexOf(req.user.facebook.id) != -1)) {
            console.log("Promoter: L'association existe déja");
            res.json({
              'Erruer': "Promoter: L'association existe déja"
            });
          }

        } else {
          console.log("Promoter: Aucun événement trouvé pour l'id " + event_id);
          res.json({
            'Erreur': "Promoter: Aucun événement trouvé pour l'id " + event_id
          });
        }
      });
    } else {
      console.log("Promoter: Aucun événement trouvé pour l'id " + event_id);
      res.json({
        'Erreur': "Promoter: Aucun événement trouvé pour l'id " + event_id
      });
    }

  });
}