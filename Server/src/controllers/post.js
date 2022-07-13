const { validate, creepy } = require("../HashingPassword/hashPassword");
const UsersData = require('../assets/user.json')

module.exports = (request, response) => {
    switch (request.url) {
        //signup
        case "/api/signup":
            signup(request,response)
            // request.posts.push(request.body);
            // response.statusCode = 200;
            // response.setHeader("Content-Type", "application/json");
            // response.write(JSON.stringify(request.posts));
            response.end();
            break;

            //login
        case "/api/login":
            login(request,response)
            // request.posts.push(request.body);
            // response.statusCode = 200;
            // response.setHeader("Content-Type", "application/json");
            // response.write(JSON.stringify(request.posts));
            response.end();
            break;

        // response for unexpected get requests
        default:
            response.statusCode = 400;
            response.write(`CANNOT POST ${request.url}`);
            response.end();
    }
};  


const login = (req, res) => {

    console.log('loginbody',req.body);
    // Read username and password from request body
    const { email, password } = req.body;
    const Users =req.posts 

    // Filter user from the users array by username and password
    const user = Users.find(u => { return u.email === email; });
    if(!user){
        res.write('Please Signup First, Signup: http://localhost:4000/api/signup');
        return res.end()
    }
    console.log('password', password, user.hash, user.salt)
    let validated = validate(password, user.hash, user.salt);
    if (validated) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
      res.write(`Welcome ${user.username}`);
    } else {
        return res.write('Username or password incorrect');
    }

}


const signup = (req, res) => {
    console.log("signup reBody", req.body);
    // Read username and password from request body
    const { username, email, password } = req.body;

    const Users = req.posts 
// console.log("users", Users)
    // Filter user from the users array by username and password
    const user = Users.find(u => { return u.email === email; });

    if (user) {
        res.write('User already exits, Login : http://localhost:4000/api/login');
    } else {
        const creeped = creepy(password);

        const newUser = {
            username,
            email,
            salt: creeped.salt,
            hash: creeped.hash

        };

        console.log('akuser', newUser)

        UsersData.push(newUser);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(newUser));
    }
}