module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("movies", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    
    // Movies.associate = (models) =>{
    //     Movies.belongsTo(models.Auser, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Movies
};
