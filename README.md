# Steam-Node-Bot 1.2

1. Unpack the files to your Desktop or where ever you want it

2. go to Command Prompt

3. type the following into command propt
    a. cd Directory of files 
    b. npm install mathjs
    c. npm install steam-user
    d. npm install steam-totp
    e. npm install steam-totp
    f. npm install steam-tradeoffer-manager
    e. npm install raven
    g. npm install mathjs


4. go to the setting folder

5. go to config.json and put your username, password, sharedsecret, identitysecret, ownerID

Username = Bot Username
Password = Bot Password
Sharedsecret = Shared Secret from desktop authenticator
Identity Secret = Identity Secret from Desktop Authenticator
OwnerID = Bot owner ID64


6. go to GamesPlayed.json and make sure the games are set correctly

Games1 = Listed Game
Games2 = Game ID


7. go to messages.json and make sure everything is done correctly 

8. go to prices check to make sure the items you want to buy and  sell is in it 

{
"Steam Market Name of item"
"buy": Price,
"sell: Price
}

9. Make a new text file

10.Name it Run Bot.bat

11. Edit it and put the following code: node bot.js press ENTER  type pause
it will look like this 

node bot.js
pause


#Anonymous Usage Statistics Reporter

This Code reports anonymous usage statistics from sentry.io. Currently, this data is reported:

    Issues to help on problems in the future


#Opting Out

You may opt-out in one of two ways:

    Application authors: set global._mckay_statistics_opt_out to true
    End-users: set the NODE_MCKAY_STATISTICS_OPT_OUT environment variable to 1



