const crypto = require('crypto');



// CREATE PASSWORD HASH
const creepy = (clear) => {
    // GENERATE RANDOM SALT
    let length = 16;
    let salt = crypto.randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);

    // SHA256 HASH
    let hash = crypto.createHmac("sha256", salt);
    hash.update(clear);
    return {
        salt: salt,
        hash: hash.digest("hex")
    };
};


// VALIDATE PASSWORD
const validate = (userpass, hashedpass, salt) => {
    let hash = crypto.createHmac("sha256", salt);
    hash.update(userpass);
    userpass = hash.digest("hex");
    return userpass === hashedpass;
};



module.exports = {creepy,validate}