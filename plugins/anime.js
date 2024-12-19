import fetch from "node-fetch";
import translate from "translate-google-api";

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🌸 *من فضلك ادخل اسم الأنمي* \n\nمثال: ${usedPrefix + command} Kimetsu No Yaiba`,
      m,
    );
  }

  let animeName = text;

  try {
    // الترجمة إذا كان النص بالعربية
    if (/[\u0600-\u06FF]/.test(animeName)) {
      animeName = await translate(animeName, { from: "ar", to: "en" });
    }
  } catch (error) {
    console.error("خطأ في الترجمة:", error);
  }

  // جلب البيانات من API
  let res;
  try {
    res = await fetch(
      "https://api.jikan.moe/v4/manga?q=" + encodeURIComponent(animeName),
    );
    if (!res.ok) {
      return conn.reply(
        m.chat,
        `🌸 *حدث خطأ في الاتصال بـ API*، يرجى المحاولة مرة أخرى لاحقًا.`,
        m,
      );
    }
  } catch (error) {
    console.error("خطأ في الاتصال بـ API:", error);
    return conn.reply(
      m.chat,
      `🌸 *حدث خطأ في الاتصال بـ API*، يرجى المحاولة لاحقًا.`,
      m,
    );
  }

  let json = await res.json();

  // فحص ما إذا كانت البيانات موجودة
  if (!json.data || json.data.length === 0) {
    return conn.reply(
      m.chat,
      `🌸 *لم يتم العثور على الأنمي:* "${animeName}". تأكد من الكتابة الصحيحة أو جرب اسمًا آخر.`,
      m,
    );
  }

  // استخراج البيانات
  let {
    chapters,
    title_japanese,
    url,
    type,
    score,
    members,
    background,
    status,
    volumes,
    synopsis,
    favorites,
  } = json.data[0];
  let author = json.data[0].authors[0].name;

  // الترجمة إذا كانت موجودة
  try {
    const translatedBackground = await translate(background, { to: "ar" });
    const translatedSynopsis = await translate(synopsis, { to: "ar" });
    conn.sendPresenceUpdate("composing", m.chat);

    let animeInfo = `🌸 العنوان: ${title_japanese}
🌸 الفصول: ${chapters}
💫 النوع: ${type}
🗂 الحالة: ${status}
🗃 المجلدات: ${volumes}
🌟 المفضلة: ${favorites}
🧮 التقييم: ${score}
👥 الأعضاء: ${members}
🔗 الرابط: ${url}
👨‍🔬 المؤلف: ${author}
📝 الخلفية: ${translatedBackground}
💬 القصة: ${translatedSynopsis}`;

    // إرسال الصورة والمعلومات
    conn.sendFile(
      m.chat,
      json.data[0].images.jpg.image_url,
      "anjime.jpg",
      `🌸 *معلومات الأنمي* 🌸\n\n` + animeInfo,
      m,
    );
  } catch (error) {
    console.error("خطأ أثناء الترجمة أو معالجة البيانات:", error);
    conn.reply(m.chat, "🌸 *حدث خطأ أثناء الترجمة أو معالجة البيانات.*", m);
  }
};

handler.help = ["infoanime"];
handler.tags = ["anime"];
handler.command = ["infoanime", "انمي"];

export default handler;
