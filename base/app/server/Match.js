var _ = require("underscore");

var ROCK = "rock";
var SCISSORS = "scissors";
var PAPER = "paper";

function Match (user1, user2) {
  this.id = _.uniqueId("match_");
  this.user1 = user1;
  this.user2 = user2;
  this.user1.socket.activeMatch = this;
  this.user2.socket.activeMatch = this;
}

var winnerMovements = {
  rock: {
    scissors: true,
    lizard: true
  },
  scissors: {
    paper: true,
    lizard: true
  },
  paper: {
    rock: true,
    spock: true
  },
  lizard: {
    paper: true,
    spock: true
  },
  spock: {
    rock: true,
    scissors: true
  }
};

Match.prototype = {
  userPlay: function (user, play) {
    if (user === this.user1 && !this.play1) {
      this.play1 = play;
    } else if (user === this.user2 && !this.play2) {
      this.play2 = play;
    }
  },
  isEnded: function () {
    return this.play1 && this.play2;
    },
  calculateWinner: function () {
    if (this.play1 === this.play2) {
      //no winner
    } else if (winnerMovements[this.play1][this.play2]) {
      this.winner = this.user1;
    } else {
      this.winner = this.user2;
    }
  },
  reset: function () {
    this.play1 = null;
    this.play2 = null;
  }
};

module.exports = Match;