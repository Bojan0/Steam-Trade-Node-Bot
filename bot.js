const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const math = require('mathjs');

const Name = require('.//settings/config.json');
const Comments = require('.//settings/comments.json');
const Prices = require('.//settings/prices.json');
const config = require('.//settings/config.json');
const Games = require('.//settings/GamesPlayed.json');
const messages = require('.//settings/messages.json');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en'
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

client.on('friendRelationship', (steamid, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamid);
        client.chatMessage(steamid, messages.WELCOME);
	    client.chatMessage(steamid, messages.WELCOME2);
    }
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
    	if (message == "!Tsar") {
		client.chatMessage(steamID, messages.Tsar);
	}
    	if (message == "!Tartan)") {
		client.chatMessage(steamID, messages.Tartan);
	}
    	if (message == "!Beep") {
		client.chatMessage(steamID, messages.Beep);
	}
    	if (message == "!Virtual") {
		client.chatMessage(steamID, messages.Virtual);
	}
    	if (message == "!Saint") {
		client.chatMessage(steamID, messages.Saint);
	}
    	if (message == "!momma") {
		client.chatMessage(steamID, messages.momma);
	}
    	if (message == "!brimstone)") {
		client.chatMessage(steamID, messages.brimstone);
	}
        if (message == "!robin") {
		client.chatMessage(steamID, messages.robin);
	}
    	if (message == "!Country") {
		client.chatMessage(steamID, messages.Country);
	}
    	if (message == "!blood") {
		client.chatMessage(steamID, messages.blood);
	}
    	if (message == "!uclanka") {
		client.chatMessage(steamID, messages.uclanka);
	}
    	if (message == "!Luchadore)") {
		client.chatMessage(steamID, messages.Luchadore);
	}
});

client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);

	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});


manager.on('receivedOfferChanged', (offer)=>{
if(offer.state === 3){
community.postUserComment(offer.partner.toString(), "Comment", (err)=>{
if(err) throw err.message
console.log("Commented on " + offer.partner.toString() + "'s profile")})
}
})



function acceptOffer(offer) {
	offer.accept((err) => {
		community.checkConfirmations();
		console.log("We Accepted an offer");
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



