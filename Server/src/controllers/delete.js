const { validate } = require("../HashingPassword/hashPassword");
const UsersData = require('../assets/user.json')

module.exports = (request, response) => {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[ 0 ];

    switch (url) {
        case "/account/delete":
            deleteLoginDetails(request, response)
            // const id = request.query.searchParams.get("id");
            // response.statusCode = 200;
            // response.setHeader("Content-Type", "application/json");
            // request.posts.splice(id, 1);
            // response.write(JSON.stringify(request.posts));
            response.end();
            break;

        // response for unexpected get requests
        default:
            response.statusCode = 400;
            response.write(`CANNOT DELETE ${request.url}`);
            response.end();
            break;
    }
};


const deleteLoginDetails = (req, res) => {
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

        Users.splice(Users.findIndex(a => a.email === email), 1)

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.write(`Account Deleted Sucessfully`);
    } else {
        return res.write('Username or password incorrect');
    }
};