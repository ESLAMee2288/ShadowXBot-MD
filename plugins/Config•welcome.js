import { WAMessageStubType } from "@whiskeysockets/baileys";
import fetch from "node-fetch";

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // جلب صورة البروفايل
  let pp = await conn
    .profilePictureUrl(m.messageStubParameters[0], "image")
    .catch((_) => "https://qu.ax/QGAVS.jpg");
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  let who = m.messageStubParameters[0] + "@s.whatsapp.net";
  let user = global.db.data.users[who];

  // اسم المستخدم
  let userName = user ? user.name : await conn.getName(who);

  // حالة الترحيب
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `ゲ◜៹ عضو جديد ៹◞ゲ \n\nالعضو: @${m.messageStubParameters[0].split`@`[0]} \nالجروب: ${groupMetadata.subject}\n${dev}`;

    await conn.sendMini(
      m.chat,
      packname,
      dev,
      bienvenida,
      img,
      img,
      channel,
      estilo,
    );
  }

  // حالة الوداع
  if (chat.welcome && m.messageStubType == 28) {
    let bye = `ゲ◜៹ وداعًا عضو ៹◞ゲ \n\nالعضو: @${m.messageStubParameters[0].split`@`[0]}\nالجروب: ${groupMetadata.subject}\n${dev}`;
    await conn.sendMini(m.chat, packname, dev, bye, img, img, channel, estilo);
  }

  // حالة الطرد
  if (chat.welcome && m.messageStubType == 32) {
    let kick = `ゲ◜៹ طرد عضو ៹◞ゲ \n\nالعضو: @${m.messageStubParameters[0].split`@`[0]}\nالجروب: ${groupMetadata.subject}\n${dev}`;
    await conn.sendMini(m.chat, packname, dev, kick, img, img, channel, estilo);
  }
}
