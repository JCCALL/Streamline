
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

    Streamline.associate = (models) => {
        Streamline.belongsTo(models.Users, {
            foreignKey: {
                allowNull: true
              }
        });
    };
     
    
    return Streamline;
};