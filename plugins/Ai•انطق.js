import axios from "axios";

let enviando = false;

const handler = async (m, { conn, args }) => {
  if (enviando) return; // تجنب تكرار الطلبات
  enviando = true;

  const userMessage = args.join(" ");
  if (!userMessage) {
    enviando = false;
    return conn.sendMessage(
      m.chat,
      { text: "الرجاء كتابة الرسالة التي تريد تحويلها إلى صوت." },
      { quoted: m },
    );
  }

  // const apiUrl = `https://joanimi-apis-for-devs.vercel.app/api/text2voice/v1?text=- ${encodeURIComponent(userMessage)}&voice=mrbeast`;
  // const apiUrl = `https://zoro-foryou.vercel.app/api/text2speech/female?text=${encodeURIComponent(userMessage)}`;
  const apiUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(userMessage)}`;

  // إعداد تغيير الـ User-Agent عشوائيًا
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0",
    "Mozilla/5.0 (Linux; Android 11; Pixel 4 XL Build/RPB1.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
  ];

  const randomUserAgent =
    userAgents[Math.floor(Math.random() * userAgents.length)];

  try {
    conn.sendPresenceUpdate("recording", m.chat);

    // إرسال الطلب مع تغيير الـ User-Agent
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": randomUserAgent, // تغيير الـ User-Agent
        "X-Forwarded-For": "192.168.1." + Math.floor(Math.random() * 100), // تغيير الـ IP الوهمي
      },
      responseType: "arraybuffer",
    });

    const audioBuffer = response.data;

    // إرسال الصوت مباشرة من Buffer
    await conn.sendMessage(
      m.chat,
      { audio: audioBuffer, mimetype: "audio/mp4", ptt: true },
      { quoted: m },
    );
  } catch (error) {
    console.error("Error during API request:", error);
    conn.sendMessage(
      m.chat,
      { text: "حدث خطأ أثناء تحويل النص إلى صوت." },
      { quoted: m },
    );
  } finally {
    enviando = false; // إعادة تعيين حالة الإرسال
  }
};

handler.register = true;
handler.command = /^(انطق)$/i; // يمكن تغيير الأمر حسب الرغبة
export default handler;
