const config = require('.//settings/config.json')
if (config.IssueTracking == "Enable"){
var Raven = require('raven');
Raven.config('https://0a6d1f872b464102ad9b86e4d12113b7:37f5be982d9e476c9e681ced933031c0@sentry.io/207208').install();
} else {
    console.log ("\x1b[33m WARNING\x1b[37m: IssueTracking Disabled please enable issue tracking to get help faster when you are having problems.")
}
	
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const Steam = require('steam');

const TeamFortress2 = require('tf2');

const user = new SteamUser();
const tf2 = new TeamFortress2(user);

const math = require('mathjs');
const Name = require('.//settings/config.json');
const Games = require('.//settings/Games.json');
const messages = require('.//settings/Messages/messages.json');
const Prices1 = require('.//settings/Prices/Prices.json');
const Prices2 = require('.//settings/Prices/Prices.json');
const Comments = require('.//settings/Comments/comments.json');
const HatsBanking = require('.//settings/Messages/Hatsmessage.json');
const KeysBanking = require('.//settings/Messages/Keysmessage.json');
const AdminPrices = require('.//settings/Prices/AdminPrices.json');
const stock = require('.//settings/Stock/stock.json');
const instock = require('.//settings/Stock/stock.json');
const stocklimit = require('.//settings/Stock/stock.json');

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


if (config.Hatbanking == "Enable"){
    console.log('Craft Hat Banking Enabled')
} else {
    console.log('\x1b[33m WARNING\x1b[37m: Craft Hat Banking not Enabled')
}
if (config.KeyBanking == "Enable"){
    console.log('Key Banking Banking Enabled')
} else {
    console.log('\x1b[33m WARNING\x1b[37m: Key Banking is not Enabled')
}

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
if (config.Hatbanking == "Enable"){
    	if (message == "!The Tartan Spartan") {
		client.chatMessage(steamID, HatsBanking.Tartan);
	    }
    	if (message == "!The Virtual Reality Headset") {
		client.chatMessage(steamID, HatsBanking.Virtual);
        }
    	if (message == "!Tam O' Shanter") {
		client.chatMessage(steamID, HatsBanking.Tam);
        }
    	if (message == "!Large Luchadore") {
		client.chatMessage(steamID, HatsBanking.Lucha);
        }
        if (message == "!The Mark of the Saint") {
		client.chatMessage(steamID, HatsBanking.Saint);
        }
    	if (message == "!Big Country") {
		client.chatMessage(steamID, HatsBanking.Country);
        }KeysBanking
    	if (message == "!Larrikin Robin") {
		client.chatMessage(steamID, HatsBanking.Robin);
        }
    	if (message == "!The U-clank-a") {
		client.chatMessage(steamID, HatsBanking.uclanka);
        }
        if (message == "!Backbiter's Billycock"){
        client.chatMessage(steamID, HatsBanking.Billy);
   	    }
} else{
	client.chatMessage(steamID, "I am sorry i am currently not programmed to Buy or sell Craft Hats");
    }

 if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
        if (message == "!Mann Co. Supply Crate Key") {
		client.chatMessage(steamID, KeysBanking.Crate);
        }
    if (message == "!Robo Community Crate Key") {
		client.chatMessage(steamID, KeysBanking.Robo);
        }
    if (message == "!Summer Appetizer Key") {
		client.chatMessage(steamID, KeysBanking.Appetizer);
        }
	if (message == "!Red Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Red);
        }
    if (message == "!Orange Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Orange);
        }
    if (message == "!Yellow Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Yellow);
        }
    if (message == "!Green Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Green);
        }
	if (message == "!Aqua Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Aqua);
        }
    if (message == "!Blue Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Blue);
   	    }
	if (message == "!Brown Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Brown);
   	    }
	if (message == "!Black Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Black);
   	    }
    if (message == "!Fall 2013 Acorns Crate Key"){
        client.chatMessage(steamID, KeysBanking.Acorns);
   	    }
	if (message == "!Fall 2013 Gourd Crate Key"){
        client.chatMessage(steamID, KeysBanking.Gourd);
   	    }
	if (message == "!Mann Co. Strongbox Key"){
        client.chatMessage(steamID, KeysBanking.Strongbox);
   	    }
	if (message == "!Mann Co. Stockpile Crate Key"){
        client.chatMessage(steamID, KeysBanking.Stockpile);
   	    }
	if (message == "!End of the Line Key"){
        client.chatMessage(steamID, KeysBanking.EOTL);
   	    }
	if (message == "!Gun Mettle Key"){
        client.chatMessage(steamID, KeysBanking.Mettle);
   	    }
	if (message == "!Gun Mettle Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.MettleCosmetic);
   	    }
	if (message == "!Invasion Community Update Key"){
        client.chatMessage(steamID, KeysBanking.Invasion);
   	    }
	if (message == "!Gargoyle Key"){
        client.chatMessage(steamID, KeysBanking.Gargoyle);
   	    }
	if (message == "!Tough Break Key"){
        client.chatMessage(steamID, KeysBanking.Break);
   	    }
	if (message == "!Tough Break Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.BreakCosmetic);
   	    }
	if (message == "!Mayflower Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.Mayflower);
   	    }
	if (message == "!Creepy Crawly Key"){
        client.chatMessage(steamID, KeysBanking.Creepy);
   	    }
	if (message == "!Rainy Day Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.Rainy);
   	    }

} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
};
});



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
			if (instock[item].instock != stocklimit[item].stocklimit) {
			if(Prices1[item]) {
 				ourValue += Prices1[item].sell;
			}} else {
				console.log("Invalid Value.");
				ourValue += 99999;
			}
		for(var i in theirItems) {
			var item= theirItems[i].market_name;
			if (instock[item].instock != stocklimit[item].stocklimit) {
			if(Prices2[item]) {
				theirValue += Prices2[item].buy;
			} else {
			console.log("Their value was different.")
			}
	console.log("Our value: "+ourValue);
	console.log("Their value: "+theirValue);
}
	if (ourValue <= theirValue) {
		acceptOffer(offer);
} else {
		declineOffer(offer);
	};
};
};
};
};

if (config.Comments == "Enable") {
manager.on('receivedOfferChanged', (offer)=>{
if(offer.state === 3){
community.postUserComment(offer.partner.toString(), "Comment", (err)=>{
if(err) throw err.message
community.postUserComment(offer.partner.toString(), math.pickRandom([Comments.comments0, Comments.comments1, Comments.comments2, Comments.comments3, Comments.comments4, Comments.comments5]));
});
}
})
} else {
console.log('\x1b[33m WARNING\x1b[37m: Cannot comment on user profiles becasue config.Comments is set to false. ');
}
client.setOption("promptSteamGuardCode", false);

manager.on('newOffer', (offer) => {
     processOffer(offer);
    });
