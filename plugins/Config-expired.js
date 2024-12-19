// ===========================================================
// 📌 تم التحديث بواسطة JoanTK
// ✦ الوظيفة: بتتحقق إذا الجروب عدّى تاريخ انتهاء صلاحيته، ولو فعلاً كده، البوت بيخرج من الجروب.
// ✦ الميزات الأساسية:
//   1. **التحقق من انتهاء الصلاحية**: بيشوف لو التاريخ عدى.
//   2. **إبلاغ الجروب**: بيبعت رسالة وداع لما تنتهي مدة الإيجار.
//   3. **تلقائية**: البوت بيخرج لوحده من الجروب لما التاريخ يخلص.
//   4. **التعامل مع الأخطاء**: إضافات عشان أي مشكلة تحصل.
// ===========================================================

export async function all(m) {
  // يتحقق إذا الرسالة جاية من جروب
  if (!m.isGroup) return;

  // يجيب بيانات الجروب من قاعدة البيانات
  let chats = global.db.data.chats[m.chat];

  // لو مفيش تاريخ انتهاء متسجل، ما يعملش حاجة
  if (!chats.expired) return true;

  // التعامل مع الأخطاء: لو حصلت مشكلة أثناء التنفيذ
  try {
    // يتحقق لو التاريخ عدى
    if (+new Date() > chats.expired) {
      // رسالة وداع مخصصة
      let goodbyeMessage =
        chats.expiredMessage ||
        "*✨ خلاص يا جماعة، مدة الإيجار خلصت! تواصل مع الأونر لو عايز تمددها لشهر تاني. ✨*";

      // يبعت رسالة للجروب إنه الإيجار خلص
      await this.reply(m.chat, goodbyeMessage);

      // البوت بيخرج من الجروب
      await this.groupLeave(m.chat);

      // يمسح تاريخ الانتهاء من قاعدة البيانات
      chats.expired = null;

      // يرجع الإعداد لو الجروب دفع للإيجار تاني
      chats.expired = null;

      return true;
    }
  } catch (error) {
    console.error("🚨 حصل خطأ أثناء التحقق من انتهاء الصلاحية:", error);
    await this.reply(
      m.chat,
      "*✨ حصل خطأ أثناء محاولة التحقق من انتهاء مدة الإيجار.✨*",
    );
  }

  // لو مخلصش الإيجار، ما يعملش حاجة
  return true;
}

// أمر لتغيير تاريخ انتهاء الصلاحية بشكل ديناميكي (ممكن يكون ده بكود منفصل)
export async function setExpiration(m, newExpirationDate) {
  let chats = global.db.data.chats[m.chat];

  try {
    // يحدد التاريخ الجديد
    chats.expired = newExpirationDate.getTime(); // يضبط التاريخ الجديد
    await this.reply(
      m.chat,
      `✨ تم تحديث تاريخ انتهاء الإيجار لـ ${newExpirationDate.toString()} ✨`,
    );
  } catch (error) {
    console.error("🚨 حصل خطأ أثناء تحديث تاريخ انتهاء الإيجار:", error);
    await this.reply(
      m.chat,
      "*✨ حصل خطأ أثناء محاولة تحديث تاريخ الإيجار.✨*",
    );
  }
}

// أمر لإعادة تعيين تاريخ الإيجار لو اتجدد الجروب (زي الدفع أو التمديد)
export async function resetExpiration(m) {
  let chats = global.db.data.chats[m.chat];

  try {
    // يمسح تاريخ الإيجار
    chats.expired = null; // يreset التاريخ
    await this.reply(m.chat, "*✨ تم تجديد الإيجار، والجروب لسه شغال! ✨*");
  } catch (error) {
    console.error("🚨 حصل خطأ أثناء إعادة تعيين الإيجار:", error);
    await this.reply(
      m.chat,
      "*✨ حصل خطأ أثناء محاولة إعادة تعيين الإيجار.✨*",
    );
  }
}
