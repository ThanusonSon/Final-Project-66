const axios = require('axios');
const cheerio = require('cheerio');

const apacheDownloadPageURL = 'https://httpd.apache.org/download.cgi';

async function getLatestApacheVersion() {
  try {
    const response = await axios.get(apacheDownloadPageURL);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Locate the element containing the latest stable version
      const latestVersionParagraph = $('p:contains("Stable Release - Latest Version:")').first();
      
      if (latestVersionParagraph) {
        const latestVersionElement = latestVersionParagraph.next().find("a");
        if (latestVersionElement) {
          const latestVersionText = latestVersionElement.text();
          console.log(`Latest stable Apache web server version: ${latestVersionText}`);
        } else {
          console.error('Failed to retrieve Apache version information.');
        }
      } else {
        console.error('Failed to find the paragraph containing the version.');
      }
    } else {
      console.error('Failed to fetch the Apache download page.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

getLatestApacheVersion();
