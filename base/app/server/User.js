var _ = require("underscore");

function User (name, socket) {
  this.id = _.uniqueId("user_");
  this.name = name;
  this.socket = socket;
  this.socket.user = this;
}

User.prototype = {
  toJSON: function () {
    return _.omit(this, "socket");
  }
}

module.exports = User;