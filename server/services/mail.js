//var nodemailer = require('nodemailer');
var Users = global.db.get('users');
var sendgrid  = require('sendgrid')("Wooepa", "tristanroby123");
var graph = require('fbgraph');
var Events = global.db.get('events');

// var transporter = nodemailer.createTransport({
//    	service: 'gmail',
//     auth: {
//         user: 'wooepa@gmail.com',
//         pass: 'wwwwoo123'
//     }
// });

function loginMail(user)
{
    var fs = require('fs');
    var path = global.rootDir + 'services/mails/loginMail.html'
    fs.readFile(path, 'utf-8', function (err, mail){
        if (err)
        {
            console.log(err);
        }
        var new_mail = mail.replace("src='p'", "src='http://graph.facebook.com/" + user.facebook.id + "/picture'");
        var email = new sendgrid.Email({
        to:       user.email,
        from:     'hello@wooepa.com',
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
        if (ev.promotion && ev.promotion.reward)
        {
            Users.findOne({'facebook.id':fromuid.toString()}, function(err, from){
                to.forEach(function(uid){
                    Users.findOne({'facebook.id': uid.toString()}, function(err, res){
                        if (res && res.facebook && res.facebook.email)
                        {
                            var email = new sendgrid.Email({
                                to:       res.facebook.email,
                                from:     'hello@wooepa.com',
                                fromname: 'Wooepa',
                                subject:  from.name + ' just invited you!',
                                html: '<div style="text-align:center;"><h1>Congratulations !</h1><p>You\'ve been invited by ' + from.name + ' to</p><a href="http://wooepa.com' + url + '">' + ev.name + '</a><br /><p> Invite your friends and win </p><a href="http://wooepa.com' + url + '">' + ev.promotion.reward + '</a></div>'
                            });
                            sendgrid.send(email, function(err, json) {
                                if (err) { return console.error(err); }
                                    console.log(json);
                            });
                        }     
                    });
                });
            });
        }
    });
}

function promoteMail(ev)
{
	// Users.findOne({'facebook.id': ev.promoter.id.toString()}, function(err, promoter){
	//     var mailOptions = {
 //    		from: 'Tristan Roby ✔ <hello@wooepa.com>', // sender address
 //        	to: promoter.facebook.email, // list of receivers
 //        	subject: 'Your promotion !', // Subject line
 //        	text: 'Hello ' + ev.promoter.name + ' your event : "'  + ev.name + '" is now in promotion' // plaintext body
 //    	};
 //    	transporter.sendMail(mailOptions, function(error, info){
 //        	if(error){
 //          		console.log(error);
 //        	}
 //        	else{
 //            	console.log('Message sent: ' + info.response);
 //        	}
 //    	});
	// });
	// if (ev.attending)
	// {
	// 	ev.attending.forEach(function(attender){
	// 		Users.findOne({'facebook.id':attender.toString()}, function(err, attendinfo){
	// 		    var mailOptions = {
 //    				from: 'Tristan Roby ✔ <hello@wooepa.com>', // sender address
 //        			to: attendinfo.facebook.email, // list of receivers
 //        			subject: 'Try to win ' + ev.promotion.quantity + ' ' + ev.promotion.reward, // Subject line
 //        			text: 'Hello the event where you are attending: "' + ev.name +'" is now in promotion, play on Wooepa and try to win ' + ev.promotion.quantity + ' ' + ev.promotion.reward// plaintext body
 //    			};
 //    			transporter.sendMail(mailOptions, function(error, info){
 //        			if(error){
 //          				console.log(error);
 //        			}
 //        			else{
 //            			console.log('Message sent: ' + info.response);
 //        			}
 //    			});
	// 		});
	// 	});
	// }
}

module.exports.promoteMail = promoteMail;
module.exports.loginMail = loginMail;
module.exports.inviteMail = inviteMail;