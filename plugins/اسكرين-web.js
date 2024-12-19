import fetch from "node-fetch";

let handler = async (m, { conn, command, args }) => {
  if (!args[0])
    return conn.reply(m.chat, "⚠️ *من فضلك ابعت رابط صفحة ويب.*", m, rcanal); // لو مفيش رابط
  try {
    await m.react(rwait); // رد فعل الانتظار
    conn.reply(m.chat, "🚀 جاري البحث عن معلومات الصفحة....", m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: packname,
          body: dev,
          previewType: 0,
          thumbnail: icons,
          sourceUrl: channel,
        },
      },
    });

    let ss = await (
      await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)
    ).buffer(); // أخذ صورة للصفحة
    conn.sendFile(m.chat, ss, "error.png", args[0], fkontak); // إرسال الصورة
    await m.react(done); // رد فعل تم التنفيذ
  } catch {
    return conn.reply(m.chat, "🌸 حصل خطأ أثناء تحميل الصورة.", m, fake); // لو في خطأ
    await m.react(error); // رد فعل الخطأ
  }
};

handler.help = ["ssweb", "ss"]; // الأوامر المساعدة
handler.tags = ["tools"]; // التصنيفات
handler.command = ["اسكرين", "ss"]; // الأوامر للبوت

export default handler;
