var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var _ = require("underscore");
var User = require("./User");
var Match = require("./Match");
var Tournament = require("./Tournament");

var staticPath = __dirname + '/../client';
app.use(express.static(staticPath));

var users = [];
var tournaments = [];

io.on("connection", function (socket) {
  socket.emit("set", {state: "name"});

  socket.on("disconnect", function () {
    users = _.without(users, socket.user);
  });

  socket.on("user:add", function (name) {
    var existingUser = _.findWhere(users, {name: name});
    if (existingUser) {
      socket.emit("set", {error: "Name " + name + " already taken"});
    } else {
      var user = new User(name, socket);
      users.push(user);
      socket.emit("set", {state: "tournaments", user: user, tournaments: tournaments, error: null});
    }
  });

  socket.on("tournament:add", function (opts) {
    var tournament = new Tournament(opts.name, opts.maxUsers);
    tournaments.push(tournament);
    userJoinTournament(tournament);
    io.emit("set", {tournaments: tournaments});
  });

  socket.on("tournament:join", function (tournamentId) {
    var tournament = _.findWhere(tournaments, {id: tournamentId});
    if (tournament) {
      userJoinTournament(tournament);
    }
  });

  function userJoinTournament (tournament) {
    if (tournament && !socket.tournament) {
      tournament.users.push(socket.user);
      socket.tournament = tournament;
      socket.join(tournament.id);

      if (tournament.users.length === tournament.maxUsers) {
        tournament.start();
        io.to(tournament.id).emit("set", {tournament: tournament, state: "tournament:chart"});
        tournaments = _.without(tournaments, tournament);
        io.emit("set", {tournaments: tournaments});
      } else {
        io.to(tournament.id).emit("set", {tournament: tournament, state: "tournament:wait"});
        io.emit("set", {tournaments: tournaments});
      }
    }
  }

  socket.on("tournament:nextMatch", function () {
    var tournament = socket.tournament;
    var match = socket.tournament.getCurrentMatch();
    io.to(tournament.id).emit("set", {activeMatch: match, state: "match"});
  });

  socket.on("match:play", function (play) {
    var match = socket.activeMatch;
    match.userPlay(socket.user, play);

    if (match.isEnded()) {
      match.calculateWinner();
      var tournament = socket.tournament;
      io.to(tournament.id).emit("set", {activeMatch: match, state: "match"});

      setTimeout(function () {
        if (!match.winner) {
          match.reset();
          io.to(tournament.id).emit("set", {activeMatch: match, state: "match"});
        } else {
          tournament.userWin(match.winner);
          if (tournament.isEnded()) {
            io.to(tournament.id).emit("set", {tournament: tournament, winner: match.winner, state: "tournament:winner"});
          } else {
            io.to(tournament.id).emit("set", {tournament: tournament, state: "tournament:chart"});
          }
        }
      }, 5000);

    }
  });

  socket.on("tournament:newTournament", function () {
    socket.tournament = null;
    socket.emit("set", {state: "tournaments", tournaments: tournaments, error: null});
  });

});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});