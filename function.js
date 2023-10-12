// ipc.on('python-result', (event, data) => {
//   const pythonResultElement = document.getElementById('pythonResult');
//   pythonResultElement.innerText = data;
// });


const sslChecker = require('ssl-checker');
const https = require('https');
const dns = require('dns');
const axios = require('axios');


async function checkCertificate(url) {
    try {
        const response = await new Promise((resolve, reject) => {
            https.get('https://api.crt.sh/?q=' + encodeURIComponent('"' + url + '"'), (res) => {
                resolve(res);
            }).on('error', (error) => {
                reject(error);
            });
        });

        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const certificates = data.split('\n');
            const relevantCertificates = certificates.filter(certificate => certificate.includes(url));
            
            relevantCertificates.forEach((certificate, index) => {
                const certificateInfo = JSON.parse(certificate);
                console.log(`ใบเซิร์ติฟิเคต์ที่ ${index + 1}:`);
                console.log(`ระบบ: ${certificateInfo.issuer_name}`);
                console.log(`วันหมดอายุ: ${certificateInfo.not_after}`);
                console.log(`ใบเซิร์ติฟิเคต์ ID: ${certificateInfo.id}`);
                console.log('---------------------------');
            });
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
    }
}

// เรียกใช้งานฟังก์ชัน checkCertificate
// const urlToCheck = 'example.com'; // ใส่ URL ที่ต้องการเช็คที่นี่





// console.log("scanvul.js is ready")



// function cleanURL() {
//     let check = document.getElementsByClassName("linkToScan").value;
//     console.log('clean URL')
//     let url = ''
//     if (check.includes("://")) {
//         url = new URL(check).hostname
//     } else {
//         url = check
//     }
//     return url
// }

function cleanURL() {
    let check = document.getElementsByClassName("linkToScan")[0].value;
    console.log('clean URL')
    let url = '';
    if (check.includes("://")) {
        url = new URL(check).hostname;
    } else if (check.includes("www.")) {
        url = check.split("www.")[1];
    } else {
        url = check;
    }
    return url;
}

// async function scanSite() {
//     await certificateChecker();
//     await checkLocation();
//     await checkWebServerEngineHTTP();
//     await console.log("Scan Site Successful");
// }

// const sslChecker = require("ssl-checker");

let scan = document.getElementById("scanvulbtn")

checkCertificate(scan);

scan.addEventListener("click", () => {
    console.log("scan is activate")
    //setDefalut
    // document.getElementById("Certificate_icon").style.color = "#797979";
    document.getElementById("dayremaining").innerHTML = "";

    // document.getElementById("Location_icon").style.color = "#797979";
    document.getElementById("countryServer").innerHTML = "";

    // document.getElementById("Engine_HTTP_icon").style.color = "#797979";
    document.getElementById("serverHTTP").innerHTML = "";

    // document.getElementById("Web_Vulnerability_icon").style.color = "#797979";
    document.getElementById("Web_Vulnerability_boxtext").innerHTML = "";

    console.log("scan is activate")

    // scanSite()

    let check = document.getElementsByClassName("linkToScan").value;
    // let showResult = document.getElementById("cerResults");


    console.log(check);
    console.log("clean URL");
    let url = "";
    if (check.includes("://")) {
        url = new URL(check).hostname;
    } else {
        url = check;
    }

    // let url = new URL(check).hostname
    console.log(url)


    // check certificate valid

    console.log("check certificate valid");

    console.log(url);
    sslChecker(url, "GET", 443).then((result) => {
        let res = result["daysRemaining"];
        let daysRemaining = "Time remaining " + result["daysRemaining"] + " day";
        let validate = "Validate = " + result["valid"];
        let validFrom =
            "Start valid from " + new Date(result["validFrom"]).toLocaleString();
        let validTo =
            "Expire valid to " + new Date(result["validTo"]).toLocaleString();
        let validFor = "Valid for " + result["validFor"];

        let check_day = Math.sign(result["daysRemaining"]);

        console.log("Math.sign = " + Math.sign(result["daysRemaining"]));
        console.log(validate);

        if (result["valid"] == true && check_day == 1) {
            switch (Math.sign(result["daysRemaining"])) {
                case 1:
                    document.getElementById("Certificate_icon").style.color = "green";
                    document.getElementById("dayremaining").innerHTML =
                        res + " remaining";
                    console.log("มันเข้า 1 ด้วย");
                    break;
                case -1:
                    document.getElementById("Certificate_icon").style.color = "red";
                    document.getElementById("dayremaining").innerHTML =
                        daysRemaining + " day expired";
                    console.log("มันเข้า -1 ด้วย");
                    break;
                case 0:
                    document.getElementById("Certificate_icon").style.color = "red";
                    document.getElementById("dayremaining").innerHTML = "Today expired";
                    console.log("มันเข้า 0 ด้วย");
                    break;
                case -0:
                    document.getElementById("dayremaining").innerHTML = "-0";
                    console.log("มันเข้า -0 ด้วย");
                    break;
                case NaN:
                    document.getElementById("dayremaining").innerHTML = "NaN";
                    console.log("มันเข้า NaN ด้วย");
                    break;
                default:
                    document.getElementById("dayremaining").innerHTML =
                        "อยู่เหนือความคาดหมาย";
                    break;
            }
        } else if (result["valid"] == true && check_day == -1) {
            document.getElementById("Certificate_icon").style.color = "red";
            document.getElementById("dayremaining").innerHTML = "not extend validate";
        } else if (result["valid"] == false) {
            document.getElementById("Certificate_icon").style.color = "red";
            document.getElementById("dayremaining").innerHTML = "Fake validate";
        }

        // test only
        // document.getElementById('Certificate_icon').style.color = 'green'
        // document.getElementById("dayremaining").innerHTML = daysRemaining+' remaining';
        // test only
    }).catch((error) => {
        document.getElementById("Certificate_icon").style.color = "red";
        document.getElementById("dayremaining").innerHTML = "Failed to find certificate"

        console.error(`Certificate failed: ${error}`);
    });

    // wrong.host.badssl.com
    // https://badssl.com/
    // https://expired.badssl.com/

    // press enter for execute send input



    //===============================================================================================

    async function getCountryName(abbreviation) {
    try {
        // const response = await axios.get(`http://api.geonames.org/countryInfoJSON?username=location_f&country=${abbreviation}`);
        // const response = await axios.get(`https://restcountries.com/v3.1/alpha/${abbreviation}?fullText=true&fields=name`);
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${abbreviation}?fields=name`);
        const data = response.name.common;
        // return data.countryName;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get full name for ${abbreviation}`);
    }
    }

    //===============================================================================================

    // const dns = require("dns");

    dns.lookup(url, (err, address, family) => {
        if (err) {
            document.getElementById("Location_icon").style.color = "green";
            console.error(`DNS lookup failed: ${err}`);
        } else {
            console.log(`IP address: ${address}`);
            console.log(`Address family: IPv${family}`);

            const https = require("https");

            https
                .get("https://ipinfo.io/" + address + "/json", (res) => {
                    let data = "";

                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    res.on("end", () => {
                        const location = JSON.parse(data);
                        console.log(`City: ${location.city}`);
                        console.log(`Region: ${location.region}`);
                        console.log(`Country: ${location.country}`);

                        getCountryName(location.country)
                        .then((fullName) => {
                            console.log("location = "+fullName)
                            document.getElementById("countryServer").innerHTML = fullName;
                            document.getElementById("Location_icon").style.color = "green";
                        }) // outputs "United States of America"
                        .catch((error) => {
                            console.error(error)
                            document.getElementById("countryServer").innerHTML = "API Error";
                            document.getElementById("Location_icon").style.color = "red";
                        });

                        // https://restcountries.com/#api-endpoints-v2-full-name
                        // https://restcountries.com/v2/name/US?fullText=true
                    });
                })
                .on("error", (err) => {
                    document.getElementById("Location_icon").style.color = "red";

                    console.error(`IP geolocation failed: ${err}`);
                });
        }
    });
});

