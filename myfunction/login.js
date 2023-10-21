const mysql = require('mysql');



// document.getElementById('login').addEventListener('click', () => {
  // function getSQL(email, pass) {
  //   console.log('asdasdasd    '+email, pass)
  //   const connection = mysql.createConnection({
  //     host: 'localhost',
  //     user: '',
  //     password: '',
  //     database: 'vulnerability_checker'
  //   });
  //   connection.connect((err) => {
  //     // if (err) {
  //     //   console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MySQL: ' + err.message);
  //     // } else {
  //     //   reject('เชื่อมต่อกับ MySQL สำเร็จ');
  //     //   console.log('เชื่อมต่อกับ MySQL สำเร็จ');
  //     // }
  //     // if (err) throw err;
  //     console.log("Connected!");
  //     var sql = "INSERT INTO user (user_id,username,email, passwd) VALUES ('02','Sakura sang',"+"'"+email+"'"+", "+"'"+pass+"'"+")";
  //     // var sql = "SELECT * FROM user";
  //     connection.query(sql, function (err, result, fields) {
  //       // if (err) throw err;
  //       console.log('result ===== ', result, '   ffffff ',fields, ' error ',err)
  //     });

  //     // con.query("SELECT * FROM user", function (err, result, fields) {
  //     //   if (err) throw err;
  //     //   console.log(result);
  //     // });

  //   });

    
  
  // }

///// ChatGPT
  function getSQL(email, pass) {
    console.log('asdasdasd    ' + email, pass);
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'vulnerability_checker'
    });

    connection.connect((err) => {
      if (err) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MySQL: ' + err.message);
      } else {
        console.log('เชื่อมต่อกับ MySQL สำเร็จ');
        // var sql = "INSERT INTO user (user_id, username, email, passwd) VALUES ('02','Doremon'," + mysql.escape(email) + ", " + mysql.escape(pass) + ")";
        //var sql = "INSERT INTO user (username, email, passwd) VALUES ('Thanuson Sonthimoon'," + mysql.escape(email) + ", " + mysql.escape(pass) + ")";
        if (email && pass){
          connection.query('SELECT * FROM user WHERE email = ? AND passwd = ?', [email, pass], function (err, result, fields) {
            if (error) throw error;
            if (results.length >0){
                req.session.loggedin = true;
				        req.session.username = sqlreqEmail;
            }else{
                res.send('Incorrect Username and/or Password!');
                express.res.redirect('/public/scan_web_ver.html');
            }
            res.end();
          });
        }else{
          res.send('Please enter Username and Password!');
          res.end();
        }
        //connection.query(sql, function (err, result, fields) {
          // if (err) {
          //   console.error('เกิดข้อผิดพลาดในการดำเนินการคิวรี: ' + err.message);
          //   // ทำการจัดการข้อผิดพลาดที่นี่
          // } else {
          //   // for (const row of result) {
          //   //   console.log(row); 
          //   // }
          //   console.log("Result:", result[0].email);
          //   // for (const i in fields){
          //   //   console.log(i)
          //   // }
          //   //console.log("Fields "+fields)
          //   console.log('เสร็จสิ้นการคิวรี');
          // }
        // });
  
        connection.end();
      }
    });
  }
      // if (sqlreqEmail && sqlreqPass){
    //     connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [sqlreqEmail, sqlreqPass], function(error, results, fields){
    //         if (error) throw error;
    //         if (results.length >0){
    //             req.session.loggedin = true;
	// 			         req.session.username = sqlreqEmail;
    //         }else{
    //             res.send('Incorrect Username and/or Password!');
    //             express.response.redirect('/public/scan_web_ver.html');
    //         }
    //         response.end();
    //     });
    // }else{
    //     response.send('Please enter Username and Password!');
	// 	response.end();
    // }
  
// });


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "",
//   password: "",
//   database: "mydb"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });





module.exports = {
  getSQL
}


// connection.end((err) => {
//   if (err) {
//     console.error('เกิดข้อผิดพลาดในการปิดการเชื่อมต่อกับ MySQL: ' + err.message);
//   } else {
//     console.log('ปิดการเชื่อมต่อกับ MySQL สำเร็จ');
//   }
// });
// function connectdata(){
//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'vulnerability_checker'
//   });
//   connection.connect((err) => {
//     if (err) {
//       console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MySQL: ' + err.message);
//     } else {
//       reject('เชื่อมต่อกับ MySQL สำเร็จ');
//       console.log('เชื่อมต่อกับ MySQL สำเร็จ');
//     }
//   });
  

// }