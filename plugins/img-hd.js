import FormData from "form-data";
import Jimp from "jimp";

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m; // لو مفيش رد ع الصورة هياخد الصورة الحالية
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    // لو مفيش صورة أو صورة مش مدعومة
    if (!mime)
      return m.reply(
        `🌸 من فضلك ابعت صورة أو رد على صورة باستخدام الأمر: ${usedPrefix + command}`,
      );

    // لو الصيغة مش JPEG أو PNG
    if (!/image\/(jpe?g|png)/.test(mime))
      return m.reply(`🌸 صيغة الملف (${mime}) مش مدعومة، ابعت أو رد على صورة`);

    // رسالة بداية تحسين الصورة
    conn.reply(m.chat, "🌸 جاري تحسين جودة الصورة....", m, {
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

    // تحميل الصورة
    let img = await q.download?.();

    // تحسين الصورة باستخدام خدمة remini
    let pr = await remini(img, "enhance");

    // إرسال الصورة المحسنة
    conn.sendMessage(m.chat, { image: pr }, { quoted: fkontak });
  } catch (e) {
    // لو حصل خطأ
    return m.reply("🌸 حصل خطأ اثناء تحسين الصورة");
  }
};

handler.help = ["remini", "hd", "enhance"]; // الأوامر المتاحة
handler.tags = ["ai", "tools"]; // التصنيفات
handler.command = ["remini", "hd", "حسن"]; // الأوامر المتاحة في البوت

export default handler;

// دالة لتحسين الصورة باستخدام خدمة remini
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0]; // اذا العملية مش موجودة هنختار أول عملية متاحة
    }

    // رابط الخدمة
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";

    // تجهيز البيانات لرفع الصورة
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    formData.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=utf-8",
    });

    // رفع الصورة للـ API
    formData.submit(
      {
        url: baseUrl,
        host: "inferenceengine.vyro.ai",
        path: "/" + operation,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject(err); // لو في خطأ
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        }); // تجميع أجزاء البيانات
        res.on("end", function () {
          resolve(Buffer.concat(chunks));
        }); // إرسال الصورة المحسنة
        res.on("error", function (err) {
          reject(err); // لو في مشكلة
        });
      },
    );
  });
}
