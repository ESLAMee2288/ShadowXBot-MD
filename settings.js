import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import fs from "fs";
import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import moment from "moment-timezone";

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = ""; //Ejemplo: +5493876639332
global.confirmCode = "";

/*============== المعلومات الأساسية =============*/

global.owner = [
  // الفراغات لإضافة مالكين جدد:
  ["201556653112", "👑", true],
  ["", "", false],
  ["", "", false],
  ["", "", false],
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// المشرفون (المعرف)
global.mods = [
  // مسافات فارغة لإضافة مشرفين جدد

  "",
  "",
  "",
  "",
  "",
];

// Usuarios premium (ID)
global.prems = [
  // الفراغات لإضافة مستخدمين مميزين جدد

  "",
  "",
  "",
  "",
  "",
];

/*============= العلامة المائية =============*/

//cambiar a true si el bot detecta sus propios comandos.
global.isBaileysFail = false;
global.libreria = "Baileys";
global.baileys = "V 6.7.9";
global.vs = "1.0.1";
global.languaje = "ar";
global.nameqr = "Shadow X Bot - MD";
global.namebot = "Shadow X Bot";
global.sessions = "Shadow_X_Session";
global.jadi = "Shadow_X_Bot";

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = "𝓢𝓱𝓪𝓭𝓸𝔀 𝓧 - MD";
global.botname = "𝓢𝓱𝓪𝓭𝓸𝔀 𝓧 - MD 🌸";
global.wm = "𝓢𝓱𝓪𝓭𝓸𝔀 𝓧-MD 🌸";
global.author = "By Eslam Elshnawy";
global.dev = "Pσɯҽɾҽԃ Bყ єѕℓαм єℓѕнηαωу";
global.textbot = "Shadow X : Eslam Elshnawy 🌸";

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.apis = "https://deliriussapi-oficial.vercel.app";

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

global.imagen1 = fs.readFileSync("./src/img/Menu.jpg");
global.imagen2 = fs.readFileSync("./src/img/Menu2.jpg");
global.imagen3 = fs.readFileSync("./src/img/Menu3.jpg");
global.welcome = fs.readFileSync("./src/img/welcome.jpg");
global.adios = fs.readFileSync("./src/img/adios.jpg");
global.catalogo = fs.readFileSync("./src/img/catalogo.jpg");
global.miniurl = fs.readFileSync("./src/img/miniurl.jpg");
global.avatar = fs.readFileSync("./src/img/avatar_contact.jpg");

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.grupo = "https://chat.whatsapp.com/ExZaeZWaHgK7QPs6JZfgYj"; // لو عندك لينك ضيفه
global.grupo2 = "https://chat.whatsapp.com/GfeUIl6taKTIgiQn1pjkQl"; // لو عندك لينك ضيفه
global.grupo3 = "hhttps://chat.whatsapp.com/H5eWckGDaABARCLB7gaQpP"; // لو عندك لينك ضيفه
global.channel = "https://whatsapp.com/channel/0029VasoQ3rEFeXn7Ij6oG37"; // لو عندك لينك ضيفه
global.md = "https://github.com/ESLAMee2288/ShadowXBot-MD"; // لو عندك لينك ضيفه
global.yt = "https://github.com/ESLAMee2288/ShadowXBot-MD"; // لو عندك لينك ضيفه
global.tiktok = "https://github.com/ESLAMee2288/ShadowXBot-MD"; // لو عندك لينك ضيفه
global.correo = "alshnawyaslam04@gmail.com"; // لو عندك لينك ضيفه

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "120363317332020195@g.us" } : {}),
  },
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: "Şhค໓໐ຟ x ๖໐t",
      orderTitle: "Bang",
      thumbnail: catalogo,
      sellerJid: "0@s.whatsapp.net",
    },
  },
};

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.esti = {
  key: {
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "369852147741258@g.us" } : {}),
  },
  message: {
    videoMessage: {
      title: `Şhค໓໐ຟ x ๖໐t`,
      h: `Hmm`,
      seconds: "99999",
      gifPlayback: "true",
      caption: `XOS`,
      jpegThumbnail: catalogo,
    },
  },
};

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

/*============= DISEÑOS =============*/

// Estilos para los menús
global.dmenut = "ଓ═┅═━–〈";
global.dmenub = "┊↬";
global.dmenub2 = "┊";
global.dmenuf = "┗––––––––––✦";
global.dashmenu = "┅═┅═❏ *DASHBOARD* ❏═┅═┅";
global.cmenut = "❏––––––『";
global.cmenuh = "』––––––";
global.cmenub = "┊✦ ";
global.cmenuf = "┗━═┅═━––––––๑\n";
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ";
global.pmenus = "✦";
global.htki = "––––––『";
global.htka = "』––––––";
global.lopr = "Ⓟ";
global.lolm = "Ⓛ";
global.htjava = "⫹⫺";
global.hsquere = ["⛶", "❏", "⫹⫺"];

/*============= MENSAJES FRECUENTES =============*/

global.API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  global.APIKeys[
                    name in global.APIs ? global.APIs[name] : name
                  ],
              }
            : {}),
        }),
      )
    : "");

global.botdate = `⫹⫺ Date :  ${moment.tz("America/Los_Angeles").format("DD/MM/YY")}`; //Asia/Jakarta
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("America/Los_Angeles").format("HH:mm:ss")}`; //America/Los_Angeles

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

global.fgif = {
  key: {
    participant: "0@s.whatsapp.net",
  },
  message: {
    videoMessage: {
      title: wm,
      h: `Hmm`,
      seconds: "999999999",
      gifPlayback: "true",
      caption: bottime,
      jpegThumbnail: fs.readFileSync("./src/img/Menu.jpg"),
    },
  },
};

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

global.maxwarn = "3";

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'settings.js'"));
  import(`${file}?update=${Date.now()}`);
});
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

/*============= لعبة آر بي جي =============*/

global.multiplier = 69; // كلما ارتفع المستوى، كلما كان الترقية أصعب
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      agility: "🤸‍♂️",
      arc: "🏹",
      armor: "🥼",
      bank: "🏦",
      bibitanggur: "🍇",
      bibitapel: "🍎",
      bibitjeruk: "🍊",
      bibitmangga: "🥭",
      bibitpisang: "🍌",
      bow: "🏹",
      bull: "🐃",
      cat: "🐈",
      chicken: "🐓",
      common: "📦",
      cow: "🐄",
      crystal: "🔮",
      darkcrystal: "♠️",
      diamond: "💎",
      dog: "🐕",
      dragon: "🐉",
      elephant: "🐘",
      emerald: "💚",
      exp: "✉️",
      fishingrod: "🎣",
      fox: "🦊",
      gems: "🍀",
      giraffe: "🦒",
      gold: "👑",
      health: "❤️",
      horse: "🐎",
      intelligence: "🧠",
      iron: "⛓️",
      keygold: "🔑",
      keyiron: "🗝️",
      knife: "🔪",
      legendary: "🗃️",
      level: "🧬",
      limit: "🌌",
      lion: "🦁",
      magicwand: "⚕️",
      mana: "🪄",
      money: "💵",
      mythic: "🗳️",
      pet: "🎁",
      petFood: "🍖",
      pickaxe: "⛏️",
      pointxp: "📧",
      potion: "🥤",
      rock: "🪨",
      snake: "🐍",
      stamina: "⚡",
      strength: "🦹‍♀️",
      string: "🕸️",
      superior: "💼",
      sword: "⚔️",
      tiger: "🐅",
      trash: "🗑",
      uncommon: "🎁",
      upgrader: "🧰",
      wood: "🪵",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};
