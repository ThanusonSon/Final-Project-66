const { rejects } = require('assert');
const https = require('https');

function checkWebServerEngineHTTP(url) {
    console.log("check Engine HTTP");
    // `https://${check.startsWith("www.") ? check : "www." + check}`;
    
    return new Promise((resolve, reject) => {
        https.get(`https://${url.startsWith("www.") ? url : "www." + url}`, (res) => {
            let header = res.headers["server"];
            console.log(`The HTTP server engine is: ${header}`);

            // if (header === undefined) {
            //     // document.getElementById("Engine_HTTP_icon").style.color = "#969d52";
            //     // document.getElementById("serverHTTP").innerHTML = header;
            //     return undefined;
            // } else {
            //     // document.getElementById("Engine_HTTP_icon").style.color = "green";
            //     // document.getElementById("serverHTTP").innerHTML = header;
            //     return header;
            // }
            resolve(header);
        }).on('error', (error) => {
            reject(error)
        });
    })

}

module.exports = { checkWebServerEngineHTTP }