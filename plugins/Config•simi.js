import fetch from "node-fetch";

const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];

  // التحقق من تفعيل SimSimi
  if (chat.simi) {
    // تجاهل النصوص التي تعطل SimSimi
    if (/^(false|disable|off|0)/i.test(m.text)) return;

    const messageText = m.text;

    // الكلمات المستثناة من الرد
    const ignoredKeywords = [
      "serbot",
      "bots",
      "jadibot",
      "menu",
      "play",
      "tiktok",
      "facebook",
      "sticker",
      "ping",
    ];

    // التحقق من النصوص المستثناة
    if (ignoredKeywords.some((keyword) => messageText.includes(keyword)))
      return;

    try {
      // استدعاء API للحصول على رد من SimSimi
      const reply = await simiTalk(messageText, "ar"); // تحديد اللغة العربية

      // إرسال الرد
      if (reply) await conn.reply(m.chat, reply, m);
    } catch (error) {
      // في حال حدوث خطأ
      await conn.reply(
        m.chat,
        "⚠️ حدث خطأ أثناء معالجة طلبك، حاول مرة أخرى لاحقًا.",
        m,
      );
    }

    return true;
  }

  return true;
};

export default handler;

// دالة الاتصال بـ SimSimi API
async function simiTalk(text, language = "en") {
  // اللغة الافتراضية هي العربية
  if (!text) return; // تم حذف الرسالة التي كانت تطلب إدخال نص
  try {
    // إرسال البيانات إلى API بتنسيق x-www-form-urlencoded
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `text=${encodeURIComponent(text)}&lc=${language}&key=`, // تأكد من ارسال البيانات بشكل صحيح
    };

    const res = await fetch("https://api.simsimi.vn/v2/simtalk", options);
    const json = await res.json();

    // التحقق من الرد من API
    const reply = json?.message;
    if (!reply) return "⚠️ لم يتمكن SimSimi من الرد.";

    return reply;
  } catch (error) {
    // في حال حدوث خطأ في الاتصال
    console.error(error); // طباعة الخطأ في الـ console للمراجعة
    return "⚠️ تعذر الوصول إلى SimSimi، حاول لاحقًا.";
  }
}
