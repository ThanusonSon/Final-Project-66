// f.js

// f.js

function scanButtonClickHandler() {
    const inputValue = document.getElementById('urlInput').value;
  
    fetch('/send-to-server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `inputValue=${encodeURIComponent(inputValue)}`,
    })
    .then(response => response.json())
    .then(responseData => {
      window.location.href = `/report.html?data=${responseData.data}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  module.exports = { scanButtonClickHandler }
  