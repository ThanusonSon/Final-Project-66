const { rejects } = require('assert');
const https = require('https');
const http = require('http');



function checkWebServerEngineHTTP(url) {
    console.log("check Engine HTTP");
    // `https://${check.startsWith("www.") ? check : "www." + check}`;
    
    return new Promise((resolve, reject) => {
        if (url.startsWith("https://")){
            const new_url = new URL(url)
            const url_en = "https://"+new_url.host
            console.log("url_en = "+ url_en)
            https.get(url_en , (res) => {
                let header = res.headers["server"];
                console.log(`The HTTP server engine is: ${header}`);
                resolve(header);
            }).on('error', (error) => {
                reject(error)
            });
        }else if (url.startsWith("http://")){
            const new_url = new URL(url)
            const url_en = "http://"+new_url.host
            console.log("url_en = "+ url_en)
            http.get(url_en , (res) => {
                let header = res.headers["server"];
                console.log(`The HTTP server engine is: ${header}`);
                resolve(header);
            }).on('error', (error) => {
                reject(error)
            });
        } else {
            try{
                https.get(url_en , (res) => {
                    let header = res.headers["server"];
                    console.log(`The HTTP server engine is: ${header}`);
                    resolve(header);
                }).on('error', (error) => {
                    reject(error)
                });
            } catch (error){
                http.get(url_en , (res) => {
                    let header = res.headers["server"];
                    console.log(`The HTTP server engine is: ${header}`);
                    resolve(header);
                }).on('error', (error) => {
                    reject("No Engine HTTP");
                });
            } 
        }
        
    })
}
// const { rejects } = require('assert');
// const https = require('https');
// const http = require('http');

// const new_url = new URL(url)
// const url_en = new_url.host
// console.log("url_en = "+ url_en)

// function checkWebServerEngineHTTP(url) {
//     console.log("check Engine HTTP");

//     return new Promise((resolve, reject) => {
//         if (url.startsWith("https://")) {
//             const new_url = new URL(url)
//             const url_en = "https://"+new_url.host
//             console.log("url_en = "+ url_en)
//             https.get(url_en , (res) => {
//                 let header = res.headers["server"];
//                 console.log(`The HTTP server engine is: ${header}`);
//                 resolve(header);
//             }).on('error', (error) => {
//                 reject(error);
//             });
//         } else if (url.startsWith("http://")) {
//             const new_url = new URL(url)
//             const url_en = "http://"+new_url.host
//             console.log("url_en = "+ url_en)
//             http.get(url_en , (res) => {
//                 let header = res.headers["server"];
//                 console.log(`The HTTP server engine is: ${header}`);
//                 resolve(header);
//             }).on('error', (error) => {
//                 reject(error);
//             });
//         } else {
//             const new_url = new URL(url)
//             const url_en = "https://"+new_url.host
//             console.log("url_en = "+ url_en)
//             https.get(url_en , (res) => {
//                 let header = res.headers["server"];
//                 console.log(`The HTTP server engine is: ${header}`);
//                 resolve(header);
//             }).on('error', (error) => {
//                 reject(error);
//             });
//         }
//     });
// }

// module.exports = { checkWebServerEngineHTTP };


module.exports = { checkWebServerEngineHTTP }