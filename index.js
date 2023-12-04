// Script made by blvecoves using the noblox.js documentation
// Important Stuff
const noblox = require("noblox.js");
const express = require("express");
const app = express();

// Variables

const GroupId = 16650000;
const Cookie = process.env['Cookie'];
const Token = process.env['Token'];

// Logging In

var CurrentUser;

async function startApp() {
	CurrentUser = await noblox.setCookie(Cookie);
};

startApp().catch(function(Error){
  console.log("There was an error logging in: ", Error)
})

// Group Functions

app.use(express.static("public"));

try {
	noblox.setRank(13560688, 1759544106, "Manager")
} catch(Error) {
	print("There was an error:", Error)
}

app.get("/setrank", (req, res) => {
  var UserId = req.query["userid"];
  var Rank = req.query["rankid"];
  var GivenToken = req.query["token"];
  var RankerId = req.query["rankerid"];
  
  if (GivenToken == Token) {
    noblox.getRankInGroup(GroupId, RankerId).then(function(RankerRank){
      noblox.getRole(GroupId, Rank).then(function(SpecifiedRank){        
        if (RankerRank > SpecifiedRank.rank) {          
          noblox.getRankInGroup(GroupId, UserId).then(function(UserRank){            
            if (UserRank < RankerRank) {             
              if (RankerRank >= 248 && RankerRank != 1 && RankerRank != 0) {               
                noblox.setRank(GroupId, UserId, Rank).catch(function(Error){
                  console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
                  res.json('<:error:1090815857078304820> `' + Error + '`');
              }).then(function(){
                  noblox.getUsernameFromId(UserId).then(function(Username){
                  console.log('<:check:1090810369297100850> Successfully set **' + Username + '\'s** rank to **' + Rank + '**.' + ' [' + RankerId + ']');
                  res.json('<:check:1090810369297100850> Successfully set **' + Username + '\'s** rank to **' + Rank + '**.');
                })
              })                
              } else {
                console.log('<:error:1090815857078304820> `You do not have permission to use this command.`' + ' [' + RankerId + ']');
                res.json('<:error:1090815857078304820> `You do not have permission to use this command.`');
              }              
            } else {
              console.log('<:error:1090815857078304820> `Error: You cannot update a user with a rank higher than, or equal to your own.`' + ' [' + RankerId + ']');
              res.json('<:error:1090815857078304820> `Error: You cannot update a user with a rank higher than, or equal to your own.`');
            };           
          });        
        } else {
          console.log('<:error:1090815857078304820> `Error: You cannot set a rank higher than, or equal to your own.`' + ' [' + RankerId + ']');
          res.json('<:error:1090815857078304820> `Error: You cannot set a rank higher than, or equal to your own.`');
        };        
      }).catch(function(Error){
        console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
        res.json('<:error:1090815857078304820> `' + Error + '`');
      });
    }).catch(function(Error){
      console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
      res.json('<:error:1090815857078304820> `' + Error + '`');
    });
  } else{
    console.log('<:error:1090815857078304820> `Internal Error: Provided token ' + GivenToken + ' is invalid.`' + ' [' + RankerId + ']');
    res.json('<:error:1090815857078304820> `Internal Error: Provided token is invalid.`'); 
  }
});

app.get('/promote', (req, res) => {
  var UserId = req.query['userid'];
  var GivenToken = req.query['token'];
  var RankerId = req.query['rankerid'];

	console.log(UserId, GivenToken, RankerId)
	
  if (GivenToken == Token) {
    noblox.getRankInGroup(GroupId, UserId).then(function(UserRank){
      noblox.getRankInGroup(GroupId, RankerId).then(function(RankerRank){
        if (UserRank >= 3 && UserRank < 6) {
          if (RankerRank >= 248 && RankerRank != 1 && RankerRank != 0) {
            noblox.promote(GroupId, UserId).then(function(){
              noblox.getUsernameFromId(UserId).then(function(Username){
                noblox.getRankNameInGroup(GroupId, UserId).then(function(Role){
                  console.log('<:check:1090810369297100850> Successfully promoted **' + Username + '** to **' + Role + '**.' + ' [' + RankerId + ']');
                  res.json('<:check:1090810369297100850> Successfully promoted **' + Username + '** to **' + Role + '**.');
                }).catch(function(Error){
                  console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
                  res.json('<:error:1090815857078304820> `' + Error + '`');
                })
              }).catch(function(Error){
                console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
                res.json('<:error:1090815857078304820> `' + Error + '`');
              })
            }).catch(function(Error){
              console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
              res.json('<:error:1090815857078304820> `' + Error + '`');
            }).catch(function(Error){
              console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
              res.json('<:error:1090815857078304820> `' + Error + '`');
            })
          } else {
            console.log('<:error:1090815857078304820> `You do not have permission to use this command.`' + ' [' + RankerId + ']');
            res.json('<:error:1090815857078304820> `You do not have permission to use this command.`');
          }
        } else {
          console.log('<:error:1090815857078304820> `You cannot promote this user because of their rank.`' + ' [' + RankerId + ']');
          res.json('<:error:1090815857078304820> `You cannot promote this user because of their rank.`');
        }
      }).catch(function(Error){
        console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
        res.json('<:error:1090815857078304820> `' + Error + '`');
      })
    }).catch(function(Error){
      console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
      res.json('<:error:1090815857078304820> `' + Error + '`');
    })  
  } else {
    console.log('<:error:1090815857078304820> `Internal Error: Provided token ' + GivenToken + ' is invalid.`' + ' [' + RankerId + ']')
    res.json('<:error:1090815857078304820> `Internal Error: Provided token is invalid.`')
  }
})

app.get('/demote', (req, res) => {
  var UserId = req.query['userid'];
  var GivenToken = req.query['token'];
  var RankerId = req.query['rankerid'];
  
  if (GivenToken == Token) {
    noblox.getRankInGroup(GroupId, UserId).then(function(UserRank){     
      noblox.getRankInGroup(GroupId, RankerId).then(function(RankerRank){        
        if (RankerRank >= 248 && RankerRank != 1 && RankerRank != 0) {          
          if (UserRank <= 6 && UserRank > 3) {           
            noblox.demote(GroupId, UserId).catch(function(Error){              
              console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
              res.json('<:error:1090815857078304820> `' + Error + '`');
            }).then(function(){
              noblox.getUsernameFromId(UserId).then(function(Username){
                noblox.getRankNameInGroup(GroupId, UserId).then(function(Role){ 
                  console.log('<:check:1090810369297100850> Successfully demoted **' + Username + '** to **' + Role + '**.' + ' [' + RankerId + ']');
                  res.json('<:check:1090810369297100850> Successfully demoted **' + Username + '** to **' + Role + '**.');
                }).catch(function(Error){
                  console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
                  res.json('<:error:1090815857078304820> `' + Error + '`');
                })
              }).catch(function(Error){
                console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
                res.json('<:error:1090815857078304820> `' + Error + '`');
              })
            }).catch(function(Error){
              console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + RankerId + ']');
              res.json('<:error:1090815857078304820> `' + Error + '`');
            })
          } else {
            console.log('<:error:1090815857078304820> `You cannot demote this user because of their rank.`' + ' [' + RankerId + ']');
            res.json('<:error:1090815857078304820> `You cannot demote this user because of their rank.`');
          }
        } else {
          console.log('<:error:1090815857078304820> `You do not have permission to use this command.`' + ' [' + RankerId + ']');
          res.json('<:error:1090815857078304820> `You do not have permission to use this command.`');
        }
      }) 
    })
  } else {
    console.log('<:error:1090815857078304820> `Internal Error: Provided token ' + GivenToken + ' is invalid.`' + ' [' + RankerId + ']');
    res.json('<:error:1090815857078304820> `Internal Error: Provided token is invalid.`');
  }
})

app.get('/exile', (req, res) => {
  var UserId = req.query['userid'];
  var GivenToken = req.query['token'];
  var KickerId = req.query['kickerid'];
  
  if (GivenToken == Token){
    
    noblox.getRankInGroup(GroupId, KickerId).then(function(KickerRank){
      noblox.getRankInGroup(GroupId, UserId).then(function(UserRank){
        if (KickerRank >= 254 && KickerRank != 1 && KickerRank != 0) {
          if (KickerRank > UserRank) {
            noblox.exile(GroupId, UserId).catch(function(Error){
              console.log('<:error:1090815857078304820> `' + Error + '`' + ' [' + KickerId + ']');
              res.json('<:error:1090815857078304820> `' + Error + '`');
            }).then(function(){
              noblox.getUsernameFromId(UserId).then(function(Username){
                console.log('<:check:1090810369297100850> Successfully exiled **' + Username + '** from the group.' + ' [' + KickerId + ']');
                res.json('<:check:1090810369297100850> Successfully exiled **' + Username + '** from the group.');
              }).catch(function(Error){
                console.log('<:error:1090815857078304820> `' + Error + '`');
                res.json('<:error:1090815857078304820> `' + Error + '`');
              })
            })
          } else {
            console.log('<:error:1090815857078304820> `Error: You cannot kick a user with a rank higher than, or equal to your own.`' + ' [' + KickerId + ']');
            res.json('<:error:1090815857078304820> `Error: You cannot kick a user with a rank higher than, or equal to your own.`');
          }
        } else {
          console.log('<:error:1090815857078304820> `You do not have permission to use this command.`' + ' [' + KickerId + ']');
          res.json('<:error:1090815857078304820> `You do not have permission to use this command.`');
        }
      })
    }).catch(function(Error){
      console.log('<:error:1090815857078304820> `' + Error + '`');
      res.json('<:error:1090815857078304820> `' + Error + '`');
    }).catch(function(Error){
      console.log('<:error:1090815857078304820> `' + Error + '`');
      res.json('<:error:1090815857078304820> `' + Error + '`');
    })
  } else {
    console.log('<:error:1090815857078304820> `Internal Error: Provided token ' + GivenToken + ' is invalid.`' + ' [' + KickerId + ']');
    res.json('<:error:1090815857078304820> `Internal Error: Provided token is invalid.`');
  }
})

app.get('/shout', (req, res) => {
  var Shout = req.query['message'];
  var GivenToken = req.query['token'];
  var ShouterId = req.query['shouterid'];
  
  if (GivenToken == Token) {
    noblox.getRankInGroup(GroupId, ShouterId).then(function(ShouterRank){
      if (ShouterRank >= 254 && ShouterRank != 1 && ShouterRank != 0) {
        noblox.shout(GroupId, Shout).then(function(){
          console.log('<:check:1090810369297100850> Successfully set the group shout to `' + Shout + '`. [' + ShouterId + ']');
          res.json('<:check:1090810369297100850> Successfully set the group shout to `' + Shout + '`.');
        }).catch(function(Error){
          console.log('<:error:1090815857078304820> `' + Error + '`');
          res.json('<:error:1090815857078304820> `' + Error + '`');
        })
      } else {
        console.log('<:error:1090815857078304820> `You do not have permission to use this command.`' + ' [' + ShouterId + ']');
        res.json('<:error:1090815857078304820> `You do not have permission to use this command.`');
      }
    }).catch(function(Error){
      console.log('<:error:1090815857078304820> `' + Error + '`');
      res.json('<:error:1090815857078304820> `' + Error + '`');
    })
  } else {
    console.log('<:error:1090815857078304820> `Internal Error: Provided token ' + GivenToken + ' is invalid.`' + ' [' + ShouterId + ']');
    res.json('<:error:1090815857078304820> `Internal Error: Provided token is invalid.`');
  }
})

app.get('/getrank', (req, res) => {
  var UserId = req.query['userid']

  noblox.getRankNameInGroup(GroupId, UserId).then(function(Rank){
    noblox.getUsernameFromId(UserId).then(function(Username){
      res.json('<:check:1090810369297100850> **' + Username + '\'s** rank is **' + Rank + '**.')
      console.log('<:check:1090810369297100850> **' + Username + '\'s** rank is **' + Rank + '**.')
    }).catch(function(Error){
      res.json('<:error:1090815857078304820> `' + Error + '`')
      console.log('<:error:1090815857078304820> `' + Error + '`')
    })
  }).catch(function(Error){
    res.json('<:error:1090815857078304820> `' + Error + '`')
    console.log('<:error:1090815857078304820> `' + Error + '`')
  })
})

// Admin Bot

app.get('/uptime', (req, res) => {
  res.json('Request sent.')
})
				
// Misc

app.listen(process.env.PORT, () => {});
