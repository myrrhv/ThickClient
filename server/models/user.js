const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Ролі користувачів (можна додати інші ролі за потреби)
        default: 'user' // Роль за замовчуванням
    }
});


const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
