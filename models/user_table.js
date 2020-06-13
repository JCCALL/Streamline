var bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('users', {
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

         User.associate = function(models){
            User.belongsTo(models.streamline_table,{
               foreignKey: {
                   allowNull: false
                 }
            })
        }
    return User;
};