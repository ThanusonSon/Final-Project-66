const dns = require("dns");
const axios = require("axios");
const https = require("https");

function checkLocation(url) {
  console.log(url + " from func");
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // check Location

      // const dns = require("dns");
      // const axios = require('axios');

      //===============================================================================================

      // http://api.geonames.org/countryInfoJSON?username=location_f&country=SG
      async function getCountryName(abbreviation) {
        try {
          const response = await axios.get(
            `http://api.geonames.org/countryInfoJSON?username=location_f&country=${abbreviation}`
          );
          const data = response.data.geonames[0];
          return data.countryName;
        } catch (error) {
          console.error(error);
          throw new Error(`Failed to get full name for ${abbreviation}`);
        }
      }

      //===============================================================================================

      // const new_url_for_dns = new URL(url);
      // const dns_url = new_url_for_dns.host

      // url = new URL(url);
      // console.log("DNS URL = "+url);

      dns.lookup(url, (err, address, family) => {
        // http://www.nkk.ac.th/
        if (err) {
          // document.getElementById("Location_icon").style.color = "green";
          console.error(`DNS lookup failed: ${err}`);
          reject(err);
        } else {
          console.log(`IP address: ${address}`);
          console.log(`Address family: IPv${family}`);
          // resolve(address, family)

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
                    console.log("location sdadasd= " + fullName);
                    // console.log("location object = "+location)
                    console.log("Check Location Successful");

                    const result = {
                        fullName: fullName,
                        location: location
                    };
                    resolve(result);

                    // document.getElementById("countryServer").innerHTML = fullName;
                    // document.getElementById("Location_icon").style.color = "green";
                    // outputs "United States of America"
                  })
                  .catch((error) => {
                    console.error(error);
                    reject(error);
                    // document.getElementById("countryServer").innerHTML = "API Error";
                    // document.getElementById("Location_icon").style.color = "red";
                  });

                // https://restcountries.com/#api-endpoints-v2-full-name
                // https://restcountries.com/v2/name/US?fullText=true
              });
            })
            .on("error", (err) => {
              // document.getElementById("Location_icon").style.color = "red";
              console.error(`IP geolocation failed: ${err}`);
              reject(err);
            });
        }
      });

      // resolve(err, address, family)
    }, 500);
  });
}

module.exports = { checkLocation };
