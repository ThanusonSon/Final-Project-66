let sslChecker = require('ssl-checker');

function certificateChecker(url_arg) {
    console.log('url_arg=' + url_arg);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            let check = url_arg;
            let url = '';

            if (url_arg.includes("://")) {
                url = new URL(check).hostname;
            } else {
                url = url_arg;
            }

            console.log('check certificate valid');

            sslChecker(url, "GET", 443).then((result) => {
                let check_day = Math.sign(result['daysRemaining']);
                resolve(result, check_day);
            });

            console.log('sslChecker Successful');
        }, 500);
    });
}


// function certificateChecker(url_arg) {
//     console.log('url_arg='+url_arg)
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {

//             // code


//             let check = url_arg
//             // let check = document.getElementsByClassName("linkToScan")[0].value;

//             // let showResult = document.getElementById("cerResults");
            

//             // let daysRemaining = "Time remaining "+result['daysRemaining']+ " day"
//             // let validate = "Validate = "+result['valid']
//             // let validFrom = "Start valid from "+result['validFrom']
//             // let validTo = "Expire valid to "+result['validTo']

//             console.log(check)
//             console.log('clean URL')
//             let url = ''
//             if (url_arg.includes("://")){
//                 url = new URL(check).hostname
//             } else {
//                 url = url_arg
//             }

//             // let url = new URL(check).hostname
//             // console.log(url)
//             // console.log('yo')

//             // check certificate valid

//             console.log('check certificate valid')

//             // cleanURL().then(function (url) {
//                 // console.log(url)
//                 sslChecker(url, "GET", 443).then((result) => {
                    
//                     // let res = result["daysRemaining"]
//                     // let daysRemaining = "Time remaining " + result["daysRemaining"] + " day";
//                     // let validate = "Validate = " + result["valid"];
//                     // let validFrom = "Start valid from " + new Date(result["validFrom"]).toLocaleString();
//                     // let validTo = "Expire valid to " + new Date(result["validTo"]).toLocaleString();
//                     // let validFor = "Valid for " + result["validFor"];

//                     // let cert_icon_color = ''
//                     // let cert_value = ''

//                     let check_day = Math.sign(result['daysRemaining'])
//                     resolve(result, check_day, );

//                     // console.log(res)
//                     // console.log(daysRemaining)
//                     // console.log(validate)
//                     // console.log(validFrom)
//                     // console.log(validTo)
//                     // console.log(validFor)
//                     // console.log(check_day)

//                     // showResult.innerHTML = daysRemaining;
//                     // document.getElementById("daysRemaining").innerHTML = daysRemaining;
//                     // document.getElementById("validate").innerHTML = validate;
//                     // document.getElementById("validFrom").innerHTML = validFrom;
//                     // document.getElementById("validFrom").innerHTML = validFrom;
//                     // document.getElementById("validTo").innerHTML = validTo;
//                     // document.getElementById("validFor").innerHTML = validFor;

//                     // console.log('Math.sign = ' + Math.sign(result['daysRemaining']));
//                     // console.log(validate)

//                     // if (result["valid"] == true && res == 1) {
//                     //     switch (Math.sign(result['daysRemaining'])) {
//                     //         case 1:
//                     //             cert_icon_color = document.getElementById('Certificate_icon').style.color = 'green'
//                     //             document.getElementById("dayremaining").innerHTML = res + ' remaining';
//                     //             console.log('มันเข้า 1 ด้วย')
//                     //             break
//                     //         case -1:
//                     //             cert_icon_color = document.getElementById('Certificate_icon').style.color = 'red'
//                     //             document.getElementById("dayremaining").innerHTML = daysRemaining + ' day expired';
//                     //             console.log('มันเข้า -1 ด้วย')
//                     //             break
//                     //         case 0:
//                     //             cert_icon_color = document.getElementById('Certificate_icon').style.color = 'red'
//                     //             document.getElementById("dayremaining").innerHTML = 'Today expired';
//                     //             console.log('มันเข้า 0 ด้วย')
//                     //             break
//                     //         case -0:
//                     //             cert_icon_color = document.getElementById("dayremaining").innerHTML = '-0';
//                     //             console.log('มันเข้า -0 ด้วย')
//                     //             break
//                     //         case NaN:
//                     //             document.getElementById("dayremaining").innerHTML = 'NaN';
//                     //             console.log('มันเข้า NaN ด้วย')
//                     //             break
//                     //         default:
//                     //             document.getElementById("dayremaining").innerHTML = 'อยู่เหนือความคาดหมาย';
//                     //             break

//                     //     }
//                     // } else if (result["valid"] == true && check_day == -1) {
//                     //     let cert_icon_color = document.getElementById('Certificate_icon').style.color = 'red'
//                     //     let value = document.getElementById("dayremaining").innerHTML = 'not extend validate';
//                     // } else if (result["valid"] == false) {
//                     //     document.getElementById('Certificate_icon').style.color = 'red'
//                     //     document.getElementById("dayremaining").innerHTML = 'Fake validate';
//                     // }

                    

//                     // test only
//                     // document.getElementById('Certificate_icon').style.color = 'green'
//                     // document.getElementById("dayremaining").innerHTML = daysRemaining+' remaining';
//                     // test only

//                 });
//             // })

//             // wrong.host.badssl.com
//             // https://badssl.com/
//             // https://expired.badssl.com/

//             // press enter for execute send input

//             // ipc.send("SuccessCheck_url");

//             //===============================================================================================

//             console.log('sslChecker Successful')
//             // resolve()
//         }, 500)
//     })
// }

module.exports = {
    certificateChecker
}





// const sslChecker = require('ssl-checker');

// async function certificateChecker(url_arg) {
//     console.log('url_arg=' + url_arg);

//     let check = url_arg;
//     let cert_icon_color = '';
//     let res;

//     try {
//         let url = '';
//         if (check.includes("://")) {
//             url = new URL(check).hostname;
//         } else {
//             url = check;
//         }

//         const result = await sslChecker(url, "GET", 443);

//         console.log('Check certificate valid');
//         console.log(url);
//         console.log(result);

//         let check_day = Math.sign(result.daysRemaining);
//         res = result.daysRemaining;

//         if (result.valid && res === 1) {
//             switch (check_day) {
//                 case 1:
//                     cert_icon_color = 'green';
//                     break;
//                 case -1:
//                     cert_icon_color = 'red';
//                     break;
//                 case 0:
//                     cert_icon_color = 'red';
//                     break;
//                 default:
//                     cert_icon_color = 'red';
//                     break;
//             }
//         } else if (result.valid && check_day === -1) {
//             cert_icon_color = 'red';
//         } else if (!result.valid) {
//             cert_icon_color = 'red';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }

//     return {
//         cert_icon_color,
//         res
//     };
// }

// module.exports = {
//     certificateChecker
// };
