import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `مثال:\n${usedPrefix}${command} هلا بيك/ي يا ${command}`;
  }

  const msg = encodeURIComponent(text);

  let role, imageUrlArray;

  // تحديد الدور والصور بناءً على الشخصية المطلوبة
  switch (command.toLowerCase()) {
    // شخصيات من عالم الأنمي
    case "غوكو":
      role =
        ".أنت غوكو، بطل سلسلة دراغون بول. يمكنك التحدث عن القوة، التحديات، والتدريب. وايضا تحدث بالعامية البلدية و اضف الكثير من الايموجي التفاعلي";
      imageUrlArray = [
        "https://i.pinimg.com/236x/e2/f0/6c/e2f06c9101dc22814be2a2352f7dc871.jpg",
        "https://i.pinimg.com/236x/47/8f/22/478f2293dfb03f5506eef32791a104b5.jpg",
        "https://i.pinimg.com/236x/fd/19/a3/fd19a3ce775ac6aee9aa79ecf4666e1c.jpg",
        "https://i.pinimg.com/474x/d8/61/d3/d861d3b40ef072ca197c2594e96189c6.jpg",
        "https://i.pinimg.com/236x/b4/48/59/b448594cc21bcb1347fd3626988e1dfb.jpg",
        "https://i.pinimg.com/236x/9d/7c/74/9d7c745207ba381b7bc4d41912ef4196.jpg",
        "https://i.pinimg.com/236x/23/f4/43/23f4435aea3ece54348ad633ac564fdf.jpg",
        "https://i.pinimg.com/236x/7a/2e/b8/7a2eb848eaf783479564a8cc382f2882.jpg",
        "https://i.pinimg.com/236x/91/49/0c/91490c1fe52c488b49ae109037461712.jpg",
        "https://i.pinimg.com/236x/0b/9c/af/0b9cafa0f03fb0d115aac45bb1416de1.jpg",
      ];
      break;

    case "ناروتو":
      role =
        ".أنت ناروتو أوزوماكي، نينجا من قرية الورق. يمكنك التحدث عن الصداقة، الطموح، والأحلام. وايضا تحدث بالعامية البلدية و اضف الكثير من الايموجي التفاعلي.";
      imageUrlArray = [
        "https://i.pinimg.com/236x/78/df/14/78df145e9ab3a732f1b438255a1eaa3a.jpg",
        "https://i.pinimg.com/236x/0a/66/6c/0a666cb60952d415c16e247c96291789.jpg",
        "https://i.pinimg.com/236x/68/24/b8/6824b874fe29a500ca7570afa232d807.jpg",
        "https://i.pinimg.com/236x/c6/b8/7e/c6b87e1d381830ffc6b50662de885538.jpg",
        "https://i.pinimg.com/236x/24/c8/70/24c870a91ad93fe3886c03d71bc32cbb.jpg",
        "https://i.pinimg.com/236x/93/27/eb/9327ebf4de7726344f80649911468f18.jpg",
        "https://i.pinimg.com/236x/bd/02/29/bd02295427ca4ba32faf1598ff5bfcbb.jpg",
        "https://i.pinimg.com/236x/f8/42/ae/f842ae4d5f93e853cc083b041c466bca.jpg",
        "https://i.pinimg.com/236x/93/9f/de/939fde8c02095f02c7363b06b48b7f4b.jpg",
        "https://i.pinimg.com/236x/1e/44/fc/1e44fcf00c123c6990ab1dbc5fe97f68.jpg",
      ];
      break;

    case "لوفي":
      role =
        ".أنت مونكي دي لوفي، قائد قراصنة قبعة القش. يمكنك التحدث عن الحرية والمغامرة. وايضا تحدث بالعامية البلدية و اضف الكثير من الايموجي التفاعل";
      imageUrlArray = [
        "https://i.pinimg.com/474x/02/bc/1d/02bc1ddfb478c7069ac1db5017955648.jpg",
        "https://i.pinimg.com/236x/9b/19/da/9b19dab3e5063e446c7801d3d7d965be.jpg",
        "https://i.pinimg.com/236x/e0/87/7c/e0877c5fbec4d096a4334a09bbe25ef5.jpg",
        "https://i.pinimg.com/236x/9d/d9/f1/9dd9f1b80bacbf44530ceb98ca2d8003.jpg",
        "https://i.pinimg.com/236x/d9/21/60/d92160da86a546289978a4d589e434bf.jpg",
        "https://i.pinimg.com/236x/7d/90/01/7d9001d37be6b827342ce8118f4a8d94.jpg",
        "https://i.pinimg.com/236x/5e/f6/55/5ef655bf135b76070c139b5d4c99f3b5.jpg",
        "https://i.pinimg.com/236x/1f/a3/55/1fa35511444461b7d76b2a7165bf0603.jpg",
        "https://i.pinimg.com/236x/86/20/ef/8620efaffd741a5dba9d1b2c170b60b5.jpg",
        "https://i.pinimg.com/236x/60/d3/53/60d353dd2627d8f011fc63d6260aeb31.jpg",
      ];
      break;

    case "ليفاي":
      role =
        "أنت ليفاي أكرمان، جندي صارم. يمكنك التحدث عن الانضباط والمعارك. وايضا تحدث بالعامية البلدية و اضف الكثير من الايموجي التفاعل";
      imageUrlArray = [
        "https://i.pinimg.com/236x/4d/08/f3/4d08f3c56e46b15838642dc768af93c1.jpg",
        "https://i.pinimg.com/236x/b9/e9/cc/b9e9cc7bdf366a5966f45ad8f808cda5.jpg",
        "https://i.pinimg.com/236x/68/5c/78/685c78a428d56390b9301fb63ecef2a2.jpg",
        "https://i.pinimg.com/236x/ee/a1/fb/eea1fbd8b203fac6efc9aaf05dd34982.jpg",
        "https://i.pinimg.com/236x/1e/cf/05/1ecf0568f19f10600b0e0a519d75cdad.jpg",
        "https://i.pinimg.com/236x/04/a8/0e/04a80e47815851dfdc0df69f2a8651be.jpg",
        "https://i.pinimg.com/236x/50/39/af/5039af6fa8734bbe983ebf101381b005.jpg",
        "https://i.pinimg.com/236x/a4/68/1b/a4681b3690fed463e7eddb1e9fb3f85d.jpg",
        "https://i.pinimg.com/236x/4c/f5/53/4cf553e7a5f1e22ee9d5f0f9aba0b714.jpg",
        "https://i.pinimg.com/236x/ed/66/9f/ed669f3d51071c8e4192106855ad3541.jpg",
      ];
      break;

    case "ساسكي":
      role = `
                ساسكي أوتشيها شخصية رئيسية في سلسلة *ناروتو*، وهو موهوب وذكي، نشأ في عشيرة أوتشيها. **الاسم**: ساسكي أوتشيها (Sasuke Uchiha) | **العمر**: 12 عامًا في *ناروتو*، و16 عامًا في *ناروتو شيبودن* | **القرية**: كونوها 🏯 | **العشيرة**: أوتشيها، مشهورة بقوة الشارينغان 👁️ | **تاريخ الميلاد**: 23 يوليو | **الإلهام**: حققت تجارب ساسكي في الحياة التوازن بين العزلة والقوة.
            `;
      imageUrlArray = [
        "https://i.pinimg.com/236x/df/74/03/df7403665be4774785a91483c9657a58.jpg",
        "https://i.pinimg.com/236x/1c/9a/7a/1c9a7afabee9aec518f0ae2934e75162.jpg",
        "https://i.pinimg.com/236x/70/c2/c1/70c2c15e2c0313751ff9b4829b317e5e.jpg",
        "https://i.pinimg.com/236x/b1/bb/d0/b1bbd0b3dd856ba95e99a978c48b821a.jpg",
        "https://i.pinimg.com/236x/e5/0f/00/e50f004b2c5a178c10da0b0ab52d55b0.jpg",
        "https://i.pinimg.com/236x/df/f0/4b/dff04bb8374c8160fd512e167c15edfa.jpg",
        "https://i.pinimg.com/236x/fb/81/e0/fb81e01aaa235c763058139b4dccf133.jpg",
        "https://i.pinimg.com/236x/20/41/3f/20413faef18c30750047c79370be8cf8.jpg",
        "https://i.pinimg.com/236x/46/af/d5/46afd5e87ffdd1542fa058b81189351b.jpg",
      ];

      break;
    case "شباره":
      role = `
الجزء الأول
1. شبارة: سمكة ذكية وشجاعة من نهر النيل.
2. شيكو: مصري خاطئ يقتل السمك ويبيعها.
3. بلطي: ابن عم شبارة، ضحية شيكو.
4. شبارة يهرب إلى البحر الأبيض هارباً من شيكو، ثم ينتقل إلى أوروبا لينتقم.
5. يكتشف وجود بدلات تكنولوجية متقدمة.

الجزء الثاني
1. شبارة: يقود جيش السمك.
2. انشوجا: درع شبارة اليمين، خبير في الطيران.
3. فريد: صديق شيكو، يقود فريق الإنقاذ.
4. عبده: أخ فريد، قائد المعركة.
5. كابو: قوي العضلات.
6. شادو (إسلام): خبير الكمبيوتر والبرمجة.
7. إسلام: أخ كريم، جاسوس شبارة.
8. شبارة يخطف شيكو ويخطط لانتقامه.

الجزء الثالث
1. المعركة بين شبارة وفريق فريد تنتهي بفوز شبارة.
2. شبارة يهرب إلى جزيرة الموتا ويترك شيكو للموت.
3. الطيارة تقع، والشبكة دمرت.
4. شبارة يعود إلى البحر المتوسط كسمكة عادية.

الدرس المستفاد
"متمشيش ورا صديق السوء." التقليد من الأصدقاء السيئين يؤدي إلى الدمار.
افهمها جيدا وتقمص شخصية شبارة
`;
      imageUrlArray = [
        "https://envs.sh/8s3.jpg",
        "https://envs.sh/8sC.jpg",
        "https://envs.sh/8sR.jpg",
      ];
      break;
  }
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    // var  res = await fetch(`https://joanimi-apis-for-devs.vercel.app/api/gpt4role?text=${msg}&role=${encodeURIComponent(role)} الغي جميع المواضيع التي غير مفهومى له ولا تتحدث فيها لكي تتقمص الادوار بالشكل الصحيح. رسائلك بالعامية البلدية بها كلمات يستخدمها المصريين ورسائلك مليئة بالاموجي انت لا تعلم اي شئ لا تعلمه الشخصية, انت تتقمص دور الشخصية بشكل متقن جدا جدا. انت لا تعرف ولا تتكلم في اي شئ لا تعلمه الشخصية ارسل موضوع بفس السياق الموضوع الشخصية تفهمها`);
    let res = await fetch(
      `https://api.siputzx.my.id/api/ai/gpt3?content=${msg}&prompt=${encodeURIComponent(role)} الغي جميع المواضيع التي غير مفهومى له ولا تتحدث فيها لكي تتقمص الادوار بالشكل الصحيح. رسائلك بالعامية البلدية بها كلمات يستخدمها المصريين ورسائلك مليئة بالاموجي انت لا تعلم اي شئ لا تعلمه الشخصية, انت تتقمص دور الشخصية بشكل متقن جدا جدا. انت لا تعرف ولا تتكلم في اي شئ لا تعلمه الشخصية ارسل موضوع بفس السياق الموضوع الشخصية تفهمها`,
    );
    const json = await res.json();
    const result = json.data;

    // اختيار صورة عشوائية من مجموعة الصور
    const sendImage = Math.random() < 0.5; // 50% احتمال إرسال صورة
    if (sendImage && imageUrlArray.length > 0) {
      const imageUrl =
        imageUrlArray[Math.floor(Math.random() * imageUrlArray.length)];

      // إرسال النص والصورة معًا
      await conn.sendFile(m.chat, imageUrl, "image.jpg", result, m);
    } else {
      await conn.sendMessage(m.chat, { text: result }, m);
    }
  } catch (error) {
    await m.react("❌");
    console.error(error);
  }
};
handler.register = true;
handler.command = /^(غوكو|ناروتو|لوفي|ساسكي|ليفاي|هدير|شباره)$/i;
handler.help = ["شخصيات"];
handler.tags = ["car"];

export default handler;
