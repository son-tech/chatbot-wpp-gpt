import express from "express";
import puppeteer from "puppeteer";
import wppconnect from "@wppconnect-team/wppconnect";

const app = express();
const PORT = process.env.PORT || 10000;

(async () => {
  try {
    // Cari lokasi Chrome yang dipasang oleh puppeteer
    const executablePath = puppeteer.executablePath();

    const browser = await puppeteer.launch({
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    await wppconnect.create({
      browserWSEndpoint: browser.wsEndpoint(),
      puppeteerOptions: {
        executablePath,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
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
