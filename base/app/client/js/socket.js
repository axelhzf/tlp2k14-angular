angular.module("app").factory("socket", function ($location) {

//  CONEXIÓN CON EL SERVIDOR
//  -------------------------

//  var socket = io();
//
//  socket.bindToScope = function ($scope) {
//    function setToScope (obj) {
//      _.each(obj, function (value, key) {
//        $scope[key] = value;
//        if (key === "state") {
//          var path = value.replace(/:/, "/");
//          $location.path(path).replace();
//        }
//      });
//      $scope.$apply();
//    }
//    socket.on("set", setToScope);
//  };
//
//  return socket;


// TESTING EN LOCAL

  var socket = {};

  socket.bindToScope = function ($scope) {
    $scope.state = "name";
    $scope.tournaments = [
      {id: 1, name: "Torneo1", maxUsers:4, users: [{name: "u1"}, {name: "u2"}]},
      {id: 2, name: "Torneo2", maxUsers:4, users: [{name: "u1"}, {name: "u2"}]}
    ];
    $scope.tournament = {
      id: 3,
      name: "Torneo de la muerte",
      maxUsers: 4,
      users: [
        {name: "Pepe"},
        {name: "Juan"}
      ],
      brackets: [
        [
          [
            {name: "Pepe", id: 1},
            {name: "Juan", id: 2}
          ],
          [
            {name: "Pepe", id: 3},
            {name: "Juan", id: 4}
          ]
        ],
        [
          [
            {name: "", id: -1},
            {name: "", id: -1}
          ]
        ],
        [
          [
            {name: ""}
          ]
        ]
      ]
    }
    $scope.user = {
      id: 1,
      name: "Axel"
    };
    $scope.activeMatch = {
      user1: {
        id: 1, name: "Axel"
      },
      user2: {
        id: 2, name: "Andrea"
      },
      play1: "rock",
      play2: "spock",
      winner: {
        name: "Axel"
      }
    };
    $scope.winner = {
      name: "PEPE"
    };


    var path = $scope.state.replace(/:/, "/");
    $location.path(path).replace();
  };

  socket.emit = function () {
    console.log("emit", arguments);
  };

  return socket;

});



