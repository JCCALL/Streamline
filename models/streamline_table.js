
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
        description:{ 
            type: DataTypes.TEXT
        },
        watchlist:{ 
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
             
        },
        loved:{ 
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        },
        watched:{ 
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
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