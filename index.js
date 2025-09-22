const wppconnect = require('@wppconnect-team/wppconnect');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('🚀 Chatbot WPPConnect GPT berjalan dengan baik!');
});

(async () => {
  try {
    // Ambil path Chrome yang diinstall oleh Puppeteer
    const chromePath = puppeteer.executablePath();
    console.log('✅ Chrome path terdeteksi:', chromePath);

    // Jalankan WPPConnect
    wppconnect.create({
      session: 'whatsapp-session',
      puppeteerOptions: {
        executablePath: chromePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    })
    .then((client) => start(client))
    .catch((error) => console.error('❌ Error launching WPPConnect:', error));

  } catch (err) {
    console.error('❌ Gagal mendapatkan Chrome path:', err);
  }
})();

function start(client) {
  client.onMessage((message) => {
    if (message.body.toLowerCase() === 'hi') {
      client.sendText(message.from, '👋 Halo! Bot WPPConnect GPT siap membantu.');
    }
  });
}

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
