//var nodemailer = require('nodemailer');
var Users = global.db.get('users');

// var transporter = nodemailer.createTransport({
//    	service: 'gmail',
//     auth: {
//         user: 'wooepa@gmail.com',
//         pass: 'wwwwoo123'
//     }
// });

function loginMail(user)
{
    // var html = '<div align="center"><img src="http://localhost:3000/img/headermail.png" alt="logo" align="center" width="100%"></div> <div style="display:inline-flex;width:100%;margin-top:5%;font-size:1em;"><div style="text-align:left;margin-left:10%;width:20%;"><div style="text-align:center"><img src="http://localhost:3000/img/loupemail.png" align="center" alt="discover events" width="20%"></div><h3 style="color:red;" align="center"><u>DISCOVER EVENTS</u></h3><div style="margin-left:20%;"><p> - What\'s happenning in your City?</p><p> - What\'s your Music Style?</p><p> - Checkout Popular Events!</p></div></div><div style="text-align:left;margin-left:10%;width:20%;"><div style="text-align:center;"><img src="http://localhost:3000/img/cadeaumail.png" align="center" alt="discover events" width="20%"></div><h3 align="center" style="color:red;"><u>GET REWARDED</u></h3><div style="margin-left:33%;"><p> - Free admissions</p><p> - VIP tables</p><p> - Bottles of Champagne!</p></div></div><div style="text-align:left;margin-left:10%;width:20%;"><div align="center"><img src="http://localhost:3000/img/megaphonemail.png" align="center" alt="discover events" width="20%"></div><h3 style="color:red;" align="center"><u>BOOST YOUR EVENT</u></h3><div style="margin-left:25%;"><p> - Start an invitation Contest</p><p> - Offer a reward</p><p> - Let people invite their friends</p></div></div></div><div align="center" style="margin-top:5%"><img src="http://localhost:3000/img/midbanner.png" width="100%" align="center" alt="discover events"></div><div align="center" style="margin-top:10%;font-size:20px;margin-bottom:10%;"><p style="text-align:center;bold:true;color:black;"><b>Search a City?</b></p><p style="text-align:center;color:grey;">Paris, New-York, Madrid & 1,000+ cities!</p><br /><p style="text-align:center;color:black"><b>Sort by Music Style?</b></p><p style="text-align:center;color:grey">Salsa, RnB, Techno & 100+ tags!</p><br /><p style="text-align:center;color:black"><b>Get a Feel from live situations?</b></p><p style="text-align:center;color:grey">Real-time photos & videos from social media</p><p style="text-align:center;color:red"><b><br />Wooepa!<br /><br />Makes it easier to decide where you are going out tonight!<br /><br /><br />Start to discover events</b></p><a href="http://wooepa.com"><img align="center" src="http://localhost:3000/img/loupemailbot.png" width="10%"></a><p style="text-align:center;color:grey;font-size:10px;">by clicking above</p></div><img src="http://localhost:3000/img/footer.png" alt="footer" width="100%">';
    // html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
    // var mailOptions = {
    // 	from: 'Tristan Roby ✔ <hello@wooepa.com>', // sender address
    //     to: 'tristan.roby@epitech.eu', // list of receivers
    //     subject: 'Welcome to Wooepa!', // Subject line
    //     html: html // plaintext body
    // };
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //       console.log(error);
    //     }
    //     else{
    //         console.log('Message sent: ' + info.response);
    //     }
    // });
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

module.exports.promoteMail = promoteMail
module.exports.loginMail = loginMail;