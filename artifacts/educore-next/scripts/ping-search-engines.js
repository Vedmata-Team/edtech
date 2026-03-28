const http = require('https');

const SITE_URL = 'https://educore.app';
const KEY = '47a274db24924c88b991cd47895f32eb';

const pingIndexNow = (engine) => {
  const url = `https://${engine}/indexnow?url=${SITE_URL}/&key=${KEY}`;
  
  http.get(url, (res) => {
    console.log(`Pinged ${engine}: Status ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error pinging ${engine}: ${e.message}`);
  });
};

console.log('--- Initializing Instant Indexing (IndexNow) ---');
['www.bing.com', 'search.yandex.com'].forEach(pingIndexNow);

// Also ping Google Sitemap (legacy but still works for crawl requests)
const googlePing = `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`;
http.get(googlePing, (res) => {
  console.log(`Google Sitemap Ping: Status ${res.statusCode}`);
});
