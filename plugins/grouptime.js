let handler = async (
  m,
  { conn, isAdmin, isOwner, args, usedPrefix, command },
) => {
  try {
    // التحقق من صلاحيات المسؤول أو المالك
    if (!(isAdmin || isOwner)) {
      global.dfail("admin", m, conn);
      throw false;
    }

    // تحديد حالة المجموعة (مفتوحة أو مغلقة)
    let isClose = {
      open: "not_announcement",
      فتح: "not_announcement",
      abierto: "not_announcement",
      buka: "not_announcement",
      on: "not_announcement",
      1: "not_announcement",

      close: "announcement",
      غلق: "announcement",
      cerrado: "announcement",
      tutup: "announcement",
      off: "announcement",
      0: "announcement",
    }[args[0] || ""];

    // في حالة إذا كان الوضع غير صحيح
    if (isClose === undefined) {
      let messages = [
        "الوقت بقى متأخر عشان نفتح، يلا نخلص الشغل و نرتاح شوية",
        "الوقت ده كويس عشان نبدأ نفتح ونشتغل مع بعض",
        "في وقت مميز عشان نبدأ نشتغل زي ما احنا عايزين",
        "خلاص قربنا نخلص و كده نقدر نريح شوية",
        "في وقت مناسب نقدر نفتح و نكون جاهزين شوية",
        "الساعة مش بعيد عننا عشان نخلص شوية ونرتاح",
        "مفيش وقت تاني غير دلوقتي عشان نبدأ مع بعض",
        "خلاص وقت الاغلاق قرب شوية وهنشوف إيه اللي ممكن نعمله بعد كده",
        "عايزين نبدأ شوية عشان نكون جاهزين للي جاي",
        "لو بدأنا الوقت ده هنقدر ننجز بسرعة و بنجاح",
        "بقى فيه شوية وقت لفتح الموضوع ده شوية ونمشي عليه",
        "نقدر نخلص كل حاجة ونبدأ نقفل بسرعة بعد كده",
        "قربنا نخلص الوقت ونشوف آخر التفاصيل",
        "الوقت ده كويس لفتح الموضوع ونتصرف فيه مع بعض",
        "في وقت بسيط نخلص ونبدأ شغلنا كويس",
      ];

      let description = [
        "في اللحظة دي هنكون بدأنا نفتح كل حاجة وننظم الوقت",
        "الوقت دلوقتي مناسب عشان نكون جاهزين عشان نبدأ",
        "الموضوع ده مهم ولو بدأنا دلوقتي هنقدر نخلص بسرعة",
        "محتاجين نشتغل في الوقت ده علشان يكون فيه وقت كافي للراحة",
        "الوقت كويس علشان نبدأ و نخلص شوية بسرعة",
        "لو بدأنا دلوقتي هنقدر نكون جاهزين للمرحلة الجاية",
        "الحاجة اللي هتكون لو عملنا ده دلوقتي هتخلي الوقت مناسب لينا",
        "مفيش مانع من نبدأ دلوقتي ونشوف الخطوات الجاية",
        "هنا الوقت المناسب لبدء كل حاجة و ننجز أكتر في وقت سريع",
        "الشغل هيمشي بس مش لازم نضيع وقت علشان ننجز بسرعة",
        "في كل وقت ممكن نكون جاهزين و نتعامل مع كل شيء",
        "لو قررنا نبدأ دلوقتي هنبقى جاهزين أكتر في أقرب وقت",
        "نقدر نفتح ونغلق في الوقت ده و نمشي بالترتيب صح",
        "لو هنشتغل دلوقتي هيناسب كل حاجة وهنقدر نرتاح بعد كده",
      ];

      let sections = Object.keys(messages, description).map((v, index) => ({
        title: `خيارات الإدارة`,
        rows: [
          {
            title: `${messages[v]}`,
            description: `${description[v]}`,
            rowId: usedPrefix + command + " " + messages[v],
          },
        ],
      }));

      let caption = `إعدادات المجموعة: 
     *${usedPrefix + command} فتح 1*
     *${usedPrefix + command} غلق 1*`;

      const listMessage = {
        text: `إعدادات المجموعة`,
        footer: `${caption}`,
        title: null,
        buttonText: `⚙️ الإعدادات ⚙️`,
        sections,
      };

      await conn.reply(m.chat, `${caption}`, null, m);
      throw false;
    }

    let timeoutset = (86400000 * args[1]) / 24; //ساعة واحدة = 86400000 ملي ثانية
    await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
      m.reply(
        `تم تحديث إعدادات المجموعة إلى ${isClose == "announcement" ? "مغلق" : "مفتوح"} ${args[1] ? ` لمدة ${clockString(timeoutset)}` : ""}`,
      );
    });

    // إذا كان هناك وقت محدد للإغلاق
    if (args[1]) {
      setTimeout(async () => {
        await conn
          .groupSettingUpdate(
            m.chat,
            `${isClose == "announcement" ? "not_announcement" : "announcement"}`,
          )
          .then(async (_) => {
            conn.reply(
              m.chat,
              `${isClose == "not_announcement" ? "المجموعة مفتوحة الآن!" : "المجموعة مغلقة الآن!"}`,
            );
          });
      }, timeoutset);
    }
  } catch (e) {
    await conn.reply(
      m.chat,
      `حدث خطأ: ${usedPrefix + command}\n\nيرجى الإبلاغ عن المشكلة!`,
      null,
      m,
    );
    console.log(`❗❗ خطأ في الأمر ${usedPrefix + command} ❗❗`);
    console.log(e);
  }
};

// إعدادات البوت والأنماط
handler.help = ["grouptime"];
handler.tags = ["grouptime"];
handler.command = /^(grouptime|gctime|grupotiempo)$/i;
handler.botAdmin = true;
handler.group = true;
handler.admin = true;

export default handler;

// دالة لحساب الوقت بشكل جيد
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
