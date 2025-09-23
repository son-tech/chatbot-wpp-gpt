import express from "express";
import wppconnect from "@wppconnect-team/wppconnect";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 10000;

async function getChromiumExecutablePath() {
  // Ambil path chromium dari Puppeteer bawaan
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download(puppeteer._preferredRevision);
  return revisionInfo.executablePath;
}

(async () => {
  const chromiumPath = await getChromiumExecutablePath();

  wppconnect
    .create({
      headless: true,
      useChrome: false, // jangan pakai Chrome system
      executablePath: chromiumPath, // pakai Chromium dari Puppeteer
      puppeteerOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    })
    .then((client) => start(client))
    .catch((error) => console.error("❌ Error launching WPPConnect:", error));
})();

function start(client) {
  client.onMessage((message) => {
    if (message.body.toLowerCase() === "ping") {
      client.sendText(message.from, "pong 🏓");
    }
  });
}

app.get("/", (req, res) => {
  res.send("✅ WhatsApp Chatbot WPPConnect is running with Chromium!");
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
