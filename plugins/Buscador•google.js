import { googleIt } from "@bochilteam/scraper";
import google from "google-it";
import axios from "axios";

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import("node-fetch")).default;
  const text = args.join` `;
  if (!text)
    return conn.reply(
      m.chat,
      "🌸 اكتب اللي عايز تدور عليه في جوجل.",
      m,
      rcanal,
    );

  conn.reply(m.chat, `🌸 بدورلك على المعلومات... شوية صبر 🙌`, m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: dev,
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel,
      },
    },
  });

  const url = "https://google.com/search?q=" + encodeURIComponent(text);
  google({ query: text }).then((res) => {
    let teks = `🌸 *نتيجة البحث عن*: ${text}\n\n`;
    for (let g of res) {
      teks += `🌸 *العنوان ∙* ${g.title}\n🌸 *المعلومات ∙* ${g.snippet}\n🔗 *الرابط ∙* ${g.link}\n\n`;
    }
    conn.reply(m.chat, teks, m, rcanal);
  });
};

handler.help = ["google <بحث>"];
handler.tags = ["بحث"];
handler.command = ["google"];
handler.register = false;

export default handler;
