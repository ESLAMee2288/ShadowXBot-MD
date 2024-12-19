let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let handler = async (m, { conn, text, isOwner }) => {
  let [_, code, expired] = text.match(linkRegex) || [];
  if (!code) throw "📛 الرابط مش صحيح!";
  let res;
  try {
    res = await conn.groupAcceptInvite(code);
  } catch (error) {
    if (error && error.message) {
      if (error.message.includes("not-authorized")) {
        return m.reply(`
❌ مش قادر أضيف البوت لأنه تم طرده قبل كده 
⏳ استنى على الأقل 7 أيام 
( ما تعملش سبام للأمر ده )
                `);
      } else if (error.message.includes("gone")) {
        return m.reply("❌ الرابط مش شغال أو تم تغييره.");
      }
    }
    throw error;
  }

  let user = global.db.data.users[m.sender];
  let now = Date.now();
  let maxTime = Math.floor((user.premiumTime - now) / (1000 * 60 * 60 * 24)); // حساب الوقت المتبقي للمستخدم البريميوم بالأيام

  expired = Math.floor(
    Math.min(
      maxTime,
      Math.max(1, isOwner ? (isNumber(expired) ? parseInt(expired) : 0) : 3),
    ),
  );
  if (expired > maxTime) {
    return m.reply(`⏳ أقصى مدة كـ مستخدم بريميوم هي ${maxTime} يوم.`);
  }

  m.reply(
    `✅ دخلت الجروب ${res}${
      expired
        ? ` لمدة ${expired} يوم(s)

📢 لو الأدمين شغال بالموافقة على الأعضاء، اقبل الرقم ده`
        : ""
    }`,
  );
  let chats = global.db.data.chats[res];
  if (!chats) chats = global.db.data.chats[res] = {};
  if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24;
};

handler.help = ["join <chat.whatsapp.com>"];
handler.tags = ["المالك"];

handler.command = /^join$/i;
handler.rowner = false;

export default handler;

const isNumber = (x) => ((x = parseInt(x)), typeof x === "number" && !isNaN(x));
