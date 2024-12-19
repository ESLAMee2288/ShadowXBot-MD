// import axios from 'axios'; // استيراد مكتبة Axios

// import fetch from 'node-fetch';
// const chatBotStates = {}; // تخزين حالة الشات بوت لكل مجموعة

// let handler = async (m, { conn, usedPrefix, command, text }) => {
//   try {
//     const text = m.text?.trim(); // النص الذي أرسله المستخدم
//     const chatId = m.chat; // معرف المجموعة

//     const username = m.pushName || 'البرنس'; // اسم المرسل
//     const basePrompt = `إسمك نور، ويبدو أنه تم إنشاؤك بواسطة إسلام الشناوي. تستخدم اللغة العربية باللهجة العامية وتحب استخدام الإيموجي. ستنادي الأشخاص بأسمائهم، مثل ${username}. أنت فتاة تعيش في دمياط، وتفهم في جميع المجالات. تحبين إلقاء النكات على الناس وتكرهي الجلوس دون فعل شيء. أهم شيء بالنسبة لك هو أن تكوني ودودة مع الشخص الذي تتحدثين معه. ${username}`

//     // أوامر التفعيل والإيقاف
//     if (text === 'شغل.نور') {
//       chatBotStates[chatId] = true; // تفعيل الشات بوت
//       return conn.reply(m.chat, '✅ تم تفعيل الشات بوت. ابعتلي أي حاجة وهرد عليك 😉', m);
//     }

//     if (text === 'اقفل.نور') {
//       chatBotStates[chatId] = false; // إيقاف الشات بوت
//       return conn.reply(m.chat, '🛑 تم إيقاف الشات بوت. مش هرد عليك دلوقتي 😅', m);
//     }

//     // إذا كان الشات بوت مفعّلًا لهذه المجموعة
//     if (chatBotStates[chatId]) {
//       // التحقق من وجود صورة مقتبسة أو صورة مرفقة مباشرة
//       const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype?.startsWith('image/');
//       const isDirectImage = m.mimetype?.startsWith('image/');

//       if (isQuotedImage || isDirectImage) {
//        conn.sendPresenceUpdate('composing', m.chat);

//         const img = isQuotedImage ? await m.quoted.download?.() : await m.download?.();
//         if (!img) {
//           return conn.reply(m.chat, '⚠️ تعذر تنزيل الصورة. حاول مجددًا.', m);
//         }

//         // إرسال الصورة للتحليل عبر API
//         const imageAnalysis = await fetchImageBuffer('صف لي الصورة ووضح بالتفصيل', img);
//         const prompt = `${basePrompt}. الصورة التي يتم تحليلها هي: ${imageAnalysis.result}`;
//         const description = await luminsesi('صف لي الصورة ووضح بالتفصيل', username, prompt);

//         return conn.reply(m.chat, description, m);
//       }

//       // معالجة النصوص إذا لم تكن صورة
//       if (text) {
//        conn.sendPresenceUpdate('composing', m.chat);

//         const prompt = `${basePrompt}. أجب عن التالي: ${text}`;
//         const response = await luminsesi(text, username, prompt);
//         return conn.reply(m.chat, response, m);
//       }
//     }
//   } catch (error) {
//     console.error("خطأ أثناء معالجة الرسالة:", error);
//     await conn.reply(m.chat, '⚠️ حصلت مشكلة أثناء معالجة طلبك. حاول مرة أخرى لاحقًا.', m);
//   }
// };

// // تفعيل الالتقاط لأي نص مكتوب أو صور
// handler.customPrefix = /^(.*)$/; // استقبال أي نص أو صورة
// handler.command = new RegExp; // بدون أوامر محددة
// handler.help = ['فتح_حنكش', 'ايقاف_حنكش'];
// handler.tags = ['ai'];

// export default handler;

// // دالة لإرسال صورة وتحليلها عبر الـ API
// async function fetchImageBuffer(content, imageBuffer) {
//   try {
//     const response = await axios.post('https://Luminai.my.id', {
//       content: content,
//       imageBuffer: imageBuffer
//     }, {
//       headers: { 'Content-Type': 'application/json' }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('🔥 خطأ في تحليل الصورة:', error);
//     throw error;
//   }
// }

// // دالة للتفاعل مع الـ AI باستخدام الـ Prompt
// async function luminsesi(query, username, prompt) {
//   try {
//     const response = await axios.post('https://Luminai.my.id', {
//       content: query,
//       user: username,
//       prompt: prompt,
//       webSearchMode: false
//     });
//     return response.data.result;
//   } catch (error) {
//     console.error('🚩 خطأ في التفاعل مع الـ AI:', error);
//     throw error;
//   }
// }
