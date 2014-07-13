app.factory("socket", function ($location) {
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
});



//    setToScope({
//      state: "tournament:chart",
//      tournament: {
//        name: "Torneo de la muerte",
//        maxUsers: 4,
//        users: [
//          {name: "Pepe"},
//          {name: "Juan"}
//        ],
//        brackets: [
//          [
//            [
//              {name: "Pepe", id: 1},
//              {name: "Juan", id: 2}
//            ],
//            [
//              {name: "Pepe", id: 3},
//              {name: "Juan", id: 4}
//            ]
//          ],
//          [
//            [
//              {name: "", id: -1},
//              {name: "", id: -1}
//            ]
//          ],
//          [
//            [
//              {name: ""}
//            ]
//          ]
//        ]
//      },
//      user: {
//        id: 1,
//        name: "Axel"
//      },
//      activeMatch: {
//        user1: {
//          id: 1, name: "Axel"
//        },
//        user2: {
//          id: 2, name: "Andrea"
//        }
////    play1: "rock",
////    play2: "spock",
////    winner: {
////      name: "Axel"
////    }
//      },
//      winner: "PEPE"
//    })