var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: {
                args: true,
                msg: 'Username already in use.'
            }
        },
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        hooks: {
            beforeCreate: (User) => {
              const salt = bcrypt.genSaltSync();
              User.password = bcrypt.hashSync(User.password, salt);
            }
          },
          instanceMethods: {
            validPassword: function(password) {
              return bcrypt.compareSync(password, this.password);
            }
          }    
    });

    User.associate = (models) => {
        User.hasMany(models.Streamline, {
            onDelete: "cascade"
        })
    }

    return User;
};