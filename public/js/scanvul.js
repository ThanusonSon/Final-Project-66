// public/scanvul.js
// const http = require('http');
// const bodyParser = require('body-parser');

// const urlParams = new URLSearchParams(window.location.search);
// const url = urlParams.get('url');

// f.js

// ตรวจสอบว่าเราอยู่ในหน้า index.html หรือ report.html
// const isIndexPage = window.location.pathname.includes('scan_web_ver.html');
// const isReportPage = window.location.pathname.includes('report.html');

// ประกาศฟังก์ชันสำหรับส่งข้อมูลไปยังเซิร์ฟเวอร์และเปลี่ยนหน้า
// function sendDataAndRedirect(url) {
//   fetch('/send-to-server', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `url=${encodeURIComponent(url)}`,
//   })
//   .then(response => response.json())
//   .then(responseData => {
//     if (isIndexPage) {
//       window.location.href = `/report.html?data=${responseData.data}`;
//       console.log("/report.html?data="+responseData.data)
//     } else if (isReportPage) {
//     //   document.getElementById('outputId').textContent = responseData.data;
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// // ตรวจสอบว่าอยู่ในหน้า index.html หรือ report.html และทำการกำหนดเหตุการณ์ตามที่เหมาะสม
// if (isIndexPage) {
//   document.getElementById('scanButton').addEventListener('click', () => {
//     const url = document.getElementById('urlInput').value;
//     sendDataAndRedirect(url);
//   });
// } else if (isReportPage) {
//   // ไม่จำเป็นต้องใส่โค้ดในนี้เนื่องจากตัวอย่างเป็นการแสดงผลข้อมูลเท่านั้น
// }

// document.getElementById('outputId').textContent = dataFromServer;

document.getElementById("scanvulbtn").addEventListener("click", () => {
  // const inputUrl = document.getElementById('inputUrl').value;
  const inputUrl = document.getElementsByClassName("linkToScan")[0].value;
  console.log("inputUrl is = ", inputUrl);
  fetchScanvul(inputUrl);
});

// document.addEventListener('DOMContentLoaded', () => {
//     // const url = req.query.url;
//     // const urlParams = new URLSearchParams(window.location.search);
//     // const url = urlParams.get('url');

//     fetchScanvul(url)
//     fetchCertificate(url)
//     fetchLocation(url)
//     fetchWebserverEnginehttp(url)

//     // const reportContent = document.getElementById('reportContent');
//     // reportContent.textContent = `Report for URL: ${url}`;
// });
// sendURLToServer(url)
//     .then(result => {
//         // ทำสิ่งที่คุณต้องการกับผลลัพธ์ที่ได้รับ
//         console.log(result);
//         fetchScanvul(url)
//         fetchCertificate(url)
//         fetchLocation(url)
//         fetchWebserverEnginehttp(url)
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// สมมุติว่า req.body.url คือ URL ที่ได้รับจากเซิร์ฟเวอร์
// const url = req.body.url;
// processURLFromServer(urlFromServer);

function fetchSQL(email, passwd) {
  console.log("client function fetchScanvul working...");
  fetch(`/auth?sqlreqEmail=${email}&sqlreqPass=${passwd}`)
    ///getsqlreq?sqlreq1=${sqlreq1}&sqlreq2=${sqlreq2}
    .then((response) => response.text())
    .then((sqlResult) => {
      console.log(sqlResult);
      console.log(email, pass);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function report(){
  window.location.href = "report.html";
}
function fetchScanvul(url) {
  console.log("client function fetchScanvul working...");
  fetch(`/scanvul?url=${url}`)
    .then((response) => response.text())
    .then((pythonResult) => {
      console.log(pythonResult);
      report();
      document.getElementById("scanvul").innerText = pythonResult;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// async function fetchCertificate(url) {
//     await console.log('client function fetchCertificate working...')

//     try {
//         const response = await fetch(`/certificate?url=${url}`)
//         const certificateResult = await response.json();
//         // const certificateResult = await response.json();
//         // certificateResult = JSON.stringify(certificateResultJson)

//         let result_cert = await certificateResult["daysRemaining"]
//         console.log('result cert = '+ result_cert);
//         let res = await certificateResult["daysRemaining"];
//         let check_day = await Math.sign(certificateResult["daysRemaining"]);
//         // document.getElementById('Certificate').innerText = result["valid"];

//         let cert_check = certificateResult["valid"]

//         console.log('res is '+ res, check_day, cert_check)
//         if (certificateResult["valid"] === true && check_day === 1) {
//             switch (Math.sign(certificateResult['daysRemaining'])) {
//                 case 1:
//                     document.getElementById('Certificate_icon').style.color = 'green';
//                     // document.getElementById("Location_icon").style.color = "green";
//                     document.getElementById("dayremaining").innerText = res + ' remaining';
//                     console.log('มันเข้า 1 ด้วย')
//                     console.log('client function fetchCertificate Success');
//                     break
//                 case -1:
//                     document.getElementById('Certificate_icon').style.color = 'red';
//                     document.getElementById("dayremaining").innerText = daysRemaining + ' day expired';
//                     console.log('มันเข้า -1 ด้วย')
//                     console.log('client function fetchCertificate Success');
//                     break
//                 case 0:
//                     document.getElementById('Certificate_icon').style.color = 'red';
//                     document.getElementById("dayremaining").innerText = 'Today expired';
//                     console.log('มันเข้า 0 ด้วย');
//                     console.log('client function fetchCertificate Success');
//                     break
//                 case -0:
//                     document.getElementById("dayremaining").innerText = '-0';
//                     console.log('มันเข้า -0 ด้วย');
//                     console.log('client function fetchCertificate Success');
//                     break
//                 case NaN:
//                     document.getElementById("dayremaining").innerText = 'NaN';
//                     console.log('มันเข้า NaN ด้วย');
//                     console.log('client function fetchCertificate Success');
//                     break
//                 default:
//                     document.getElementById("dayremaining").innerText = 'อยู่เหนือความคาดหมาย';
//                     console.log('client function fetchCertificate Success');
//                     break

//             }
//         } else if (certificateResult["valid"] == true && check_day == -1) {
//             document.getElementById('Certificate_icon').style.color = 'red';
//             document.getElementById("dayremaining").innerText = 'not extend validate';
//             console.log('client function fetchCertificate Success');
//         } else if (certificateResult["valid"] == false) {
//             document.getElementById('Certificate_icon').style.color = 'red';
//             document.getElementById("dayremaining").innerText = 'Fake validate';
//             console.log('client function fetchCertificate Success');
//         }

//     } catch (error) {
//         console.error('Error:', error);
//     }
//     // fetch()
//     // .then(response => response.text())
//     // .then(result => {

//     // })
//     // .catch(error => {

//     // });

// }

async function fetchCertificate(url) {
  console.log("Client function fetchCertificate working...");

  try {
    const response = await fetch(`/certificate?url=${url}`);
    const certificateResult = await response.json();

    let result_cert = certificateResult["daysRemaining"];
    console.log("result cert = " + result_cert);

    if (certificateResult["valid"] === true && result_cert > 0) {
      document.getElementById("Certificate_icon").style.color = "green";
      document.getElementById("dayremaining").innerText =
        result_cert + " remaining";
      console.log("Client function fetchCertificate Success");
    } else if (certificateResult["valid"] === true && result_cert < 0) {
      document.getElementById("Certificate_icon").style.color = "red";
      document.getElementById("dayremaining").innerText = "Expired";
      console.log("Client function fetchCertificate Success");
    } else if (certificateResult["valid"] === false) {
      document.getElementById("Certificate_icon").style.color = "red";
      document.getElementById("dayremaining").innerText = "Fake validate";
      console.log("Client function fetchCertificate Success");
    } else {
      document.getElementById("Certificate_icon").style.color = "red";
      document.getElementById("dayremaining").innerText = "Invalid";
      console.log("Client function fetchCertificate Success");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

// function fetchLocation(url) {
//     console.log('client function fetchLocation working...');

//     fetch(`/Location?url=${url}`)
//     .then(response => response.text())
//     .then(locationResult => {
//         console.log('client result = '+result);
//         document.getElementById("countryServer").innerHTML = locationResult;
//         document.getElementById("Location_icon").style.color = 'green';
//         // document.getElementById('Location_result').innerText = locationResult;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

function fetchLocation(url) {
  console.log("Client function fetchLocation working...");

  try {
    fetch(`/Location?url=${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((locationResult) => {
        console.log("Client result = " + locationResult);

        const countryServerElement = document.getElementById("countryServer");
        const locationIconElement = document.getElementById("Location_icon");

        countryServerElement.innerHTML = locationResult;
        locationIconElement.style.color = "green";
      })
      .catch((error) => {
        console.error("Location Fetch Error:", error);
      });
  } catch (error) {
    console.log("Fetch Error:", error);

    const countryServerElement = document.getElementById("countryServer");
    const locationIconElement = document.getElementById("Location_icon");

    countryServerElement.innerHTML =
      "An error occurred while fetching location data.";
    locationIconElement.style.color = "red";
  }
}

// function fetchWebserverEnginehttp(url) {
//     console.log('client function fetchWebserverEnginehttp working...');
//     fetch(`/webserver?url=${url}`)
//     .then(response => response.text())
//     .then(WebserverEnginehttpResult => {
//         console.log('client result == '+WebserverEnginehttpResult);

//         if (WebserverEnginehttpResult == undefined) {
//             document.getElementById("Engine_HTTP_icon").style.color = "#969d52";
//             document.getElementById("serverHTTP").innerText = WebserverEnginehttpResult;
//         } else if (WebserverEnginehttpResult === 'An error occurred.'){
//             document.getElementById("Engine_HTTP_icon").style.color = "red";
//             document.getElementById("serverHTTP").innerText = WebserverEnginehttpResult;
//         }
//         else if (WebserverEnginehttpResult.status === 200) {
//             document.getElementById("Engine_HTTP_icon").style.color = "green";
//             document.getElementById("serverHTTP").innerText = WebserverEnginehttpResult;
//         }

//         // document.getElementById('WebserverEnginehttp').innerText = WebserverEnginehttpResult;
//     })
//     .catch(error => {
//         console.error('Webserver Enginehttp Error:', error);
//         document.getElementById("Engine_HTTP_icon").style.color = "red";
//         document.getElementById("serverHTTP").innerText = error;
//     });
// }

function fetchWebserverEnginehttp(url) {
  console.log("Client function fetchWebserverEnginehttp working...");

  try {
    fetch(`/webserver?url=${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((WebserverEnginehttpResult) => {
        console.log("Client result == " + WebserverEnginehttpResult);

        const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
        const serverHTTPElement = document.getElementById("serverHTTP");

        if (WebserverEnginehttpResult === undefined) {
          engineHTTPElement.style.color = "#969d52";
          serverHTTPElement.innerText = WebserverEnginehttpResult;
        } else if (WebserverEnginehttpResult === "An error occurred.") {
          engineHTTPElement.style.color = "red";
          serverHTTPElement.innerText = WebserverEnginehttpResult;
        } else {
          engineHTTPElement.style.color = "green";
          serverHTTPElement.innerText = WebserverEnginehttpResult;
        }
      })
      .catch((error) => {
        console.error("Webserver Enginehttp Error:", error);

        const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
        const serverHTTPElement = document.getElementById("serverHTTP");

        engineHTTPElement.style.color = "red";
        serverHTTPElement.innerText = error;
      });
  } catch (error) {
    console.error("Fetch Error:", error);
    const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
    const serverHTTPElement = document.getElementById("serverHTTP");
    engineHTTPElement.style.color = "red";
    serverHTTPElement.innerText = "An error occurred while making the request.";
  }
}
