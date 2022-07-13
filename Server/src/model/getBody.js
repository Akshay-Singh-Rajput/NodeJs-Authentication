const UsersData = require('../assets/user.json')

module.exports = (request, response, next) => {
    let data = [];

    // assemble stream of data from request body
    request.on("data", dataChunk => {
        data.push(dataChunk);
    });

    request.on("end", () => {
        request.body = Buffer.concat(data).toString();
        if (request.headers[ "content-type" ] === "application/json") {

            request.body = JSON.parse(request.body);
        }

        // move on to next step in handling respone
        next(request, response);
    });
};