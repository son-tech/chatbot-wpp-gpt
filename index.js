import express from "express";
import puppeteer from "puppeteer";
import wppconnect from "@wppconnect-team/wppconnect";

const app = express();
const PORT = process.env.PORT || 10000;

(async () => {
  try {
    // Ambil path Chrome yang sudah diinstall Puppeteer
    const executablePath = puppeteer.executablePath();

    await wppconnect.create({
      session: "whatsapp-session",
      puppeteerOptions: {
        executablePath, // Paksa pakai Chrome Puppeteer
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
  res.send("🚀 Chatbot WhatsApp GPT jalan di Render");
});

app.listen(PORT, () => {
  console.log(`🌍 Server berjalan di port ${PORT}`);
});
