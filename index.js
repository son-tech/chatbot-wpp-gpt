const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("🚀 WhatsApp Chatbot with WPPConnect is running!");
});

(async () => {
  try {
    await wppconnect.create({
      session: "whatsapp-session",
      puppeteerOptions: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--single-process",
          "--disable-extensions"
        ],
        executablePath:
          process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath()
      }
    });

    console.log("✅ WPPConnect session started successfully!");
  } catch (err) {
    console.error("❌ Error launching WPPConnect:", err);
  }
})();

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
