
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