function sendURLToServer(url) {
    return new Promise((resolve, reject) => {
        fetch('/sendlink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            const result = data.result;
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    sendURLToServer
}