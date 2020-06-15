var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            freezeTableName: true,
            instanceMethods: {
                generateHash(password) {
                    return bcrypt.hash(password, bcrypt.genSaltSync(8));
                },
                validPassword(password) {
                    return bcrypt.compare(password, this.password);
                }
            }
        });
        
        User.associate = (models) => {
            User.hasMany(models.Movies, {
                onDelete: "cascade"
            });
        };
        //  User.associate = function(models){
        //     User.belongsToMany(models.Flix, {
        //         through: "Movies",
        //         as: "user",
        //         foreignKey: "userID",
        //         otherKey: "flixID"
        //     });
        // }
    return User;
};