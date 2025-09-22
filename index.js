const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const app = express();
const port = process.env.PORT || 3000;

// Inisialisasi WPPConnect
wppconnect.create({
  session: "whatsapp-session",
  puppeteerOptions: {
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ]
  }
})
.then((client) => {
  console.log("✅ WPPConnect berhasil dijalankan");
  startBot(client);
})
.catch((err) => {
  console.error("❌ Error launching WPPConnect:", err);
});

// Fungsi chatbot
function startBot(client) {
  client.onMessage((message) => {
    console.log("📩 Pesan diterima:", message.body);

    if (message.body.toLowerCase() === "ping") {
      client.sendText(message.from, "pong 🏓");
    }

    if (message.body.toLowerCase() === "halo") {
      client.sendText(message.from, "Hai, ada yang bisa saya bantu? 🤖");
    }
  });
}

// Endpoint Express (untuk Render Health Check)
app.get("/", (req, res) => {
  res.send("🚀 Chatbot WPPConnect GPT berjalan dengan baik!");
});

app.listen(port, () => {
  console.log(`🌍 Server berjalan di port ${port}`);
});
