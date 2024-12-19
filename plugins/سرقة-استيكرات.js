import { addExif } from "../lib/sticker.js";

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply("*⚠️ عشان تكوّن الستيكَر لازم ترد على ستيكر!*"); // لو مفيش ستيكر
  let stiker = false;
  try {
    await m.react(rwait); // رد فعل الانتظار
    let [packname, ...author] = text.split("|");
    author = (author || []).join("|");
    let mime = m.quoted.mimetype || "";
    if (!/webp/.test(mime)) return m.reply("⚠️ *رد على ستيكر صحيح!*"); // لو مفيش ستيكر webp
    let img = await m.quoted.download(); // تحميل الستيكر
    if (!img) return m.reply("⚠️ *رد على ستيكر!*"); // لو ما فيش ستيكر
    stiker = await addExif(img, packname || "", author || ""); // إضافة الـ Exif
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, "wm.webp", "", m, true, {
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: false,
            title: `Shadow Bot - MD 🌸`,
            body: `✡︎ Sticker By • Shadow Bot`,
            mediaType: 2,
            sourceUrl: redes,
            thumbnail: icons,
          },
        },
      });
      await m.react(done); // رد فعل تم التنفيذ
      throw "⚠️ *التحويل فشل.*"; // لو فشل التحويل
    }
  }
};

handler.help = ["take *<nombre>|<autor>*"]; // المساعدة مع الأوامر
handler.tags = ["sticker"]; // التصنيفات
handler.command = ["سرقه", "سرقة", "wm"]; // الأوامر للبوت

export default handler;
