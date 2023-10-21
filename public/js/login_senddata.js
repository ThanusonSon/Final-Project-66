
document.getElementById('login').addEventListener('click', () => {

  const email = document.getElementById('email').value;
  const passwd = document.getElementById('passwd').value;
  console.log('email is =',email,'&& passwoed is =',passwd);
  fetchSQL(email,passwd);
});

function fetchSQL(email,pass) {
  console.log('SQL function fetchSQL working...')
  
  // fetch(`/auth?email=${email}&pass=${pass}`)
  fetch(`/auth`)

  ///getsqlreq?sqlreq1=${sqlreq1}&sqlreq2=${sqlreq2}
  .then(response => response.text())
  // .then(sqlResult => {
  //     console.log(sqlResult);
  // })
  .catch(error => {
      console.error('Error:', error);
  });
  
}
