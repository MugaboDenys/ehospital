const fetch = require('node-fetch');
const fs = require('fs');

async function downloadCSV() {
  try {
    const response = await fetch('http://localhost:8080/ehospital/DownloadCSVServlet');
    const stream = fs.createWriteStream('data.csv');
    response.body.pipe(stream);
    return 'CSV file downloaded successfully.';
  } catch (err) {
    console.error(err);
    return 'Error downloading CSV file.';
  }
}
