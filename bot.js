const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
 
const Prices = require('.//settings/prices.json');
const config = require('.//settings/config.json');
const games = require('.//settings/GamesPlayed.json');
const Messages = require('.//settings/messages.json');

var cyan = "\x1b[36m%s\x1b[0m";




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
    client.gamesPlayed([games.Game1,games.Game2]);
});
 
client.on("friendMessage", function(steamID, message) {
    if (message == "hi") {
        client.chatMessage(steamID, Messages.messagehi); 
        client.chatMessage(steamID, Messages.WELCOME2);
    console.log('\x1b[36m%s\x1b[0m', 'hi');
    console.log('\x1b[33m%s\x1b[0m',Messages.messagehi);
    console.log('\x1b[33m%s\x1b[0m',Messages.WELCOME2);  
    };
});
 
client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
 
    community.setCookies(cookies);
    community.startConfirmationChecker(20000, config.identitySecret);
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
}
 
client.setOption("promptSteamGuardCode", false);
 
manager.on('newOffer', (offer) => {
     processOffer(offer);
});