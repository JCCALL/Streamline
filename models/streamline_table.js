
module.exports = function (sequelize, DataTypes) {
    var Streamline = sequelize.define("Streamline", {
        text: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Streamline;
};