
module.exports = function (sequelize, DataTypes) {
    var Streamline = sequelize.define("Streamline", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        movie: {
           type: DataTypes.STRING,
           allowNull: false
        }, 
        image:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        imdb: {
            type: DataTypes.STRING,
        },
        imdbID: {
            type: DataTypes.STRING,
        },
        watched:{ 
            type: DataTypes.BOOLEAN,
            default: false,
        }
    });
    
    //lines 35 to 42 are to help join this table with the user table it is blocked because it will not let the server run at this point.
    //  Streamline.associate = function(models){
    //      Streamline.hasMany(models.User, {
    //         through: "Movies",
    //         as: "movie",
    //         foreignKey: "streamlineID",
    //         otherKey: "userID"
    //      });
    //  }
    return Streamline;
};