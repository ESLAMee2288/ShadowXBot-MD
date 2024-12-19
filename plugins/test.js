const _0x1905e8 = _0x1b27;
(function (_0x2d56bf, _0x1e3f10) {
  const _0x8cca4c = _0x1b27,
    _0x25af69 = _0x2d56bf();
  while (!![]) {
    try {
      const _0x77255f =
        (-parseInt(_0x8cca4c(0x98)) / 0x1) *
          (-parseInt(_0x8cca4c(0x8e)) / 0x2) +
        parseInt(_0x8cca4c(0x82)) / 0x3 +
        -parseInt(_0x8cca4c(0x8a)) / 0x4 +
        parseInt(_0x8cca4c(0x85)) / 0x5 +
        (parseInt(_0x8cca4c(0x8f)) / 0x6) * (parseInt(_0x8cca4c(0x97)) / 0x7) +
        parseInt(_0x8cca4c(0xa0)) / 0x8 +
        (-parseInt(_0x8cca4c(0x9e)) / 0x9) * (parseInt(_0x8cca4c(0xa1)) / 0xa);
      if (_0x77255f === _0x1e3f10) break;
      else _0x25af69["push"](_0x25af69["shift"]());
    } catch (_0x55a858) {
      _0x25af69["push"](_0x25af69["shift"]());
    }
  }
})(_0x4397, 0xd9d98);
import _0x15ca36 from "node-fetch";
const handler = async (
  _0x4960d9,
  { conn: _0x1d1981, command: _0x2159df, text: _0x577e36, isAdmin: _0x21af21 },
) => {
  const _0x82d6a1 = _0x1b27;
  if (_0x2159df === _0x82d6a1(0x88)) {
    if (!_0x21af21) throw _0x82d6a1(0x9a);
    const _0x1facb5 = global["owner"][0x0][0x0] + _0x82d6a1(0x83);
    if (_0x4960d9[_0x82d6a1(0x87)][0x0] === _0x1facb5)
      throw "😼\x20*El\x20creador\x20del\x20bot\x20no\x20puede\x20ser\x20mutado*";
    let _0x8acb16 = _0x4960d9[_0x82d6a1(0x87)][0x0]
      ? _0x4960d9[_0x82d6a1(0x87)][0x0]
      : _0x4960d9[_0x82d6a1(0x94)]
        ? _0x4960d9[_0x82d6a1(0x94)][_0x82d6a1(0xa3)]
        : _0x577e36;
    if (_0x8acb16 === _0x1d1981[_0x82d6a1(0x9b)][_0x82d6a1(0x93)])
      throw _0x82d6a1(0xa6);
    const _0x4015bf = await _0x1d1981[_0x82d6a1(0x9d)](
        _0x4960d9[_0x82d6a1(0x9f)],
      ),
      _0x2dc357 =
        _0x4015bf[_0x82d6a1(0x92)] ||
        _0x4960d9[_0x82d6a1(0x9f)][_0x82d6a1(0x95)]`-`[0x0] + _0x82d6a1(0x83);
    if (_0x4960d9[_0x82d6a1(0x87)][0x0] === _0x2dc357) throw _0x82d6a1(0x91);
    let _0x2c1dd9 = global["db"][_0x82d6a1(0x99)]["users"][_0x8acb16],
      _0x571e77 = {
        key: {
          participants: _0x82d6a1(0x84),
          fromMe: ![],
          id: _0x82d6a1(0x90),
        },
        message: {
          locationMessage: {
            name: _0x82d6a1(0xa5),
            jpegThumbnail: await (
              await _0x15ca36(
                "https://telegra.ph/file/f8324d9798fa2ed2317bc.png",
              )
            )[_0x82d6a1(0x8b)](),
            vcard: _0x82d6a1(0x7c),
          },
        },
        participant: "0@s.whatsapp.net",
      },
      _0x5da6a1 = _0x82d6a1(0x7f);
    if (!_0x4960d9[_0x82d6a1(0x87)][0x0] && !_0x4960d9[_0x82d6a1(0x94)])
      return _0x1d1981[_0x82d6a1(0x89)](
        _0x4960d9["chat"],
        _0x5da6a1,
        _0x4960d9,
      );
    if (_0x2c1dd9[_0x82d6a1(0x96)] === !![]) throw _0x82d6a1(0x7e);
    _0x1d1981[_0x82d6a1(0x89)](
      _0x4960d9[_0x82d6a1(0x9f)],
      _0x82d6a1(0x8d),
      _0x571e77,
      null,
      { mentions: [_0x8acb16] },
    ),
      (global["db"][_0x82d6a1(0x99)][_0x82d6a1(0xa2)][_0x8acb16][
        _0x82d6a1(0x96)
      ] = !![]);
  } else {
    if (_0x2159df === "unmute") {
      if (!_0x21af21)
        throw _0x4960d9[_0x82d6a1(0x89)](
          "👑\x20*Solo\x20un\x20administrador\x20puede\x20ejecutar\x20este\x20comando",
        );
      let _0x581bd4 = _0x4960d9[_0x82d6a1(0x87)][0x0]
          ? _0x4960d9[_0x82d6a1(0x87)][0x0]
          : _0x4960d9["quoted"]
            ? _0x4960d9[_0x82d6a1(0x94)]["sender"]
            : _0x577e36,
        _0x5e6d75 = global["db"][_0x82d6a1(0x99)][_0x82d6a1(0xa2)][_0x581bd4],
        _0x55c898 = {
          key: {
            participants: _0x82d6a1(0x84),
            fromMe: ![],
            id: _0x82d6a1(0x90),
          },
          message: {
            locationMessage: {
              name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼",
              jpegThumbnail: await (
                await _0x15ca36(
                  "https://telegra.ph/file/aea704d0b242b8c41bf15.png",
                )
              )[_0x82d6a1(0x8b)](),
              vcard:
                "BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD",
            },
          },
          participant: _0x82d6a1(0x84),
        },
        _0x17fcd1 = _0x82d6a1(0x8c);
      if (_0x581bd4 === _0x4960d9[_0x82d6a1(0xa3)]) throw _0x82d6a1(0xa4);
      if (!_0x4960d9[_0x82d6a1(0x87)][0x0] && !_0x4960d9[_0x82d6a1(0x94)])
        return _0x1d1981[_0x82d6a1(0x89)](
          _0x4960d9[_0x82d6a1(0x9f)],
          _0x17fcd1,
          _0x4960d9,
        );
      if (_0x5e6d75[_0x82d6a1(0x96)] === ![]) throw _0x82d6a1(0x9c);
      (global["db"][_0x82d6a1(0x99)][_0x82d6a1(0xa2)][_0x581bd4][
        _0x82d6a1(0x96)
      ] = ![]),
        _0x1d1981[_0x82d6a1(0x89)](
          _0x4960d9[_0x82d6a1(0x9f)],
          _0x82d6a1(0x80),
          _0x55c898,
          null,
          { mentions: [_0x581bd4] },
        );
    }
  }
};
function _0x4397() {
  const _0x34f4a2 = [
    "split",
    "muto",
    "7862645KbCLbU",
    "12mIEbeh",
    "data",
    "👑 *فقط المسؤول يمكنه تنفيذ هذا الأمر*",
    "user",
    "*هذا المستخدم لم يتم كتمه*",
    "groupMetadata",
    "32303187qmVZef",
    "chat",
    "13760808vkmieV",
    "10XeEDcD",
    "users",
    "sender",
    "👑 *فقط مشرف آخر يمكنه إلغاء كتمك*",
    "المستخدم مكتوم",
    "❌️ *لا يمكنك كتم البوت*",
    "BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD",
    "botAdmin",
    "*هذا المستخدم تم كتمه بالفعل*",
    "╰⊱❗️⊱ *قم بذكر الشخص الذي تريد كتمه* ⊱❗️⊱",
    "*لن يتم حذف رسائلك*",
    "admin",
    "3507456fKsGgz",
    "@s.whatsapp.net",
    "0@s.whatsapp.net",
    "5736570TJECOh",
    "group",
    "mentionedJid",
    "mute",
    "reply",
    "6576268PNomRy",
    "buffer",
    "╰⊱❗️⊱ *قم بذكر الشخص الذي تريد رفع الكتم عنه* ⊱❗️⊱╮",
    "*ستتم إزالة رسائلك*",
    "160970xiuwzp",
    "6bOCvYI",
    "Halo",
    "❌️ *لا يمكنك كتم مؤسس المجموعة*",
    "owner",
    "jid",
    "quoted",
  ];
  _0x4397 = function () {
    return _0x34f4a2;
  };
  return _0x4397();
}
(handler["command"] = /^(mute|unmute)$/i),
  (handler[_0x1905e8(0x86)] = !![]),
  (handler[_0x1905e8(0x81)] = !![]),
  (handler[_0x1905e8(0x7d)] = !![]);
function _0x1b27(_0x4a1d3c, _0x4dddff) {
  const _0x4397dd = _0x4397();
  return (
    (_0x1b27 = function (_0x1b27aa, _0x2a22bf) {
      _0x1b27aa = _0x1b27aa - 0x7c;
      let _0x54b468 = _0x4397dd[_0x1b27aa];
      return _0x54b468;
    }),
    _0x1b27(_0x4a1d3c, _0x4dddff)
  );
}
export default handler;
