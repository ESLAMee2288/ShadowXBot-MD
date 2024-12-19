let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "⚠ *اكتب المشكلة اللي عايز تبلغ عنها يا نجم.*",
      m,
      rcanal,
    );
  if (text.length < 10)
    return conn.reply(
      m.chat,
      "⚠️ *يا ريت توضح المشكلة أكتر، على الأقل 10 حروف.*",
      m,
      rcanal,
    );
  if (text.length > 1000)
    return conn.reply(
      m.chat,
      "⚠️ *ما تكتبش أكتر من 1000 حرف يا نجم، خلي الرسالة مختصرة.*",
      m,
      rcanal,
    );
  const teks = `*❌️ \`تـبـلـيـغ\` ❌️*

☁️ **رقم المبلغ**:
• Wa.me/${m.sender.split`@`[0]}

👤 **اسم المبلغ**: 
• ${m.pushName || "مجهول"}

💬 **الرسالة**:
• ${text}`;

  await conn.reply(
    "201556653112@s.whatsapp.net",
    m.quoted ? teks + m.quoted.text : teks,
    m,
    { mentions: conn.parseMention(teks) },
  );
  // إرسال التبليغ لرقم المالك
  // await conn.reply(global.owner[0][0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

  m.reply(
    "⚠️ *تم إرسال التبليغ لصاحب البوت. أي تبليغ كاذب ممكن يسببلك حظر! 🛑*",
  );
};

handler.help = ["ابلاغ"];
handler.tags = ["info"];
handler.command = ["بلاغ", "ابلاغ", "مشكله", "bug", "error"];

export default handler;
