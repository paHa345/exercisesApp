// pages/api/contact.js
import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Replace with your actual bot token and chat ID
    const botToken = "7577331969:AAGYO1E1Kz_hDPu8DPhXRMUv1Gx_HdTn7Iw";
    const chatId = "7577331969";

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const text = `
      New message from ${name} \n
      Email: ${email} \n
      Message: ${message}
    `;

    try {
      // Send the message via the Telegram Bot API
      const response = await axios.post(telegramUrl, {
        chat_id: chatId,
        text: text,
      });

      if (response.data.ok) {
        return res.status(200).json({ success: true, message: "Message sent successfully!" });
      } else {
        return res.status(500).json({ success: false, message: "Failed to send message." });
      }
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      return res.status(500).json({ success: false, message: "Error sending message." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
