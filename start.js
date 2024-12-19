process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
import "./settings.js";
import { createRequire } from "module";
import path, { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import * as ws from "ws";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  rmSync,
  watch,
} from "fs";
import yargs from "yargs";
import { spawn } from "child_process";
import lodash from "lodash";
import chalk from "chalk";
import syntaxerror from "syntax-error";
import { tmpdir } from "os";
import { format } from "util";
import boxen from "boxen";
import P from "pino";
import pino from "pino";
import Pino from "pino";
import { Boom } from "@hapi/boom";
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low, JSONFile } from "lowdb";
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
import store from "./lib/store.js";
const { proto } = (await import("@whiskeysockets/baileys")).default;
const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = await import("@whiskeysockets/baileys");
import readline from "readline";
import NodeCache from "node-cache";
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32",
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

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

global.timestamp = { start: new Date() };

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse(),
);
global.prefix = new RegExp("^[/.$#!]");
// global.opts['db'] = process.env['db']

global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`),
);

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(
            global.db.data == null ? global.loadDatabase() : global.db.data,
          );
        }
      }, 1 * 1000),
    );
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

const { state, saveState, saveCreds } = await useMultiFileAuthState(
  global.sessions,
);
const msgRetryCounterMap = (MessageRetryMap) => {};
const msgRetryCounterCache = new NodeCache();
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botNumberCode;

const methodCodeQR = process.argv.includes("qr");
const methodCode = !!phoneNumber || process.argv.includes("code");
const MethodMobile = process.argv.includes("mobile");
const colores = chalk.bgMagenta.white;
const QROption = chalk.bold.green;
const optionText = chalk.bold.cyan;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) =>
  new Promise((resolver) => rl.question(text, resolver));

let option;
if (methodCodeQR) {
  option = "1";
}
if (
  !methodCodeQR &&
  !methodCode &&
  !fs.existsSync(`./${sessions}/creds.json`)
) {
  do {
    option = await question(
      colores("Select an option:\n") +
        QROption("1. With QR code\n") +
        optionText("2. With 8-digit text code\n--> "),
    );

    if (!/^[1-2]$/.test(option)) {
      console.log(
        chalk.bold.redBright(
          `🔴  NUMBERS OTHER THAN ${chalk.bold.greenBright("1")} OR ${chalk.bold.greenBright("2")} ARE NOT ALLOWED, NOR LETTERS OR SPECIAL SYMBOLS.\n${chalk.bold.yellowBright("TIP: COPY THE NUMBER OF THE OPTION AND PASTE IT INTO THE CONSOLE.")}`,
        ),
      );
    }
  } while (
    (option !== "1" && option !== "2") ||
    fs.existsSync(`./${sessions}/creds.json`)
  );
}

const filterStrings = [
  "Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
  "Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
  "RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
  "U2Vzc2lvbiBlcnJvcg==", // "Session error"
  "RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC"
  "RGVjcnlwdGVkIG1lc3NhZ2U=", // "Decrypted message"
];

console.info = () => {};
console.debug = () => {};
["log", "warn", "error"].forEach((methodName) =>
  redefineConsoleMethod(methodName, filterStrings),
);

const connectionOptions = {
  logger: pino({ level: "silent" }),
  printQRInTerminal: option == "1" ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser:
    option == "1"
      ? [`${nameqr}`, "Chrome", "131.0.6778.85"]
      : methodCodeQR
        ? [`${nameqr}`, "Chrome", "131.0.6778.85"]
        : ["Ubuntu", "Chrome", "131.0.6778.56"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      Pino({ level: "fatal" }).child({ level: "fatal" }),
    ),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid);
    let msg = await store.loadMessage(jid, clave.id);
    return msg?.message || "";
  },
  msgRetryCounterCache, // Resolver mensajes en espera
  msgRetryCounterMap, // Determinar si se debe volver a intentar enviar un mensaje o no
  defaultQueryTimeoutMs: undefined,
  version,
};

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${sessions}/creds.json`)) {
  if (option === "2" || methodCode) {
    option = "2";
    if (!conn.authState.creds.registered) {
      if (MethodMobile)
        throw new Error("Cannot use a pairing code with the mobile API");

      let TelephoneNumber;
      if (!!phoneNumber) {
        TelephoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        if (
          !Object.keys(PHONENUMBER_MCC).some((v) =>
            TelephoneNumber.startsWith(v),
          )
        ) {
          console.log(
            chalk.bgBlack(
              chalk.bold.greenBright(
                `🟣  Please enter the WhatsApp number.\n${chalk.bold.yellowBright("TIP: Copy the WhatsApp number and paste it into the console.")}\n${chalk.bold.yellowBright("Example: 57321××××××")}\n${chalk.bold.magentaBright("---> ")}`,
              ),
            ),
          );
          process.exit(0);
        }
      } else {
        while (true) {
          TelephoneNumber = await question(
            chalk.bgBlack(
              chalk.bold.yellowBright(
                "Please enter your WhatsApp number.\nExample: 57321××××××\n",
              ),
            ),
          );
          TelephoneNumber = TelephoneNumber.replace(/[^0-9]/g, "");

          if (
            TelephoneNumber.match(/^\d+$/) &&
            Object.keys(PHONENUMBER_MCC).some((v) =>
              TelephoneNumber.startsWith(v),
            )
          ) {
            break;
          } else {
            console.log(
              chalk.bgBlack(
                chalk.bold.redBright(
                  "Please enter your WhatsApp number.\nExample: 57321××××××.\n",
                ),
              ),
            );
          }
        }
        rl.close();
      }

      setTimeout(async () => {
        let code = await conn.requestPairingCode(TelephoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(
          chalk.black(chalk.bgGreen(`👑 PAIRING CODE 👑`)),
          chalk.black(chalk.white(code)),
        );
      }, 3000);
    }
  }
}

conn.isInit = false;
conn.well = false;
//conn.logger.info(`🔵  H E C H O\n`)

if (!opts["test"]) {
  if (global.db)
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts["autocleartmp"] && (global.support || {}).find)
        (tmp = [os.tmpdir(), "tmp", `${jadi}`]),
          tmp.forEach((filename) =>
            cp.spawn("find", [filename, "-amin", "3", "-type", "f", "-delete"]),
          );
    }, 30 * 1000);
}

if (opts["server"]) (await import("./server.js")).default(global.conn, PORT);

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code =
    lastDisconnect?.error?.output?.statusCode ||
    lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date();
  }
  if (global.db.data == null) loadDatabase();
  if ((update.qr != 0 && update.qr != undefined) || methodCodeQR) {
    if (option == "1" || methodCodeQR) {
      console.log(
        chalk.bold.yellow(`\n✅ SCAN THE QR CODE, EXPIRES IN 45 SECONDS`),
      );
    }
  }
  if (connection == "open") {
    console.log(
      boxen(chalk.bold(" CONNECTED TO WHATSAPP "), {
        borderStyle: "round",
        borderColor: "green",
        title: chalk.green.bold("● CONNECTION ●"),
        titleAlignment: "",
        float: "",
      }),
    );
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  if (connection === "close") {
    if (reason === DisconnectReason.badSession) {
      console.log(
        chalk.bold.cyanBright(
          `\n⚠️ NO CONNECTION, DELETE THE ${global.sessions} FOLDER AND SCAN THE QR CODE ⚠️`,
        ),
      );
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(
        chalk.bold.magentaBright(
          `\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ CONNECTION CLOSED, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹`,
        ),
      );
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(
        chalk.bold.blueBright(
          `\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ CONNECTION LOST TO SERVER, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`,
        ),
      );
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(
        chalk.bold.yellowBright(
          `\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ CONNECTION REPLACED, A NEW SESSION HAS BEEN OPENED, PLEASE CLOSE THE CURRENT SESSION FIRST.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗`,
        ),
      );
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(
        chalk.bold.redBright(
          `\n⚠️ NO CONNECTION, DELETE THE ${global.sessions} FOLDER AND SCAN THE QR CODE ⚠️`,
        ),
      );
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(
        chalk.bold.cyanBright(
          `\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ ❇️ CONNECTING TO SERVER...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`,
        ),
      );
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.timedOut) {
      console.log(
        chalk.bold.yellowBright(
          `\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ CONNECTION TIMEOUT, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`,
        ),
      );
      await global.reloadHandler(true).catch(console.error); //process.send('reset')
    } else {
      console.log(
        chalk.bold.redBright(
          `\n⚠️❗ UNKNOWN DISCONNECTION REASON: ${reason || "Not found"} >> ${connection || "Not found"}`,
        ),
      );
    }
  }
}
process.on("uncaughtException", console.error);

let isInit = true;
let handler = await import("./handler.js");
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(
      console.error,
    );
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }

  conn.handler = handler.handler.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith("@g.us") && chat.isChats)
      .map((v) => v[0]);
  } else {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith("@g.us") && chat.isChats)
      .map((v) => v[0]);
  }

  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};

const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit()
  .then((_) => Object.keys(global.plugins))
  .catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: "module",
      allowAwaitOutsideFunction: true,
    });
    if (err)
      conn.logger.error(
        `syntax error while loading '${filename}'\n${format(err)}`,
      );
    else {
      try {
        const module = await import(
          `${global.__filename(dir)}?update=${Date.now()}`
        );
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)),
        );
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  const test = await Promise.all(
    [
      spawn("ffmpeg"),
      spawn("ffprobe"),
      spawn("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-filter_complex",
        "color",
        "-frames:v",
        "1",
        "-f",
        "webp",
        "-",
      ]),
      spawn("convert"),
      spawn("magick"),
      spawn("gm"),
      spawn("find", ["--version"]),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on("close", (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on("error", (_) => resolve(false));
        }),
      ]);
    }),
  );
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  });
  Object.freeze(global.support);
}

function clearTmp() {
  const tmpDir = join(__dirname, "tmp");
  const filenames = readdirSync(tmpDir);
  filenames.forEach((file) => {
    const filePath = join(tmpDir, file);
    unlinkSync(filePath);
  });
}

function purgeSession() {
  let prekey = [];
  let directorio = readdirSync(`./${sessions}`);
  let filesFolderPreKeys = directorio.filter((file) => {
    return file.startsWith("pre-key-");
  });
  prekey = [...prekey, ...filesFolderPreKeys];
  filesFolderPreKeys.forEach((files) => {
    unlinkSync(`./${sessions}/${files}`);
  });
}

function purgeSessionSB() {
  try {
    const listaDirectorios = readdirSync(`./${jadi}/`);
    let SBprekey = [];
    listaDirectorios.forEach((directorio) => {
      if (statSync(`./${jadi}/${directorio}`).isDirectory()) {
        const DSBPreKeys = readdirSync(`./${jadi}/${directorio}`).filter(
          (fileInDir) => {
            return fileInDir.startsWith("pre-key-");
          },
        );
        SBprekey = [...SBprekey, ...DSBPreKeys];
        DSBPreKeys.forEach((fileInDir) => {
          if (fileInDir !== "creds.json") {
            unlinkSync(`./${jadi}/${directorio}/${fileInDir}`);
          }
        });
      }
    });
    if (SBprekey.length === 0) {
      console.log(
        chalk.bold.green(
          `\n╭» 🟡 ${jadi} 🟡\n│→ NOTHING TO DELETE \n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`,
        ),
      );
    } else {
      console.log(
        chalk.bold.cyanBright(
          `\n╭» ⚪ ${jadi} ⚪\n│→ NON-ESSENTIAL FILES DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`,
        ),
      );
    }
  } catch (err) {
    console.log(
      chalk.bold.red(
        `\n╭» 🔴 ${jadi} 🔴\n│→ AN ERROR OCCURRED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️\n` +
          err,
      ),
    );
  }
}

function purgeOldFiles() {
  const directories = [`./${sessions}/`, `./${jadi}/`];
  directories.forEach((dir) => {
    readdirSync(dir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file !== "creds.json") {
          const filePath = path.join(dir, file);
          unlinkSync(filePath, (err) => {
            if (err) {
              console.log(
                chalk.bold.red(
                  `\n╭» 🔴 FILE 🔴\n│→ ${file} FAILED TO DELETE\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️❌\n` +
                    err,
                ),
              );
            } else {
              console.log(
                chalk.bold.green(
                  `\n╭» 🟣 FILE 🟣\n│→ ${file} SUCCESSFULLY DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`,
                ),
              );
            }
          });
        }
      });
    });
  });
}

function redefineConsoleMethod(methodName, filterStrings) {
  const originalConsoleMethod = console[methodName];
  console[methodName] = function () {
    const message = arguments[0];
    if (
      typeof message === "string" &&
      filterStrings.some((filterString) => message.includes(atob(filterString)))
    ) {
      arguments[0] = "";
    }
    originalConsoleMethod.apply(console, arguments);
  };
}

setInterval(
  async () => {
    if (stopped === "close" || !conn || !conn.user) return;
    await clearTmp();
    console.log(
      chalk.bold.cyanBright(
        `\n╭» 🟢 MULTIMEDIA 🟢\n│→ FILES FROM TMP FOLDER DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`,
      ),
    );
  },
  1000 * 60 * 4,
); // 4 min

//setInterval(async () => {
//if (stopped === 'close' || !conn || !conn.user) return
//await purgeSession()
//console.log(chalk.bold.cyanBright(`\n╭» 🔵 ${global.sessions} 🔵\n│→ SESIONES NO ESENCIALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 10) // 10 min

//setInterval(async () => {
//if (stopped === 'close' || !conn || !conn.user) return
//await purgeSessionSB()}, 1000 * 60 * 10)

setInterval(
  async () => {
    if (stopped === "close" || !conn || !conn.user) return;
    await purgeOldFiles();
    console.log(
      chalk.bold.cyanBright(
        `\n╭» 🟠 FILES 🟠\n│→ RESIDUAL FILES DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`,
      ),
    );
  },
  1000 * 60 * 10,
);

_quickTest()
  .then(() => conn.logger.info(chalk.bold(`🔵  SUCCESSFULLY\n`.trim())))
  .catch(console.error);
