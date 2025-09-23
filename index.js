import express from "express";
import wppconnect from "@wppconnect-team/wppconnect";

const app = express();
const PORT = process.env.PORT || 10000;

wppconnect
  .create({
    headless: true,
    useChrome: false, // gunakan Chromium bawaan Puppeteer
    puppeteerOptions: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  })
  .then((client) => start(client))
  .catch((error) => console.error("❌ Error launching WPPConnect:", error));

function start(client) {
  client.onMessage((message) => {
    if (message.body.toLowerCase() === "ping") {
      client.sendText(message.from, "pong 🏓");
    }
  });
}

app.get("/", (req, res) => {
  res.send("✅ WhatsApp Chatbot WPPConnect is running!");
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
