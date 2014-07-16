angular.module("app").controller("MainController", function ($scope, socket) {
  socket.bindToScope($scope);
});