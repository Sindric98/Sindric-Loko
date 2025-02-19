const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JhUDFmS1BOazFHUGxMRm1BM1AyREpFTFB2ODNWK3c5NmhzV3huZitWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1BxdUJYeUZsNmV2d0I4UE84UlJYM2VrdXd2L0pqNmQ2YWVtRUY2NkJIND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSHRQS3hCNjExUVZxeCsvMkJ6bmd4NFFkY0xQWk15ZkZrZzN5OU9xQkVnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJncVdhZkswQ0c3Q3hTZ00xVm1yOE0xT2k2Rm1IbGMrUk1Bek8rOXZmdFM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklLZUk0MDRibCswWU83cEYrazRGeHMycE9yT2ZWcVRwQTRHVGlQbGY5V009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVvaldhRjdKODVubkdQNnJKWlcycHpFSjhxd05WMEdRVEpLTzFOM2xieFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlJbmJ2ZU1zTC9pVzE5dkMxdkRIYzJCNDZ2UFlKWUhmK0VIZExLZ2tXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM3gyMS9aT1g5NnNNUzNEOEdab1JxNDc4aXgrWWtpZE9mdlNXZGtnSit3ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIvcjR1RTF4Y3dkTTBGRzBlU3dlOEx0MThHak9GYitMWStNYVluakp1TXhhQXAzU0pBUFZJb1dqbkw1WlVPVC8zak90aUFocUF4ckVxQkdLV255VWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJ3UkNSWENycEdVTUhQY0o5aXVwdjBQOFprRWJZbjlZbERRUG5XbTV3MDBjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2dlE1RG5NYlF0LXJSNjJnU052M05nIiwicGhvbmVJZCI6IjIyZWQ1ZmZiLWY4NmQtNDRmZi1iZDhjLWYzZGY0ZmFkZTJiZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQaU1IUjBUQTBDZ1MwaURTajF3cjUzWS9ZZUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUpEckV6elgrdllBZGd6TlpSZUUwTlBEempNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE1QlZSWVdWIiwibWUiOnsiaWQiOiIyMjU4NDM1MTAzNTo3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMNmwwNDhERU0rajE3MEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHM1g2R0JTZ3BrN2hCUCtncXZQSW53eVRTSCtRd25RNlkycUJhRXBCb0dFPSIsImFjY291bnRTaWduYXR1cmUiOiJ2ZThDdlhtSENUY05hNS9BRitjTUtaS2xDY0FCdFdBblNCTXU0Z0pIQ0UzVXMwWUMxM3VaZnhJQkIvY1hQVHNCT3ZNeW13TWdCU1lQcXo4elM2cFhBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTDlINDk2TGVpK3BscXlDenZHOEdxWDE4eFozTHhXOHpwc0VFY01zdmd0RWJGMTI1TklYU3ZONXZxanhaUHEwTGs2UHlFbEFHLzk0TDdiSlNCeGNvaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjU4NDM1MTAzNTo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJ0MStoZ1VvS1pPNFFUL29Lcnp5SjhNazBoL2tNSjBPbU5xZ1doS1FhQmgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzk5Njg5ODksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS1I4In0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD',
    OWNER_NAME : process.env.OWNER_NAME || "topu",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255673750170",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.URL || "https://files.catbox.moe/eoo6ql.jpg",
    CAPTION : process.env.CAPTION || "ALONE-MD",
    BOT : process.env.BOT_NAME || 'ALONE_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'no',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
