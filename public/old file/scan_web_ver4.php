<!DOCTYPE html>
<!-- Created by CodingLab |www.youtube.com/CodingLabYT-->
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title>Website vulnerability checker Program</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
    <!-- Boxicons CDN Link -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
   </head>
   <style>
        body {
            background-color: #ffffff;
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins" , sans-serif;
        }
        .head img{
            width: 50%;
            padding-top: 50px;
        }
        .home-section .head{
            text-align: center;
        }
        .home-section{
            display: grid;
            grid-template-rows: name search;
            height: 550px;
            padding-top: 20px;
        }


        .detial {
            display: flex;
            justify-content: center;
        }
        .grid-container {
            display: grid;
            grid-template-columns: 1fr auto;
            padding-bottom: 100px;
            width: 900px;
        }
        .grid-container input{
            border-radius: 20px 0px 0px 20px;
            border-color: black;
            border-width: 2px;
        }
        .grid-container button{
            border-radius: 0px 18px 18px 0px;
            height: 58px;
            width: 100px;
            border-width: 2px;
            border-color: #007bff;
            color: #007bff;
            border-width: 2px;
            font-weight: bold;
        }
        .grid-container button :hover{
            border-color: #007bff;
            background-color: #007bff;
            color: #ffffff;
        }
        .input-field input {
            width: 100%;
        }
        .head h4{
            color: rgb(0, 0, 0);
        }
        .sidebar{
            text-align: right;
            padding-top: 10px;
            padding-right: 10px;
            background-color: rgba(181, 243, 249);
            height: 60px;
            box-shadow: 0px 10px 30px rgb(181, 243, 249);
        }

        .sidebar button{
            font-size: 18px;
            /* font-weight: bold; */
            width: 120px;
        }
        .sidebar .search_btn{
            text-align: center;
        }
        .sidebar .btn:hover {
            background-color: #007bff; /* สีพื้นหลังใหม่เมื่อ hover */
            color: #fff; /* สีข้อความใหม่เมื่อ hover */
        }
        .footer {
            display: grid;
            grid-template-columns: 3fr 0.5fr 0.5fr 0.4fr;
            align-items: end;
            height: 130px; /* ขนาดสูงเท่ากับความสูงของ viewport */
            
        }
        .ft2_d,
        .ft3_d,
        .ft4_d {
        text-align: right;
        padding-bottom: 20px;
        }
        .ft1_d{
            padding-left: 50px;
            padding-bottom: 20px;
        }
        .ft4_d{
            padding-right: 50px;
        }

        .loader {
            width: 48px;
            height: 48px;
            display: block;
            margin: 20px auto;
            position: relative;
            border: 3px solid #060487;
            border-radius: 50%;
            box-sizing: border-box;
            animation: animloader 2s linear infinite;
        }
            .loader::after {
            content: '';  
            box-sizing: border-box;
            width: 6px;
            height: 24px;
            background: #060487;
            transform: rotate(-45deg);
            position: absolute;
            bottom: -20px;
            left: 46px;
        }

        @keyframes animloader {
            0% {
                transform: translate(-10px, -10px);
            }
            25% {
                transform: translate(-10px, 10px);
            }
            50% {
                transform: translate(10px, 10px);
            }
            75% {
                transform: translate(10px, -10px);
            }
            100% {
                transform: translate(-10px, -10px);
            }
        }
        .modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%; /* ทำให้ความสูงของ modal-body เต็มจอ */
        }
        .modal-dialog {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* ทำให้สูงเต็มหน้าจอ */
        }

        /* CSS สำหรับ modal-content */
        .modal-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid #ccc; /* ขอบกรอบ */
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
  







    </style>
<body>
    <div class="bg">
        <div class="sidebar">
            <button type="button" class="btn search_btn">Search</button>
            <button type="button" class="btn about_btn">About</button>
        </div>
        <section class="home-section">
            <div class="head">
                <img src="photo\Untitled-2.gif" alt="">
                <p>API by OWASP</p>
            </div>
            <div class="detial">
                <form action="" class="form">
                    <div class="grid-container">
                        <div class="input-field form-floating mb-3">
                            <input type="text" class="form-control" id="urlInput" placeholder="name@example.com">
                            <label for="floatingInput">Website URL</label>
                        </div>
                        <div class="submit-button">
                            <button type="button" class="btn btn-outline-primary" onclick="runPythonFile()">Scan</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <!-- ก่อนปิด </body> -->
        <div class="modal" tabindex="-1" role="dialog" id="scanModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Scanning in progress</h5>
                    </button>
                </div>
                <div class="modal-body">
                    Scanning your website...
                    <span class="loader"></span>
                </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="ft1">
                <div class="ft1_d">
                    Copyrigth @ 2019-2020 OWASP
                </div>
            </div>
            <div class="ft2">
                <div class="ft3_d">
                    Privacy Policy 
                </div>
            </div>
            <div class="ft3">
                <div class="ft3_d">
                    Terms and conditions
                </div>
            </div>
            <div class="ft4">
                <div class="ft4_d">
                    Contrack
                </div>
            </div>
        </div>
    </div>
    <script>
        function runPythonFile() {
        $('#scanModal').modal('show'); // เปิด Modal
        // ทำการสแกนหรือประมวลผลอื่น ๆ ที่ต้องการ
        }

    </script>
</body>
</html>
