const { validate, creepy } = require("../HashingPassword/hashPassword");
const UsersData = require('../assets/user.json')

module.exports = (request, response) => {

    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[ 0 ];

    switch (url) {

        case "/api/login/update":
            updateUserDetails(request,response)
            response.end();
            break;

        // response for unexpected get requests
        default:
            response.statusCode = 400;
            response.write(`CANNOT PUT ${request.url}`);
            response.end();
            break;

    }
};

const updateUserDetails = (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;
    const Users = req.posts;

    // Filter user from the users array by username and password
    const user = Users.find(u => { return u.email === email; });
    if (!user) {
        res.write('Please Signup First, Signup: http://localhost:4000/api/signup');
        return res.end();
    }
    console.log('password', password, user.hash, user.salt);
    let validated = validate(password, user.hash, user.salt);
    if (validated) {
        const creeped = creepy(password);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        user.username = req.body.username;
        user.email = req.body.email;
        user.salt = creeped.salt;
        user.hash = creeped.hash;

        res.write(`Updated Done Mr/Ms ${user.username}`);
    } else {
        return res.write('Username or password incorrect');
    }
}