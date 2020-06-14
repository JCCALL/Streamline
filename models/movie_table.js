module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("Movies", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    
    return Movies
}
