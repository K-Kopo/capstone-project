const bookshelf = require("../bookshelf");

const Donation = bookshelf.model("Donation", {
    tableName: "donations",
    user: function () {
        return this.belongsTo("User")
    }
});

module.exports = Donation;