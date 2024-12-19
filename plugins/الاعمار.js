let handler = (m, { usedPrefix, command, text }) => {
  if (!text) throw `✨️ مثال:\n${usedPrefix + command} 2000 06 09`;

  // تحويل النص المدخل إلى تاريخ 📅
  const date = new Date(text);
  if (isNaN(date))
    throw "❌ التاريخ مش صحيح، جرب التنسيق ده: AAAA MM DD مثال: 2003 02 07";

  const d = new Date();
  const [tahun, bulan, tanggal] = [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  ]; // السنة والشهر واليوم الحالي 📅
  const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]; // تاريخ الميلاد 🎂

  const zodiac = getZodiac(birth[1], birth[2]); // البرج الفلكي بناءً على الشهر واليوم ♈♉♊
  const ageD = new Date(d - date); // حساب العمر باستخدام الفرق بين التاريخ الحالي وتاريخ الميلاد 🎂
  const age = ageD.getFullYear() - 1970; // حساب العمر بدقة 🧑‍🦳

  // حساب تاريخ عيد الميلاد القادم 🎉
  const birthday = [
    tahun + (birth[1] < bulan || (birth[1] === bulan && birth[2] < tanggal)),
    ...birth.slice(1),
  ];

  // تحديد إذا كان اليوم هو عيد ميلاد الشخص 🎈
  const cekusia =
    bulan === birth[1] && tanggal === birth[2]
      ? `${age} - عيد ميلاد سعيد يا حبيبي ☁️🎂`
      : age;

  const teks = `
تاريخ الميلاد: ${birth.join("-")} 🗓️
عيد الميلاد القادم: ${birthday.join("-")} 🎉
العمر: ${cekusia} 🎂
البرج الفلكي: ${zodiac} 🌟
`.trim();

  // إرسال الرد للمستخدم 📬
  m.reply(teks);
};

handler.help = ["zodiac *2002 02 25*"];
handler.tags = ["fun"];
handler.command = ["عمري"];

export default handler;

// قائمة الأبراج الفلكية وتواريخها ♈♉♊
const zodiak = [
  ["برج الجدي", new Date(1970, 0, 1)],
  ["برج الدلو", new Date(1970, 0, 20)],
  ["برج الحوت", new Date(1970, 1, 19)],
  ["برج الحمل", new Date(1970, 2, 21)],
  ["برج الثور", new Date(1970, 3, 21)],
  ["برج الجوزاء", new Date(1970, 4, 21)],
  ["برج السرطان", new Date(1970, 5, 22)],
  ["برج الأسد", new Date(1970, 6, 23)],
  ["برج العذراء", new Date(1970, 7, 23)],
  ["برج الميزان", new Date(1970, 8, 23)],
  ["برج العقرب", new Date(1970, 9, 23)],
  ["برج القوس", new Date(1970, 10, 22)],
  ["برج الجدي", new Date(1970, 11, 22)],
].reverse();

function getZodiac(month, day) {
  let d = new Date(1970, month - 1, day);
  return zodiak.find(([_, _d]) => d >= _d)[0];
}
