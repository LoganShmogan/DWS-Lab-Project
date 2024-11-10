const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const dbConnection = require('../config/database');

const User = dbConnection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false, // This line disables the automatic timestamp fields
    hooks: {
        beforeCreate: async (user) => {
            console.log("Hashing password for:", user.username);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

User.prototype.validPassword = async function(password) {
    if (bcrypt.compare(password, this.password)) {
        console.log("Password Compared successfully");
        return await bcrypt.compare(password, this.password);
    } else {
        console.log("Password not compared error");
    }
};

module.exports = User;