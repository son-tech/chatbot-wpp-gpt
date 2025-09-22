const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
const PORT = process.env.PORT || 10000;

wppconnect.create({
  session: 'whatsapp-session',
  puppeteerOptions: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}).then((client) => {
  console.log("✅ WhatsApp Client ready!");
  client.onMessage(async (message) => {
    if (message.body.toLowerCase() === "ping") {
      await client.sendText(message.from, "pong");
    }
  });
}).catch((err) => {
  console.error("❌ Error launching WPPConnect:", err);
});

app.get("/", (req, res) => {
  res.send("🚀 Chatbot WPPConnect GPT berjalan dengan baik!");
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
