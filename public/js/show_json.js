


var currentDate = new Date();
let count_print = 1;
// @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
document.addEventListener("DOMContentLoaded", function () {
    // C:\Users\ratha\Downloads\vulnerability_web\public\python\zap_report.json
    fetch("/python/zap_report.json") 
        .then(response => response.json())
        .then(data => {
            const alertTable = document.getElementById("alertTable").getElementsByTagName('tbody')[0];
            let number = 0;
            data.alerts.forEach(alert => {
                
                
                const row = alertTable.insertRow();
                const pluginIdCell = row.insertCell(0);
                const alertCell = row.insertCell(1);
                const riskCodeCell = row.insertCell(2);
                // const confidenceCell = row.insertCell(3);
                const riskDescCell = row.insertCell(3);
                const buttonCell = row.insertCell(4); 
                pluginIdCell.innerHTML = number + 1;
                pluginIdCell.style.textAlign = "center"
                number += 1;
                alertCell.innerHTML = alert.alert;

                riskCodeCell.innerHTML = alert.riskcode;
                
                
                const riskDescription = alert.riskdesc.replace(/\s?\(Low\)|\s?\(High\)|\s?\(Medium\)|\s?\(Informational\)/g, '');
                riskDescCell.innerHTML = riskDescription;

                
                if (riskDescription.includes("High")) {
                    riskDescCell.style.backgroundColor = "red";
                    riskDescCell.style.color = "white";
                    riskDescCell.style.textAlign = "center";
                } else if (riskDescription.includes("Medium")) {
                    riskDescCell.style.backgroundColor = "orange";
                    riskDescCell.style.color = "white";
                    riskDescCell.style.textAlign = "center";
                } else if (riskDescription.includes("Low")) {
                    riskDescCell.style.backgroundColor = "yellow";
                    riskDescCell.style.color = "black";
                    riskDescCell.style.textAlign = "center";
                } else if (riskDescription.includes("Informational")) {
                    riskDescCell.style.backgroundColor = "blue";
                    riskDescCell.style.color = "white";
                    riskDescCell.style.textAlign = "center";
                }

                
                const button = document.createElement("button");
                button.id = 'detail';
                button.innerHTML = '<i class="bi bi-box-arrow-up-right"></i>'; 
                button.classList.add("btn", "btn-primary");
                button.setAttribute("data-bs-toggle", "modal");
                button.setAttribute("data-bs-target", `#modal-${alert.pluginid}`);
                button.style.backgroundColor = "transparent";
                button.style.border = "none"
                button.style.color = "black"
                button.setAttribute("data-text", "See more detail");
                new bootstrap.Tooltip(button, {
                    title: button.getAttribute("data-text"), 
                    placement: "top", 
                });

                
                buttonCell.appendChild(button);

                
                const modal = document.createElement("div");
                modal.classList.add("modal", "fade");
                modal.id = `modal-${alert.pluginid}`;
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("aria-labelledby", `modalLabel-${alert.pluginid}`);
                modal.setAttribute("aria-hidden", "true");

                
                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog");

                
                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");
                
                const modalHeader = document.createElement("div");
                modalHeader.classList.add("modal-header");
                modalHeader.innerHTML = `<h1 class="modal-title fs-5" id="modalLabel-${alert.pluginid}">${alert.alert}</h1>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

                
                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");
                

                let count_rick = 0;
                alert.instances.forEach(instance => {
                    if (instance.uri == ""){
                        instance.uri = " - "
                    }
                    if (instance.method == ""){
                        instance.method = " - "
                    }
                    if (instance.param == ""){
                        instance.param = " - "
                    }
                    if (instance.attack == ""){
                        instance.attack = " - "
                    }
                    if (instance.evidence == ""){
                        instance.evidence = " - "
                    }
                    if (instance.solution == ""){
                        instance.solution = " - "
                    }

                    if (count_rick <= 1){
                        modalBody.innerHTML += `<p><b>Description:</b>${alert.desc.replace(/<p>|<\/p>/g, '')}</p><hr>
                        <p><b>Solution:</b> ${alert.solution.replace(/<p>|<\/p>/g, '')}</p><hr>
                                            <p><b>URI:</b> ${instance.uri}</p>
                                           <p><b>Method:</b> ${instance.method}</p>
                                           <p><b>Parameter:</b> ${instance.param}</p>
                                           <p><b>Attack:</b> ${instance.attack}</p>
                                           <p><b>Evidence:</b> ${instance.evidence}</p>
                                           <hr>`;
                    }
                    if(count_rick > 1){
                        modalBody.innerHTML += `<p><b>URI:</b> ${instance.uri}</p>
                                            <p><b>Method:</b> ${instance.method}</p>
                                            <p><b>Parameter:</b> ${instance.param}</p>
                                            <p><b>Attack:</b> ${instance.attack}</p>
                                            <p><b>Evidence:</b> ${instance.evidence}</p>
                                            <hr>`;
                    }
                    
                    count_rick += 1;
                    
                    
                });
                riskCodeCell.innerHTML = count_rick;
                riskCodeCell.style.textAlign = "center"
                const headElement = document.querySelector('.show_site');
                headElement.innerHTML = `<b>Site : </b>${data.site}`;
                // day = document.getElementsByClassName("day") ;
                // day.innerHTML = "Day : "+day+"/"+month+"/"+year;
                // time = document.getElementsByClassName("time") ;
                // time.innerHTML = "Time : "+hours+":"+minutes;

                const inputUrl = data.site ;
                console.log(inputUrl)
                if (count_print == 1){
                    fetchCertificate(inputUrl);
                    const new_url = new URL(inputUrl)
                    console.log("start new url = "+new_url.host)

                    fetchLocation(new_url.host);
                    fetchWebserverEnginehttp(inputUrl);
                    
                }
                count_print += 1;
                // fetchLocation(inputUrl);
                // fetchWebserverEnginehttp(inputUrl);
                            
                const modalFooter = document.createElement("div");
                modalFooter.classList.add("modal-footer");
                modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          </button>`;

                // Assemble modal components
                modalContent.appendChild(modalHeader);
                modalContent.appendChild(modalBody);
                modalContent.appendChild(modalFooter);
                modalDialog.appendChild(modalContent);
                modal.appendChild(modalDialog);

                // Append modal to the body
                document.body.appendChild(modal);
            });
        })
        .catch(error => {
            console.error("Error fetching JSON: " + error.message);
        });
});



async function fetchCertificate(url) {
    console.log('Client function fetchCertificate working...');

    try {
        const response = await fetch(`/certificate?url=${url}`);
        const certificateResult = await response.json();

        let result_cert = certificateResult["daysRemaining"];
        console.log('result cert = ' + result_cert);

        const check = '<i class="bi bi-check-circle-fill"></i>';
        const not_check = '<i class="bi bi-x-circle-fill"></i>';
        show_icon = document.getElementById("icon_cer");
        show_result = document.getElementById("dayremaining");

        let validFrom = "Start valid from " + new Date(certificateResult["validFrom"]).toLocaleString();
        let validTo = "Expire valid to " + new Date(certificateResult["validTo"]).toLocaleString();
        const show_time = document.getElementById("cer_time");
        console.log(validFrom + " - " + validTo)
        show_time.innerHTML = validFrom + "<br>" + validTo;
        show_time.style.fontSize = "16px"

        if (certificateResult["valid"] === true && result_cert > 0) {
            // document.getElementsByClassName('show_cer').innerHTML = result_cert + ' remaining'
            // document.getElementById('Certificate_icon').style.color = 'green';
            
            show_icon.innerHTML = check
            show_icon.style.color = '#32FF00'
            show_result.innerText = " " + result_cert +' Days remaining';
            console.log('Client function fetchCertificate Success');
        } else if (certificateResult["valid"] === true && result_cert < 0) {
            //document.getElementsByClassName('show_cer').innerHTML = result_cert + ' Expired'
            // document.getElementById('Certificate_icon').style.color = 'red';
            show_icon.innerHTML = not_check
            show_icon.style.color = "#FF3A00"
            show_result.innerText = " " + result_cert + ' Days Expired';
            console.log('Client function fetchCertificate Success');
        } else if (certificateResult["valid"] === false) {
            //document.getElementsByClassName('show_cer').innerHTML = result_cert + ' Fake validate'
            // document.getElementById('Certificate_icon').style.color = 'red';
            show_icon.innerHTML = not_check
            show_icon.style.color = "#FF3A00"
            show_result.innerText = " " + result_cert+' Days remaining expire';
            console.log('Client function fetchCertificate Success');
        } else {
            //document.getElementsByClassName('show_cer').innerHTML = result_cert + ' Invalid'
            // document.getElementById('Certificate_icon').style.color = 'red';
            show_icon.innerHTML = not_check
            show_icon.style.color = "#FF3A00"
            show_result.innerText = " " + 'Fake validate';
            console.log('Client function fetchCertificate Success');
        }
    } catch (error) {
        const check = '<i class="bi bi-check-circle-fill"></i>';
        const not_check = '<i class="bi bi-x-circle-fill"></i>';
        show_icon = document.getElementById("icon_cer");
        show_result = document.getElementById("dayremaining");
        show_icon.innerHTML = not_check
        show_icon.style.color = "#FF3A00"
        show_result.innerText = " " + 'No certificate';
        console.log('Client function fetchCertificate Success');
        console.log('Error:', error);
    }
}




function fetchLocation(url) {
    // url_text = url.split("//");
    // url = url_text[1];
    console.log("DNS URL = "+url);
    console.log('Client function fetchLocation working... '+url);
    // const check = '<i class="bi bi-check-circle-fill"></i>';
    // const not_check = '<i class="bi bi-x-circle-fill"></i>';
    // show_icon = document.getElementById("icon_loc");
    
    
    try {
        fetch(`/location?url=${url}`)
            .then(response => {
                if (!response.ok) {
                    error;
                }
                return response.json()
            })
            .then(locationResult => {
                console.log('Client result 1  = ', locationResult.fullName);
                console.log('Client result 2  = ', locationResult.location.city);

                const countryServerElement = document.getElementById("countryServer");
                const location_detail = document.getElementById("loc_del");
                a = document.createElement('a');
                location_city = "City : "+locationResult.location.city+", Region : "+locationResult.location.region;
                var linkText = document.createTextNode(location_city);


                // const googleMapsUrl = https://www.google.com/maps?q=${loc}&query=${encodeURIComponent(query)};
                a.appendChild(linkText);
                a.title = "Find Location on Google map";
                googleMapsUrl = "https://www.google.com/maps/@"+locationResult.location.loc+",14z?entry=ttu";
                a.href = googleMapsUrl;
                location_detail.appendChild(a);
                a.target = '_blank';
                a.addEventListener("mouseover", function() {
                    a.style.color = "#ECF426"; 
                    a.style.text = "20px";
                    
                  });
                  
                  a.addEventListener("mouseout", function() {
                    a.style.backgroundColor = ""; 
                    a.style.color = ""; 
                    a.style.transform = "scale(1)";
                  });

                // const locationIconElement = document.getElementById("Location_icon");
                console.log("City :",locationResult.location.city,"Region :",locationResult.location.region);
                
                // const a = document.getElementById("link_gmap");
                // const loc = locationResult.location.loc;
                
                // document.body.appendChild(link_map);
                console.log(googleMapsUrl)
                
                //const googleMapsUrl =" https://www.google.com/maps?q="+loc;
                
                location_detail.style.fontSize = "16px";
                location_detail.style.color = "#FFFFFF";
                countryServerElement.innerHTML = " "+ locationResult.fullName;
                flags_country(locationResult.fullName);
                // locationIconElement.style.color = 'green';
            })
            .catch(error => {
                const countryServerElement = document.getElementById("countryServer");
                countryServerElement.innerHTML = 'Internet Server Error';
                console.error('Internet Server Error');
            });
    } catch {
        const countryServerElement = document.getElementById("countryServer");
        // const locationIconElement = document.getElementById("Location_icon");
        console.error('Internet Server Error');
        countryServerElement.innerHTML = 'Internet Server Error';
        // locationIconElement.style.color = 'red';

    }

    
}



function fetchWebserverEnginehttp(url) {
    // url_text = url.split("//");
    // url = url_text[1];
    console.log('Client function fetchWebserverEnginehttp working... '+url);
    const check = '<i class="bi bi-check-circle-fill"></i>';
    const not_check = '<i class="bi bi-x-circle-fill"></i>';
    icon_http = document.getElementById("icon_http");

    
    try {
        fetch(`/webserver?url=${url}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(WebserverEnginehttpResult => {
                console.log('Client result server == ', WebserverEnginehttpResult);
                
                // const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
                const serverHTTPElement = document.getElementById("serverHTTP");

                if (WebserverEnginehttpResult === undefined) {
                    // engineHTTPElement.style.color = "#969d52";
                    icon_http.innerHTML = not_check+" " ;
                    icon_http.style.color = '#FF3A00'
                    serverHTTPElement.innerText = WebserverEnginehttpResult;
                } else if (WebserverEnginehttpResult === 'An error occurred.') {
                    // engineHTTPElement.style.color = "red";
                    icon_http.innerHTML = not_check+" " ;
                    icon_http.style.color = '#FF3A00'
                    serverHTTPElement.innerText = " "+WebserverEnginehttpResult;
                } else {
                    // engineHTTPElement.style.color = "green";
                    icon_http.innerHTML = check+" " ;
                    icon_http.style.color = '#32FF00';
                    serverHTTPElement.innerText = WebserverEnginehttpResult;
                }
            })
            .catch(error => {
                console.error('Webserver Enginehttp Error:', error);

                // const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
                const serverHTTPElement = document.getElementById("serverHTTP");

                // engineHTTPElement.style.color = "red";
                icon_http.innerHTML = not_check+" " ;
                icon_http.style.color = '#FF3A00'
                serverHTTPElement.innerText = "No Engine HTTP";
            });
    } catch (error) {
        const new_url_inner = "http://"+url
        return new Promise((resolve, reject) => {
            http.get(new_url_inner, (res) => {
                console.log(new_url_inner)
                let header = res.headers["server"];
                console.log(`The HTTP server engine is: ${header}`);
                resolve(header);
                icon_http.innerHTML = check+" " ;
                icon_http.style.color = '#32FF00';
                // const engineHTTPElement = document.getElementById("Engine_HTTP_icon");
                const serverHTTPElement = document.getElementById("serverHTTP");
                // engineHTTPElement.style.color = "red";
                serverHTTPElement.innerText = header;
            }).on('error', (error) => {
                reject(error)
            });
        })
    }
}





function flags_country(country_server){
    // สร้าง URL ของ API
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';
    icon_loc = document.getElementById('icon_loc');
    status_icon = document.getElementById("status");
    const check = '<i class="bi bi-check-circle-fill"></i>';
    const danger = '<i class="bi bi-exclamation-circle-fill"></i>';
    console.log("fun flags = "+country_server)

    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
        }
    })
    .then(data => {
        data.forEach(country => {
        const name = country.name ;
        const flag = country.flags ;
        if (country_server == name.common || country_server == name.official){
            if (country_server !=  "Russia"||
            country_server !="Russian Federation"||
            country_server !="China"||
            country_server !="People's Republic of China"||
            country_server !="North Korea"||
            country_server !="Democratic People's Republic of Korea"||
            country_server !="Iran"||
            country_server !="Islamic Republic of Iran"||
            country_server !="India"||
            country_server !="Republic of India"){
                icon_loc.innerHTML = '<img src="'+flag.svg+'"  width="50" height="30">';
                status_icon.innerHTML = check + " ";
                status_icon.style.color = "#32FF00";
            }if(country_server ==  "Russia"||
            country_server =="Russian Federation"||
            country_server =="China"||
            country_server =="People's Republic of China"||
            country_server =="North Korea"||
            country_server =="Democratic People's Republic of Korea"||
            country_server =="Iran"||
            country_server =="Islamic Republic of Iran"||
            country_server =="India"||
            country_server =="Republic of India"){
                icon_loc.innerHTML = '<img src="'+flag.svg+'"  width="50" height="30">';
                status_icon.innerHTML = danger + " ";
                status_icon.style.color = "#FF3A00";
            }
        }
        
        
        });
    })
    .catch(error => {
        console.error(error);
    });

}
