// Import http library
const http = require("http");
// use env variable to define port with default
const PORT = process.env.PORT || 4000;
// import the url standard library for parsing query string
require("url");

// import data
const UsersData = require('./assets/user.json')

// Import our routers
const get = require("./controllers/get");
const post = require("./controllers/post");
const put = require("./controllers/put");
// add an extra R since delete is a reserved word
const deleteR = require("./controllers/delete");
// require function to parse body
const getBody = require("./model/getBody");

//create our server object, pass server function as callback argument
const server = http.createServer((request, response) => {

    // add the data to the request object so our routes can access it
    request.posts = UsersData;

    // adding the query to the request object
    request.query = new URL(request.url, `http://${request.headers.host}`);

    // handle request based on method then URL
    switch (request.method) {
        case "GET":
            getBody(request, response, get);
            break;

        case "POST":
            getBody(request, response, post);
            break;

        case "PUT":
            getBody(request, response, put);
            break;

        case "DELETE":
            getBody(request, response, deleteR);
            break;

        default:
            // Send response for requests with no other response
            response.statusCode = 400;
            response.write("No Response");
            response.end();
    }
});



// get the server to start listening
server.listen(PORT, (err) => {
    // error checking
    err ? console.error(err) : console.log(`listening on port ${PORT}`);
});