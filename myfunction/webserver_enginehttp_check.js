const { rejects } = require('assert');
const https = require('https');
const http = require('http');

const axios = require('axios');
const cheerio = require('cheerio');
const { resolve } = require('path');


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
                nginxServer = header.split("-");
                if (nginxServer[0] == "nginx"){
                    CheckVersionNginx(header);
                }
                resolve(header);
            }).on('error', (error) => {
                reject(error);
            });
        }else if (url.startsWith("http://")){
            const new_url = new URL(url)
            const url_en = "http://"+new_url.host
            console.log("url_en = "+ url_en)
            http.get(url_en , (res) => {
                let header = res.headers["server"];
                console.log(`The HTTP server engine is: ${header}`);
                nginxServer = header.split("-");
                if (nginxServer[0] == "nginx"){
                    CheckVersionNginx(header);
                }
                resolve(header);
            }).on('error', (error) => {
                reject(error);
            });
        } else {

            const new_url = new URL(url)
            const url_en = "https://"+new_url.host


            try{
                https.get(url , (res) => {
                    let header = res.headers["server"];
                    console.log(`The HTTP server engine is: ${header}`);
                    nginxServer = header.split("-");
                    if (nginxServer[0] == "nginx"){
                        CheckVersionNginx(header);
                    }
                    resolve(header);
                }).on('error', (error) => {
                    reject(error);
                });
            } catch (error){

                // const new_url = new URL(url)
                // const url_en = "https://"+new_url.host


                http.get(url , (res) => {
                    let header = res.headers["server"];
                    console.log(`The HTTP server engine is: ${header}`);
                    nginxServer = header.split("-");
                    if (nginxServer[0] == "nginx"){
                        CheckVersionNginx(header);
                    }
                    resolve(header);
                }).on('error', (error) => {
                    reject("No Engine HTTP");
                });
            } 
        }
        
    })
}



function CheckVersionNginx(version){
    const nginxVersionUrl = 'http://nginx.org/en/download.html';
    axios.get(nginxVersionUrl)
    .then((response) => {
        if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Find the <h4> element with the text "Stable version"
        const stableVersionHeader = $('center:contains("Stable version")');

        // Get the version from the next <a> element
        const latestVersion = stableVersionHeader.next().find('a').text().split("-");

        if (latestVersion) {
            let latest = latestVersion[3].replace("pgp","");
            latest_position = latest.split(".");
            version_position = version.split(".");
            if (version_position[0] != latest_position[0] && version_position[0] < latest_position[0]){
                console.log(`The latest stable version of Nginx is: ${latest}`);
                let linkDownload_Linux = 'https://nginx.org/download/nginx-'+latest+'.tar.gz';
                let linkDownload_Windows = 'https://nginx.org/download/nginx-'+latest+'.zip';
                console.log(linkDownload_Windows);
                console.log(linkDownload_Linux);
                resolve (linkDownload_Linux,linkDownload_Windows);
            }else if(version_position[1] != latest_position[1] && version_position[1] < latest_position[1]){
                console.log(`The latest stable version of Nginx is: ${latest}`);
                let linkDownload_Linux = 'https://nginx.org/download/nginx-'+latest+'.tar.gz';
                let linkDownload_Windows = 'https://nginx.org/download/nginx-'+latest+'.zip';
                console.log(linkDownload_Windows);
                console.log(linkDownload_Linux);
                resolve (linkDownload_Linux,linkDownload_Windows);
            }else if(version_position[2] != latest_position[2] && version_position[2] < latest_position[2]){
                console.log(`The latest stable version of Nginx is: ${latest}`);
                let linkDownload_Linux = 'https://nginx.org/download/nginx-'+latest+'.tar.gz';
                let linkDownload_Windows = 'https://nginx.org/download/nginx-'+latest+'.zip';
                console.log(linkDownload_Windows);
                console.log(linkDownload_Linux);
                resolve (linkDownload_Linux,linkDownload_Windows);
            }else{
                let return_text = "Current is latest";
                console.log(return_text);
                resolve(return_text);
            }

        } else {
            console.error('Latest stable version not found on the page.');
        }
        } else {
        console.error('Failed to retrieve the Nginx website.');
        }
    })
    .catch((error) => {
        console.error(`An error occurred: ${error.message}`);
    });
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