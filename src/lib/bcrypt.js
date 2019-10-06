const bcrypt = require('bcryptjs');

encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

comparePasswords = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(err) {
        console.log(err);
    }
};

module.exports = { encryptPassword, comparePasswords };