
module.exports = function (sequelize, DataTypes) {
    var Search = sequelize.define("Search", {
        search: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Search;
};