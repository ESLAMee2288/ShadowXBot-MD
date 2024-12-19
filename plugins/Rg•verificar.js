import db from "../lib/database.js"; // استيراد قاعدة البيانات
import { createHash } from "crypto"; // استيراد مكتبة لإنشاء تجزئة
import fs from "fs"; // التعامل مع الملفات
import PhoneNumber from "awesome-phonenumber"; // مكتبة للتحقق من أرقام الهاتف
import fetch from "node-fetch"; // استيراد مكتبة للطلبات
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"; // استيراد مكتبة Baileys

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i; // نموذج لاستخراج الاسم والعمر من النص
let handler = async function (m, { conn, text, usedPrefix, command }) {
  // **تحديد المرسل**
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;

  // **استخراج رقم الهاتف**
  let phoneNumber = new PhoneNumber(
    "+" + m.sender.replace("@s.whatsapp.net", ""),
  ).getNumber("international");

  // **التحقق إذا كان الرقم يبدأ بكود الدولة المصرية**
  if (!phoneNumber.startsWith("+20")) {
    return m.reply("🚫 التسجيل مفتوح فقط للأرقام المصرية!"); // رد عند وجود خطأ
  }

  // **بيانات البلد مُحددة يدويًا**
  let paisdata = {
    name: "مصر",
    emoji: "🇪🇬",
  };

  let mundo = `${paisdata.name} ${paisdata.emoji}`; // دمج اسم البلد مع الإيموجي

  // **الحصول على صورة الملف الشخصي للمستخدم**
  let perfil = await conn
    .profilePictureUrl(who, "image")
    .catch((_) => "https://qu.ax/QGAVS.jpg"); // صورة افتراضية عند عدم وجود صورة

  // **استرجاع بيانات المستخدم من قاعدة البيانات**
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender) || "مجهول";

  // **التحقق إذا كان المستخدم مسجل مسبقًا**
  if (user?.registered === true) {
    return m.reply(
      `🍭 أنت مسجل بالفعل.\n\n*هل تريد إعادة التسجيل؟*\n\nاستخدم هذا الأمر لإلغاء تسجيلك.\n*${usedPrefix}unreg*`,
    );
  }

  // **التحقق من صحة التنسيق (اسم.عمر)**
  if (!Reg.test(text)) {
    return m.reply(
      `🌹 التنسيق غير صحيح.\n\nاستخدام الأمر: *${usedPrefix + command} الاسم.العمر*\nمثال: *${usedPrefix + command} ${name2}.25*`,
    );
  }

  let [_, name, splitter, age] = text.match(Reg); // استخراج الاسم والعمر

  // **التحقق من صحة البيانات المدخلة**
  if (!name) return m.reply("🚩 الاسم لا يمكن أن يكون فارغًا.");
  if (!age) return m.reply("🚩 العمر لا يمكن أن يكون فارغًا.");
  if (name.length >= 100) return m.reply("🚩 الاسم طويل جدًا.");

  age = parseInt(age);
  if (age > 100) return m.reply("👴🏻 واو، الجد يريد اللعب مع البوت!");
  if (age < 5) return m.reply("🚼 هناك طفل يريد اللعب مع البوت!");

  // **تسجيل المستخدم في قاعدة البيانات**
  user.name = `${name}✓`.trim(); // إضافة علامة تحقق للاسم
  user.age = age;
  user.regTime = +new Date(); // وقت التسجيل
  user.registered = true;

  // **تحديث الرصيد**
  user.money = (user.money || 0) + 200;

  // **إنشاء hash لتأكيد هوية المرسل**
  let sn = createHash("md5").update(m.sender).digest("hex");

  // **النص المرسل بعد التسجيل**
  let regbot = `
👤 مستخدم جديد 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「💭」الاسم: ${name}.
「✨️」العمر: ${age} سنة.
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」المكافآت:
المال: 200 جنيه. 💸
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
Shadow X Bot - MD
  `.trim();

  // **إرسال الإشعار**
  await conn.sendMessage(m.chat, { text: regbot }, { quoted: m });

  // **الإشعار في القناة**
  let chtxt = `
👤 *المستخدم* » ${name2}
🌎 *البلد* » ${mundo}
🗃 *التحقق* » ${user.name}
🌺 *العمر* » ${user.age} سنة
📆 *التاريخ* » ${new Date().toLocaleDateString("ar-EG")}
  `.trim();
  const channelJid = "120363368508685742@newsletter"; // معرف القناة

  try {
    await conn.sendMessage(
      channelJid,
      {
        text: chtxt,
        contextInfo: {
          externalAdReply: {
            title: "【 🔔 إشعار 🔔 】",
            body: "🥳 مستخدم جديد مسجل في النظام!",
            thumbnailUrl: perfil,
            sourceUrl: "https://github.com/ESLAMee2288/ShadowXBot-MD", // تعديل الرابط إذا لزم الأمر
          },
        },
      },
      { quoted: fkontak },
    );
  } catch (err) {
    console.error("خطأ أثناء الإرسال للقناة:", err);
  }
};

handler.help = ["سجل", "تسجيل"];
handler.tags = ["rg"];
handler.command = ["سجل", "تسجيل"];

export default handler;
