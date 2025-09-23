import wppconnect from '@wppconnect-team/wppconnect';
import puppeteer from 'puppeteer';

// Fungsi utama bot
function start(client) {
  client.onMessage((message) => {
    console.log('Pesan masuk:', message.body);

    if (message.body === 'ping') {
      client.sendText(message.from, 'pong ✅');
    }

    if (message.body.toLowerCase().includes('halo')) {
      client.sendText(message.from, 'Hai, saya chatbot WPPConnect GPT 🤖');
    }
  });
}

// Inisialisasi WPPConnect
wppconnect
  .create({
    session: 'whatsapp-session',
    puppeteerOptions: {
      executablePath: puppeteer.executablePath(), // pakai Chrome bawaan puppeteer
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    catchQR: (base64Qr, asciiQR) => {
      console.log('QR Code tersedia, scan dengan WhatsApp:');
      console.log(asciiQR);
    },
    statusFind: (statusSession, session) => {
      console.log('Status Session:', statusSession);
      console.log('Session name:', session);
    },
  })
  .then((client) => start(client))
  .catch((error) => console.error('❌ Error launching WPPConnect:', error));

// Server dummy untuk Render tetap hidup
import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('🚀 Chatbot WPPConnect GPT berjalan di Render!');
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
