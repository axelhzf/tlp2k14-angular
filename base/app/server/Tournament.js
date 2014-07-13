var _ = require("underscore");
var Match = require("./Match");

function Tournament (name, maxUsers) {
  this.id = _.uniqueId("tournament_");
  this.name = name;
  this.maxUsers = maxUsers || 4;
  this.users = [];
  this.activeMatch = [];
  this.bracket;
}


function emptyRound (matchPerRound) {
  var result = [];
  for (var i = 0; i < matchPerRound; i++) {
    result.push([
      {name: "", id: -1},
      {name: "", id: -1}
    ]);
  }
  return result;
}

Tournament.prototype = {
  start: function () {
    var users = this.users;
    var rounds = Math.log(users.length) / Math.log(2);
    this.brackets = [];
    for (var round = rounds; round > 0; round--) {
      var matchPerRound = Math.pow(2, round) / 2;
      this.brackets.push(emptyRound(matchPerRound));
    }
    this.assignedMatch = 0;
    this.currentMatchNumber = 0;
    _.each(users, this.classifyUser, this);
  },
  userWin: function (user) {
    this.currentMatchNumber++;
    if (this.isEnded()) {
      this.brackets.push([user]);
    } else {
      this.classifyUser(user);
    }
  },
  classifyUser: function (user) {
    var match = this._matchByGlobalNumber(this.assignedMatch);
    if (match[0].id === -1) {
      match[0] = user;
    } else {
      match[1] = user;
      this.assignedMatch += 1;
    }
  },
  _matchByGlobalNumber: function (globalNumber) {
    globalNumber = (this.users.length - 1) - globalNumber;
    var round = Math.floor(log2(globalNumber));
    var matchRoundNumber = Math.pow(2, round + 1) - globalNumber - 1;
    var match = this.brackets[this.brackets.length - round - 1][matchRoundNumber];
    return match;
  },
  getCurrentMatch: function () {
    var match = this._matchByGlobalNumber(this.currentMatchNumber);
    var user1 = match[0];
    var user2 = match[1];
    return new Match(user1, user2);
  },
  isEnded: function () {
    return this.currentMatchNumber >= this.users.length - 1;
  }
}

function log2 (n) {
  return Math.log(n) / Math.log(2);
}

module.exports = Tournament;
