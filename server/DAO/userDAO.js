const bcrypt = require('bcrypt');
const User = require('../models/user');
class UserDAO {



    static async authenticateUser(username, password) {
        try {
            if (username === "root" && password === "root") {
                console.log("зайшов адмін")
                return { username: "root", role: "admin" };
            } else {
                throw new Error('Неправильне ім\'я користувача або пароль');
            }
        } catch (error) {
            throw new Error('Помилка авторизації: ' + error.message);
        }
    }


}

module.exports = UserDAO;
