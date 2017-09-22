# Steam-Node-Bot 2.0.0

1. Unpack the files to your Desktop or where ever you want it

2. go to Command Prompt

3. type the following into command propt
    a. cd Directory of extracted files 
    b. npm install mathjs
    c. npm install steam-user
    d. npm install steam-totp
    e. npm install steamcommunity
    f. npm install steam-tradeoffer-manager
    e. npm install raven
    g. npm install fs

4. go to the setting folder

5. go to config.json and put your username, password, sharedsecret, identitysecret, ownerID

Username = Bot Username
Password = Bot Password
Sharedsecret = Shared Secret from desktop authenticator
Identity Secret = Identity Secret from Desktop Authenticator
OwnerID = Bot owner ID64
SteamName = Online Steam Name
GroupLink = Link To Group for Chats
Comments = Enables and Disables Profile comments
IssueTracking = Enables and Disables IssueTracking
GroupID = ID of the Group the bot is for //Currently Not Used
Robopartbanking = Enables and Disables Robo Part Banking chats
Hatbanking = Enables and Disables Hat banking chats //for more hats you have to add them Yourself I Did not add them all in
KeyBanking = Enables and Disables Key Banking chats
Group = Group Name for Chats
chats = Enables and Disables Chats for steam bot


6. go to GamesPlayed.json and make sure the games are set correctly

Games1 = Listed Game
Games2 = Game ID


7. go to messages.json and make sure everything is done correctly 

8. go to prices check to make sure the items you want to buy and  sell is in it 
Example Below
vvvvvvvvvvvvv
{
"Steam Market Name of item"
"buy": Price,
"sell: Price
}

9. Make a new text file

10.Name it 'Run Bot.bat'

11. Edit it and put the following code: node bot.js press ENTER  type pause
it will look like this 

node bot.js
pause
