var bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('users', {
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

    return User;
}