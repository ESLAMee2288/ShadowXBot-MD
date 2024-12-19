import { getContentType } from "@whiskeysockets/baileys";

let handler = async (m, { conn, text }) => {
  try {
    // تحقق من وجود نص الرسالة
    if (!text) {
      return conn.reply(
        m.chat,
        "⚠️ *اكتب الرسالة اللي عايز تبعتها للقناة يا نجم.*",
        m,
      );
    }

    // إعداد معرف القناة والنص
    const channelJid = "120363368508685742@newsletter"; // معرف القناة
    const messageText = text; // النص الذي سيتم إرساله

    // إرسال الرسالة إلى القناة
    await conn.sendMessage(channelJid, { text: messageText }, { quoted: m });

    // تأكيد نجاح العملية للمستخدم
    conn.reply(m.chat, "✅ *تم إرسال الرسالة للقناة بنجاح!*", m);
    console.log(`✅ تم إرسال الرسالة بنجاح إلى القناة ${channelJid}`);
  } catch (err) {
    console.error("❌ حدث خطأ أثناء إرسال الرسالة:", err);
    conn.reply(m.chat, "❌ *للأسف حصل خطأ أثناء إرسال الرسالة للقناة.*", m);
  }
};

// تعريف خصائص المعالج
handler.help = ["sendChannel"]; // شرح موجز للأمر
handler.tags = ["channel"]; // تصنيف الأمر
handler.command = ["send", "ارسال"]; // الأوامر المقبولة لاستدعاء الوظيفة

export default handler;
