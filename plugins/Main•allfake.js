import pkg from "@whiskeysockets/baileys";
import fs from "fs";
import fetch from "node-fetch";
import axios from "axios";
import moment from "moment-timezone";
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg;

var handler = (m) => m;
handler.all = async function (m) {
  global.getBuffer = async function getBuffer(url, options) {
    try {
      options ? options : {};
      var res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "User-Agent": "GoogleBot",
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };

  let who = m.messageStubParameters[0] + "@s.whatsapp.net";
  let user = global.db.data.users[who];
  //let pushname = user ? user.name : await conn.getName(who)
  let pushname = m.pushName || "Sin nombre";

  //creador y otros
  global.creador = "Wa.me/201556653112";
  global.ofcbot = `${conn.user.jid.split("@")[0]}`;
  global.asistencia = "https://wa.me/201556653112";
  global.namechannel = "تابع قناة البوت";
  global.id = "120363268849510279@g.us";

  //Reacciones De Comandos.!
  global.rwait = "🕒";
  global.done = "✅";
  global.error = "✖️";

  //Emojis determinado de Akari
  global.emoji = "🌸";
  global.emoji2 = "🌸";
  global.emoji3 = "✨️";
  global.emoji4 = "✨";
  global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom();

  //mensaje en espera
  global.wait = "🧸 Eʂρҽɾҽ υɳ ɱσɱҽɳƚσ...";
  global.waitt = "🧸 Eʂρҽɾҽ υɳ ɱσɱҽɳƚσ...";
  global.waittt = "🧸 Eʂρҽɾҽ υɳ ɱσɱҽɳƚσ...";
  global.waitttt = "🧸 Eʂρҽɾҽ υɳ ɱσɱҽɳƚσ...";

  //Enlaces
  var canal = "https://whatsapp.com/channel/0029VaQD7LAJP216tu9liI2A";
  var canal2 = "https://whatsapp.com/channel/0029Vam7yUg77qVaz3sIAp0z";
  var git = "https://github.com/ianalejandrook15x";
  var youtube = "https://www.youtube.com/@ianalejandrook15x";
  var github = "https://github.com/ianalejandrook15x/AkariBot-MD";
  var panel = "https://panel.skyultraplus.com";
  var dash = "https://dash.skyultraplus.com";
  var tienda = "https://dash.skyultraplus.com/store";
  var status = "https://estado.skyultraplus.com";
  var discord = "https://discord.com/invite/T7ksHu7mkz";
  var paypal = "https://paypal.me/kevintomasolazo23";
  let tiktok = "https://tiktok.com/@ian.ian271";
  let correo = "alejandroxddd92@gmail.com";

  global.redes = [
    canal,
    canal2,
    git,
    youtube,
    github,
    panel,
    dash,
    tienda,
    status,
    discord,
    paypal,
    tiktok,
    correo,
  ].getRandom();

  global.redeshost = [panel, dash, tienda, status, discord, paypal].getRandom();

  //Imagen
  let category = "imagen";
  const db = "./src/database/db.json";
  const db_ = JSON.parse(fs.readFileSync(db));
  const random = Math.floor(Math.random() * db_.links[category].length);
  const randomlink = db_.links[category][random];
  const response = await fetch(randomlink);
  const rimg = await response.buffer();
  global.icons = rimg;

  //• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
  var ase = new Date();
  var hour = ase.getHours();
  switch (hour) {
    case 0:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 1:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 2:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 3:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 4:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 5:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 6:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 7:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅";
      break;
    case 8:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 9:
      hour = "Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄";
      break;
    case 10:
      hour = "Lɪɴᴅᴏ Dɪᴀ 🌤";
      break;
    case 11:
      hour = "Lɪɴᴅᴏ Dɪᴀ 🌤";
      break;
    case 12:
      hour = "Lɪɴᴅᴏ Dɪᴀ 🌤";
      break;
    case 13:
      hour = "Lɪɴᴅᴏ Dɪᴀ 🌤";
      break;
    case 14:
      hour = "Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆";
      break;
    case 15:
      hour = "Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆";
      break;
    case 16:
      hour = "Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆";
      break;
    case 17:
      hour = "Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆";
      break;
    case 18:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 19:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 20:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 21:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 22:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
    case 23:
      hour = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃";
      break;
  }
  global.saludo = hour;

  //tags
  global.nombre = conn.getName(m.sender);
  global.taguser = "@" + m.sender.split("@s.whatsapp.net");
  var more = String.fromCharCode(8206);
  global.readMore = more.repeat(850);
  global.channelJid = "120363368508685742@newsletter"; // معرف القناة

  //Fakes
  global.fkontak = {
    key: {
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${pushname}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        jpegThumbnail: null,
        thumbnail: null,
        sendEphemeral: true,
      },
    },
  };

  // global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${packname}`, orderTitle: 'Bang', thumbnail: icons, sellerJid: '0@s.whatsapp.net'}}}

  (global.fake = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363368508685742@newsletter",
        newsletterName: namechannel,
        serverMessageId: -1,
      },
    },
  }),
    { quoted: m };

  global.icono = [
    "https://qu.ax/AAtDn.jpg",
    "https://qu.ax/kjOrF.jpg",
    "https://qu.ax/inyYU.jpg",
  ].getRandom();

  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363368508685742@newsletter",
        serverMessageId: 100,
        newsletterName: namechannel,
      },
      externalAdReply: {
        showAdAttribution: true,
        title: namebot,
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnailUrl: icono,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  };
};

export default handler;
