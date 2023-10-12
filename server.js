const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express()
const PORT = process.env.PORT || 3000

const check_Certificate = require('./myfunction/certificate')
const check_Location = require('./myfunction/location_check')
const check_WebServerEngineHTTP = require('./myfunction/webserver_enginehttp_check')
const sendlink = require('./myfunction/server_sendlink')

const { exec } = require('child_process');

// app.use('/', express.static('public'))
// app.use(express.static('files'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/scan_web_ver.html');
    
});

// app.post('/send-to-server', async (req, res) => {
//     const inputValue = req.body.inputValue;
  
//     try {
//       const result = await scanButtonClickHandler(inputValue); // เรียกใช้ฟังก์ชันตรงนี้โดยส่ง input ที่ได้จากฟอร์ม
//       console.log(result);
//       res.send(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('An error occurred.');
//     }
//   });
  
//   async function scanButtonClickHandler(url) {
//     // ทำการส่งค่าไปยังเซิร์ฟเวอร์เพื่อประมวลผล
//     const response = await fetch('/send-to-server', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `inputValue=${encodeURIComponent(url)}`,
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch data from the server.');
//     }
  
//     const responseData = await response.json();
//     return responseData.data;
//   }
  
//   function processData(input) {
//     // ประมวลผลตามที่คุณต้องการ
//     return "Processed: " + input;
//   }
  

// app.post('/sendlink', async (req, res) => {
//     const url = req.body.url;

//     try {
//         const result = await sendlink.sendURLToServer(url);
        
//         console.log(result);
//         res.send(result);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('An error occurred.')
//     }

// });

// const { exec } = require('child_process');

// app.get('/scanvul', (req, res) => {
//     const url = req.query.url;
//     const result = f.checkCertificate(url);
//     res.send(result);
// });

app.get('/certificate', async (req, res) => {
    console.log('server function certificate working...')
    const url = req.query.url;

    try {
        const certificateResult = await check_Certificate.certificateChecker(url);

        // console.log(result);
        res.send(certificateResult);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred.')
    }

    
    // res.send(result);
    
});

app.get('/location', async (req, res) => {
    await console.log('server function location working...')
    const url = req.query.url;

    try {
        const locationResult = await check_Location.checkLocation(url);
        console.log('location is = ' +locationResult);
        res.send(locationResult);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred.')
    }

    // res.send(result);
});

app.get('/webserver', async (req, res) => {
    console.log('server function webserver working...')
    const url = req.query.url;

    try {
        const webserverResult = await check_WebServerEngineHTTP.checkWebServerEngineHTTP(url);
        console.log(webserverResult);
        res.send(webserverResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.')
    }
    // const result = check_WebServerEngineHTTP.checkWebServerEngineHTTP(url).then(header).catch(error);
    // console.log(result);
    // res.send(result);
});



// app.get('/js/scanvul.js', (req, res) => {
//     res.set('Content-Type', 'application/javascript');
//     res.sendFile('js/scanvul.js', { root: path.join(__dirname) });
// });

// ฟังก์ชันสำหรับรันไฟล์ไพธอนและส่งผลลัพธ์ไปยังหน้าเว็บ
app.get('/scanvul', async (req, res) => {
    const url = req.query.url;

    try {
        const pythonProcess = spawn('python', [__dirname + './public/python/runzap.py', url]);
        let pythonResult = '';

        const stdoutPromise = new Promise((resolve, reject) => {
            pythonProcess.stdout.on('data', (data) => {
                console.log(`Python stdout: ${data}`);
                pythonResult = data;
                resolve(pythonResult);
            });
        })
    
        // ตรวจสอบว่า Python process ทำงานเสร็จสิ้นแล้วหรือไม่
        const stderrPromise = new Promise((resolve, reject) => {
            pythonProcess.stderr.on('data', (data) => {
                console.error(`Python stderr: ${data}`);
                pythonResult = data;
                resolve(pythonResult);
            });
        })

        // รอทั้ง stdout และ stderr
        const [stdoutResult, stderrResult] = await Promise.all([stdoutPromise, stderrPromise]);
    
        // ส่งผลลัพธ์กลับไปยัง client
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);

            // res.send(`Python process exited with code ${code}`);
            res.send(stdoutResult || stderrResult || `Python process exited with code ${code}`);
        });
    } catch (error) {
        console.error('Error occurred:', error);
        // res.status(500).send('Internal server error')
    }

});

// function runPythonFile() {

//         pythonProcess.stdout.on('data', (data) => {
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`เกิดข้อผิดพลาด: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`โปรแกรม Python จบการทำงานด้วยรหัส: ${code}`);
//     });
// }

app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is listening at http://localhost:${PORT}`)
})