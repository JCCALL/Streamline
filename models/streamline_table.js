
module.exports = function (sequelize, DataTypes) {
    var Streamline = sequelize.define("Streamline", {
        movie: {
           type: DataTypes.STRING,
           allowNull: false
        }, 
        description:{ 
            type: DataTypes.TEXT
        },
        watchlist:{ 
            type: DataTypes.BOOLEAN
             
        },
        loved:{ 
            type: DataTypes.BOOLEAN
        },
        watched:{ 
            type: DataTypes.BOOLEAN
        }
    });

     Streamline.asscociate = function(models){
        Streamline.hasMany(models.user_table, {
            onDelete: "cascade"
         })
     }
    return Streamline;
};