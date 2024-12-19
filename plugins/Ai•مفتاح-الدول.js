import fs from "fs/promises";

let handler = async (m, { conn, text, isGroup }) => {
  const countryName = text.trim();
  if (!countryName) {
    return conn.sendMessage(
      m.chat,
      {
        text: "⚠️ *يرجى إدخال اسم الدولة للحصول على معلوماتها.*\n\n*مثال:*\n`.مفتاح مصر`",
      },
      { quoted: m },
    );
  }

  // قراءة بيانات الدول من ملف JSON
  let countryData;
  try {
    const data = await fs.readFile("src/JSON/countries.json", "utf-8");
    countryData = JSON.parse(data);
  } catch (err) {
    console.error("❌ خطأ في قراءة ملف الدول:", err);
    return conn.sendMessage(
      m.chat,
      {
        text: "❌ *حدث خطأ أثناء تحميل البيانات. حاول مرة أخرى لاحقًا.*",
      },
      { quoted: m },
    );
  }

  const countryInfo = countryData.find(
    (country) => country.name === countryName,
  );

  if (countryInfo) {
    // إرسال رسالة واحدة تحتوي على النص والصورة باستخدام conn.sendFile
    conn.sendFile(
      m.chat,
      "https://qu.ax/AAtDn.jpg",
      "country-info.png",
      `🌍 *معلومات عن "${countryName}":*\n\n` +
        `- *علم الدولة "${countryInfo.flag}":*\n\n` +
        `- *المفتاح الدولي:* ${countryInfo.code}\n\n` +
        `- *وصف:* ${countryInfo.description}`,
      m,
    );
  } else {
    // اقتراحات عند إدخال اسم خاطئ
    const suggestions = countryData
      .map((country) => country.name)
      .filter((name) => name.includes(countryName))
      .slice(0, 5)
      .join(", ");

    const suggestions1 = countryData
      .map((country) => country.name)
      .filter((name) => name.includes(countryName))
      .slice(0, 1)
      .join(", ");
    conn.sendMessage(
      m.chat,
      {
        text: `❌ *لم يتم العثور على الدولة "${countryName}".*\n\n*اقتراحات:* ${suggestions || "لا توجد"}\n\n*مثال:*\n\`.مفتاح ${suggestions1 || "مصر"}\``,
      },
      { quoted: m },
    );
  }
};

handler.help = ["مفتاح <اسم الدولة>"];
handler.tags = ["group", "info"];
handler.command = /^(مفتاح|مفتاح_دولي)$/i;

export default handler;
