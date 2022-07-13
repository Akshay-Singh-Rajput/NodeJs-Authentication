module.exports = (request, response) => {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[ 0 ];
    console.log(url)

    switch (url) {

        case "/":
            // if the id query is present return the show result
            if (request.query.searchParams.get("id")) {
                const id = request.query.searchParams.get("id");
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(request.posts[ id ]));
                response.end();
            } else {
                // else return all posts (index)
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(request.posts));
                response.end();
            }
            break;

        // response for unexpected get requests
        default:
            response.statusCode = 400;
            response.write(`CANNOT GET ${request.url}`);
            response.end();
            break;

    }
};