//var nodemailer = require('nodemailer');
var Users = global.db.get('users');
var sendgrid  = require('sendgrid')("Wooepa", "tristanroby123");
var graph = require('fbgraph');
var Events = global.db.get('events');
var moment = require('moment');
var Invitations = db.get('invitations');

var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;
var path = global.rootDir + 'services/mails/'
var currentyear = new Date();
currentyear = currentyear.getFullYear();

exports.blockAll = function(req, res)
{
    if (req && req.params)
    {
        Users.findOne({'facebook.id':req.params.toid},function(err, to){
            if (to)
            {
                to.blockall = true;
                Users.update({'facebook.id': req.params.toid}, to);
            }
        });
    }
}

exports.addToSpam = function(req, res)
{
    if (req && req.params)
    {
        Users.findOne({'facebook.id':req.params.toid}, function (err, to){
            if (to && to.blocked_user)
            {
                to.blocked_user.push(req.params.fromid)
            }
            else if (to && !to.blocked_user)
            {
                var blocked_user = [];
                blocked_user.push(req.params.fromid);
                to.blocked_user = blocked_user;
                Users.update({'facebook.id': req.params.toid}, to);
            }
        });
    }
}

exports.unsubscribe = function(req, res)
{
    if (req && req.params.mid)
    {
        Invitations.findOne({'_id': ObjectId(req.params.mid)}, function (err, invite){
            if (err)
            {
                console.log(err);
            }
            if (invite)
            {
                Users.findOne({'facebook.id': invite.from}, function (err, from){
                    if (from)
                    {
                        var result = {
                            from: from
                        };

                        Users.findOne({'facebook.id': invite.to}, function (err, to){
                            if (to)
                            {
                                result.to = to;
                                res.json(result);
                            }
                        });
                    }
                });
            }
        });
    }
}

function gameActive(ev)
{
    Users.findOne({'facebook.id':ev.promoter.id}, function (err, promoter){
        fs.readFile(path + 'GameActive.html', 'utf-8', function (err, mail){
        if (err)
        {
            console.log(err);
        }
        var link = "";
        if (ev.venue && ev.venue.city)
        {
            link = "http://wooepa.com/" + ev.venue.city + '/' + ev.slug + "/" + ev.eid + '/game';
        }
        else
        {
            link = "http://wooepa.com/" + "events/" + ev.slug + "/" + ev.eid + '/game';
        } 
        var unsubscribe = "http://wooepa.com/mail/unsubscribe?mid="
        var new_mail = mail.replace("**promoter**", ev.promoter.name);
        new_mail = new_mail.replace('**reward**', ev.promotion.reward);
        new_mail = new_mail.replace('**promoterpic**', ev.promoter.picture);
        new_mail = new_mail.replace('**deadline**', moment(ev.promotion.end_date).calendar());
        new_mail = new_mail.replace('**eventpic**', ev.pic_cover.source);
        new_mail = new_mail.replace('*|CURRENT_YEAR|*', currentyear);
        new_mail = new_mail.replace('**unsub**', unsubscribe);
        new_mail = new_mail.replace('**invitebtn**', link + '?a=invite');
        new_mail = new_mail.replace('**sharebtn**', link + '?a=share');
        new_mail = new_mail.replace('**watchbtn**', link);
        var email = new sendgrid.Email({
        to:       promoter.email,
        from:     'no-reply@wooepa.com',
        fromname: 'Wooepa',
        subject:  'Game Active!',
        html: new_mail
        });
        sendgrid.send(email, function(err, json) {
            if (err) { return console.error(err); }
                console.log(json);
        });
        });
    });
}

function loginMail(user)
{
    fs.readFile(path + 'loginMail.html', 'utf-8', function (err, mail){
        if (err)
        {
            console.log(err);
        }
        var unsubscribe = "http://wooepa.com/mail/unsubscribe?mid="
        var new_mail = mail.replace("src='p'", "src='http://graph.facebook.com/" + user.facebook.id + "/picture'");
        new_mail = new_mail.replace('**unsub**', unsubscribe);
        new_mail = new_mail.replace('*|CURRENT_YEAR|*', currentyear);
        var email = new sendgrid.Email({
        to:       user.email,
        from:     'no-reply@wooepa.com',
        fromname: 'Wooepa',
        subject:  'Welcome to Wooepa',
        html: new_mail
        });
        sendgrid.send(email, function(err, json) {
            if (err) { return console.error(err); }
                console.log(json);
    });
    });
}

function inviteMail(fromuid, uids, url, eid)
{
    var to = uids.split(',');
    if (to.length > 1)
        to.pop();
    Events.findOne({eid:parseInt(eid)}, function(err, ev){
        if (ev)
        {
            var test = ev._id.toString();
            if (test)
            {

            }
            if (ev.pic_cover)
                var pic = ev.pic_cover.source;
            else
                var pic = "";
            if (ev.location) {
                if (ev.venue) {
                    if (ev.venue.city)
                        ev.location += ", " + ev.venue.city
                    if (ev.venue.country)
                        ev.location += ", " + ev.venue.country
                }

            }
            var link = "";
            if (ev.venue && ev.venue.city)
            {
                link = "http://wooepa.com/" + ev.venue.city + '/' + ev.slug + "/" + ev.eid;
            }
            else
            {
                link = "http://wooepa.com/" + "events/" + ev.slug + "/" + ev.eid;
            }
        }
        if (ev.promotion && ev.promotion.reward)
        {
            Users.findOne({'facebook.id':fromuid.toString()}, function(err, from){
                to.forEach(function(uid){
                    Users.findOne({'facebook.id': uid.toString()}, function(err, res){
                        if (res && res.facebook && res.facebook.email && !res.blockall)
                        {
                            var send = true;
                            if (res.blocked_user && res.blocked_user.length >= 1)
                            {
                                var i = 0;
                                while (res.blocked_user[i])
                                {
                                    if (res.blocked_user[i] === from.facebook.id)
                                    {
                                        var send = false;
                                    }
                                    ++i;
                                }
                            }
                            if (send == true)
                            {
                            var invitation = {
                                from: from.facebook.id,
                                to: res.facebook.id,
                                mid: ""
                            };
                          Invitations.insert(invitation, function(err, saved){
                            var mailid = saved._id.toString();
                            var unsubscribe = "http://wooepa.com/mail/unsubscribe?mid=" + mailid;
                         fs.readFile(path + "InvitationWooepa.html", 'utf-8', function(err, mail){
                            var new_mail = mail.replace('imgcover', pic);
                            new_mail = new_mail.replace('invfrom', from.name);
                            new_mail = new_mail.replace('*unsub*', unsubscribe);
                            new_mail = new_mail.replace('eventdate', moment(ev.start_time).calendar());
                            new_mail = new_mail.replace('eventPlace', ev.location);
                            new_mail = new_mail.replace('eventTitle', ev.name);
                            new_mail = new_mail.replace('linkToEvent', link);
                            new_mail = new_mail.replace('promotionReward', ev.promotion.reward);
                            new_mail = new_mail.replace('*|CURRENT_YEAR|*', currentyear);
                            var email = new sendgrid.Email({
                                to:       res.facebook.email,
                                from:     'no-reply@wooepa.com',
                                fromname: from.name,
                                subject:  from.name + ' just invited you!',
                                html: new_mail
                            });
                            sendgrid.send(email, function(err, json) {
                                if (err) { return console.error(err); }
                                    console.log(json);
                            });
                        });
                        });
                        }
                        }     
                    });
                });
            });
        }
    });
}

module.exports.loginMail = loginMail;
module.exports.inviteMail = inviteMail;
module.exports.gameActive = gameActive;