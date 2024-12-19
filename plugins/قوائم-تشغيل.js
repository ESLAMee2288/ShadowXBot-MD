import yts from "yt-search";

var handler = async (m, { text, conn, command, usedPrefix }) => {
  // التحقق إذا كان المستخدم لم يدخل اسم الكورس
  if (!text) {
    return conn.reply(
      m.chat,
      `🌸 *اكتب اسم الكورس اللي عايز تدور عليه*\n\nمثال، ${usedPrefix + command} تعلم البرمجة`,
      m,
    );
  }

  // البحث عن مقاطع الفيديو وقوائم التشغيل المتعلقة بالكورسات
  let results = await yts(text);
  let videos = results.all.filter((v) => v.type === "video"); // فلترة الفيديوهات
  let playlists = results.playlists || []; // التأكد من وجود قوائم التشغيل

  // إذا لم يتم العثور على فيديوهات أو قوائم تشغيل
  if (videos.length === 0 && playlists.length === 0) {
    return conn.reply(
      m.chat,
      `🚫 *مافيش كورسات أو قوائم تشغيل بنفس الاسم اللي كتبته، حاول تكتب اسم تاني.*`,
      m,
    );
  }

  let teks = "";

  // عرض الفيديوهات
  if (videos.length > 0) {
    teks += `🎥 *نتائج البحث عن الفيديوهات التعليمية:*\n\n`;
    teks += videos
      .map((video, index) => {
        return `🔢 *رقم الفيديو:* ${index + 1}
🌸 *العنوان:* ${video.title}
🔗 *الرابط:* ${video.url}
🕝 *المدة:* ${video.timestamp}
📚 *وصف:* ${video.description || "لا يوجد وصف"}
👨‍🏫 *الناشر:* ${video.author.name}`;
      })
      .join("\n\n••••••••••••••••••••••••••••••••••••\n\n");
  }

  // عرض قوائم التشغيل
  if (playlists.length > 0) {
    teks += `🎶 *نتائج البحث عن قوائم التشغيل التعليمية:*\n\n`;
    teks += playlists
      .map((playlist, index) => {
        return `🔢 *رقم القائمة:* ${index + 1}
🌸 *العنوان:* ${playlist.title}
🔗 *الرابط:* ${playlist.url}
🕝 *عدد الفيديوهات:* ${playlist.videos.length}
👨‍🏫 *الناشر:* ${playlist.author.name}`;
      })
      .join("\n\n••••••••••••••••••••••••••••••••••••\n\n");
  }

  // إرسال الرد النهائي مع تفاصيل الكورسات
  conn.reply(m.chat, teks, m);
};

handler.help = ["بحث كورسات"];
handler.tags = ["بحث"];
handler.command = ["كورس", "كورسات", "course"];

handler.register = false;

export default handler;
