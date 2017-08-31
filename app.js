const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const log = require('.//logs/logs.txt')
const math = require('mathjs');
const Name = require('.//settings/config.json');
const Comments = require('.//settings/comments.json');
const Prices = require('.//settings/prices.json');
const Games = require('.//settings/GamesPlayed.json');
const messages = require('.//settings/messages.json');
const config = require('.//settings/config.json');



if (config.IssueTracking == "Enable"){
var Raven = require('raven');
Raven.config('https://0a6d1f872b464102ad9b86e4d12113b7:37f5be982d9e476c9e681ced933031c0@sentry.io/207208').install();
} else {
    console.log ("\x1b[33m WARNING\x1b[37m: IssueTracking Disabled please enable issue tracking to get help faster when you are having problems.")
}

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en',
});

const logOnOptions = {
	accountName: config.username,
	password: config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('succesfully logged on.');
    client.setPersona(SteamUser.Steam.EPersonaState.Online);
    client.gamesPlayed([Games.Game1,Games.Game2]);
});

client.on('friendRelationship', (steamID, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamID);
        client.chatMessage(steamID, messages.WELCOME);
	    client.chatMessage(steamID, messages.WELCOME2);
    }
});



client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);

	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});

messages
client.on("friendMessage", function(steamID, message) {
	if (message == "hi") {
		client.chatMessage(steamID, messages.hi);
	   }
    	if (message == "!Help") {
		client.chatMessage(steamID, messages.help);
	   }
    	if (message == "!Group") {
		client.chatMessage(steamID, messages.Group);
	   }
        if (config.CraftHatbanking == True){
    	if (message == "!The Tartan Spartan)") {
		client.chatMessage(steamID, messages.Tartan);
	   }
    };
    	if (message == "!The Virtual Reality Headset") {
		client.chatMessage(steamID, messages.Virtual);
	   }
    	if (message == "!Tam O' Shanter") {
		client.chatMessage(steamID, messages.Tam);
	   }
    	if (message == "!Large Luchadore") {
		client.chatMessage(steamID, messages.Lucha);
    	}
        if (message == "!The Mark of the Saint") {
		client.chatMessage(steamID, messages.Saint);
	   }
    	if (message == "!Big Country") {
		client.chatMessage(steamID, messages.Country);
	   }
    	if (message == "!Larrikin Robin") {
		client.chatMessage(steamID, messages.Robin);
	   }
    	if (message == "!The U-clank-a") {
		client.chatMessage(steamID, messages.uclanka);
	   }
        if (message == "!Backbiter's Billycock"){
        client.chatMessage(steamID, messages.Billy);
   	    }
        if (message == "!Group"){
        client.chatMessage(steamID, messages.Group);
    	}
});


if (config.Comments == "Enable") {
manager.on('receivedOfferChanged', (offer) => {
community.postUserComment(offer.partner.toString(), math.pickRandom([Comments.comments0, Comments.comments1, Comments.comments2, Comments.comments3, Comments.comments4, Comments.comments5]));
});
} else {
console.log('\x1b[33m WARNING\x1b[37m: Cannot comment on user profiles becasue config.Comments is set to false. ');
}

function acceptOffer(offer) {
	offer.accept((err) => {
		community.checkConfirmations();
		console.log("We Accepted an offer");
        user.storage.on('save', function(Log, contents, callback) {
	// filename is the name of the file, as a string
	// contents is a Buffer containing the file's contents
	// callback is a function which you MUST call on completion or error, with a single error argument

	// For example:
	someStorageSystem.saveFile(filename, contents, function(err) {
		callback(err);
	});
});
		if (err) console.log("There was an error accepting the offer.");
	});
}


function declineOffer(offer) {
	offer.decline((err) => {
		console.log("We Declined an offer");
		if (err) console.log("There was an error declining the offer.");
	});
}
               
function processOffer(offer) {
	if (offer.isGlitched() || offer.state === 11) {
		console.log("Offer was glitched, declining.");
		declineOffer(offer);
	} else if (offer.partner.getSteamID64() === config.ownerID) {
		acceptOffer(offer);
	} else {
		var ourItems = offer.itemsToGive;
		var theirItems = offer.itemsToReceive;
		var ourValue = 0;
		var theirValue = 0;
		for (var i in ourItems) {
			var item = ourItems[i].market_name;
			if(Prices[item]) {
 				ourValue += Prices[item].sell;
			} else {
				console.log("Invalid Value.");
				ourValue += 99999;
			}
		}
		for(var i in theirItems) {
			var item= theirItems[i].market_name;
			if(Prices[item]) {
				theirValue += Prices[item].buy;
			} else {
			console.log("Their value was different.")
			}
		} 
	}
	console.log("Our value: "+ourValue);
	console.log("Their value: "+theirValue);

	if (ourValue <= theirValue) {
		acceptOffer(offer);
	} else {
		declineOffer(offer);
	}
};
client.setOption("promptSteamGuardCode", false);
manager.on('newOffer', (offer) => {
processOffer(offer);
});