const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
    tableName: "users",
    donations: function () {
        return this.hasMany("Donation")
    }
});

module.exports = User;