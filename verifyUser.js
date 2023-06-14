const axios = require("axios")

async function verifyUser(request, response, next) {
    console.log('req url is ' + request.baseUrl)
    
    let auth = request.headers.authorization;
    console.log('auth is ' + auth)
    if (auth !== undefined) {
        let token = auth.split(" ")[1];
        let headers = {
            Authorization: `Bearer ${token}`
        }
        let response = await axios.get(process.env.AUTH_DOMAIN, { headers: headers });
        request.user = response.data;
    }
    next();
}

module.exports = verifyUser;