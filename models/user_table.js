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
        
        User.associate= (models) => {
            User.hasMany(models.Streamline, {
                onDelete: "cascade"
            })
        }
        // User.associate = (models) => {
        //     User.hasMany(models.Streamline, {
        //         as: 'movie1',
        //         foreignKey: 'userId'
        //     })
        // }
    return User;
};