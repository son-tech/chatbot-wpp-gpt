import express from "express";
import puppeteer from "puppeteer";
import wppconnect from "@wppconnect-team/wppconnect";

const app = express();
const PORT = process.env.PORT || 10000;

(async () => {
  try {
    // Launch Puppeteer dengan Chrome yang sudah di-install
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true
    });

    // Jalankan WPPConnect
    await wppconnect.create({
      browserWSEndpoint: browser.wsEndpoint(),
      puppeteerOptions: { headless: true }
    });

    console.log("✅ WPPConnect berhasil dijalankan!");
  } catch (err) {
    console.error("❌ Error launching WPPConnect:", err);
  }
})();

app.get("/", (req, res) => {
  res.send("Chatbot WhatsApp GPT jalan di Render 🚀");
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
