let handler = async (
  m,
  { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner },
) => {
  let isEnable = /true|فتح|افتح|on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || "").toLowerCase();
  let isAll = false,
    isUser = false;
  switch (type) {
    case "welcome":
    case "الترحيب":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;

    case "antiPrivate":
    case "منع-الخاص":
      isAll = true;
      if (!isOwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      bot.antiPrivate = isEnable;
      break;

    case "restrict":
    case "اقفل":
      isAll = true;
      if (!isOwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;

    case "autolevelup":
    case "رفع-المستوى-التلقائي":
    case "رفع-المستوي-التلقائي":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autolevelup = isEnable;
      break;

    case "antibot":
    case "antibots":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiBot = isEnable;
      break;

    case "autoaceptar":
    case "aceptarauto":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autoAceptar = isEnable;
      break;

    case "autorechazar":
    case "rechazarauto":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autoRechazar = isEnable;
      break;

    case "antisubbots":
    case "antisub":
    case "antisubot":
    case "antibot2":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiBot2 = isEnable;
      break;

    case "antifake":
    case "antifakes":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antifake = isEnable;
      break;

    case "autoresponder":
    case "autorespond":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.autoresponder = isEnable;
      break;

    case "modoadmin":
    case "soloadmin":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case "autoread":
    case "قراءه-تلقائيه":
    case "قراءه-تلقائية":
    case "قراءة-تلقائيه":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["autoread"] = isEnable;
      break;

    case "antiver":
    case "antiocultar":
    case "antiviewonce":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.antiver = isEnable;
      break;

    case "reaction":
    case "reaccion":
    case "emojis":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.reaction = isEnable;
      break;

    case "audios":
    case "audiosbot":
    case "botaudios":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.audios = isEnable;
      break;

    case "antiSpam":
    case "antispam":
    case "antispamosos":
      isAll = true;
      if (!isOwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      bot.antiSpam = isEnable;
      break;

    case "antidelete":
    case "antieliminar":
    case "delete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.delete = isEnable;
      break;

    case "autobio":
    case "status":
    case "bio":
      isAll = true;
      if (!isOwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      bot.autobio = isEnable;
      break;

    case "jadibotmd":
    case "serbot":
    case "subbots":
      isAll = true;
      if (!isOwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      bot.jadibotmd = isEnable;
      break;

    case "detect":
    case "configuraciones":
    case "avisodegp":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;

    case "simi":
    case "autosimi":
    case "simsimi":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.simi = isEnable;
      break;

    case "document":
    case "documento":
      isUser = true;
      user.useDocument = isEnable;
      break;

    case "مضاداللينكات":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;

    default:
      if (!/[01]/.test(command))
        return conn.reply(
          m.chat,
          `
      ❐═════╡⭒✧✿✧⭒╞═════❐  
                ❮👑↜ قسم إعدادات المالك ┇✨❯  
      ❐═════╡⭒✧✿✧⭒╞═════❐  
      
      🌟 **منع السبام ┇ \`${usedPrefix + command} antispam\`**  
      > يمنع إرسال الرسائل المكررة أو العشوائية، لضمان تنظيم الجروب ومنع الفوضى.  
      
      🌟 **منع الرسائل الخاصة ┇ \`${usedPrefix + command} antiPrivate\`**  
      > يحمي البوت من الرسائل الخاصة المزعجة ويمنع محاولات إزعاج البوت.  
      
      🌟 **حالة البوت ┇ \`${usedPrefix + command} status\`**  
      > يعرض الحالة الحالية للبوت وعدد الجروبات التي يعمل بها.  
      
      🌟 **قراءة تلقائية ┇ \`${usedPrefix + command} autoread\`**  
      > يجعل البوت يقرأ الرسائل فور وصولها، مما يتيح سرعة الردود.  
      
      🌟 **تقييد المستخدمين ┇ \`${usedPrefix + command} restrict\`**  
      > يتيح لك كمالك التحكم بصلاحيات الأعضاء داخل المجموعة.
      
      ❐═════╡⭒✧✿✧⭒╞═════❐  
      
      ❐═════╡⊰🚩⊱╞═════❐  
                ❮🌟↜ قسم إعدادات الجروبات ┇🚩❯  
      ❐═════╡⊰🚩⊱╞═════❐  
      
      🎉 **الترحيب ┇ \`${usedPrefix + command} welcome\`**  
      > يُرسل رسائل مخصصة للترحيب بالأعضاء الجدد عند انضمامهم.  
      
      🎉 **قبول تلقائي ┇ \`${usedPrefix + command} autoaceptar\`**  
      > يقبل طلبات الانضمام إلى الجروب تلقائيًا دون تدخل يدوي.  
      
      🎉 **رفض تلقائي ┇ \`${usedPrefix + command} autorechazar\`**  
      > يرفض طلبات الانضمام غير المرغوب فيها بشكل تلقائي.  
      
      🎉 **كشف الأعضاء الجدد ┇ \`${usedPrefix + command} detect\`**  
      > يعرض معلومات الأعضاء الجدد في الجروب عند انضمامهم.  
      
      ❐═════╡⊰🚩⊱╞═════❐  
      
      ❐═════╡⊰🛡️⊱╞═════❐  
                ❮🛡️↜ قسم الحماية ┇🔒❯  
      ❐═════╡⊰🛡️⊱╞═════❐  
      
      🛡️ **منع الروابط ┇ \`${usedPrefix + command} antilink\`**  
      > يمنع مشاركة الروابط داخل الجروب، لحمايته من الإعلانات.  
      
      🛡️ **منع الأرقام المزيفة ┇ \`${usedPrefix + command} antifake\`**  
      > يرفض دخول الأرقام الوهمية أو الغير صالحة إلى الجروب.  
      
      🛡️ **منع الروبوتات ┇ \`${usedPrefix + command} antibot\`**  
      > يحمي الجروب من دخول روبوتات غير مصرح بها.  
      
      ❐═════╡⊰🛡️⊱╞═════❐  
      
      ❐═════╡⊰🎭⊱╞═════❐  
                ❮🎭↜ قسم الترفيه والمحتوى ┇🎵❯  
      ❐═════╡⊰🎭⊱╞═════❐  
      
      🎵 **الصوتيات ┇ \`${usedPrefix + command} audios\`**  
      > يمكّنك من تشغيل ومشاركة المقاطع الصوتية بسهولة.  
      
      🎭 **محتوى للبالغين ┇ \`${usedPrefix + command} nsfw\`**  
      > يتيح أو يمنع المحتويات المخصصة للبالغين في الجروب.  
      
      ❐═════╡⊰🎭⊱╞═════❐  
      
      ❐═════╡⊰🤖⊱╞═════❐  
                ❮🤖↜ قسم الذكاء الصناعي ┇🧠❯  
      ❐═════╡⊰🤖⊱╞═════❐  
      
      🤖 **الذكاء الصناعي ┇ \`${usedPrefix + command} simi\`**  
      > يمكنك التحدث مع البوت والحصول على ردود ذكية وطبيعية.  
      
      ❐═════╡⊰🤖⊱╞═════❐  
      
      ❐═════╡⊰👮⊱╞═════❐  
                ❮👮↜ قسم الإدارة ┇⚠️❯  
      ❐═════╡⊰👮⊱╞═════❐  
      
      ⚠️ **وضع المدير ┇ \`${usedPrefix + command} modoadmin\`**  
      > يتيح فقط للمديرين إرسال الرسائل داخل الجروب، مما يضمن تنظيمه.  
      
      🗑️ **حذف الرسائل ┇ \`${usedPrefix + command} delete\`**  
      > يسمح للبوت بحذف الرسائل غير المرغوب فيها بسرعة.  
      
      ❐═════╡⊰👮⊱╞═════❐  
      `,
          m,
          rcanal,
        );

      throw false;
  }
  conn.reply(
    m.chat,
    `🚩 الوظيفة *${type}* ${isEnable ? "اتفعّلت" : "اتوقفت"} ${isAll ? "للبوت ده" : isUser ? "" : "للدردشة دي"} 💥`,
    m,
    rcanal,
  );
};

handler.help = ["enable", "disable"];
handler.tags = ["nable", "owner"];
handler.command = ["on", "off", "اقفل", "افتح", "قفل", "فتح"];

export default handler;
