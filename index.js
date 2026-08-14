import fs from 'fs';
import readline from 'readline';
import chalk from 'chalk';
import { startupPassword } from './token.js';
import { restoreSessions, watchPairingRequests } from './pair.js';
import { startAutoCleanup } from './cleanup.js';

const AUTH_FILE = './richstore/auth.json';

if (!fs.existsSync('./richstore')) fs.mkdirSync('./richstore');

const initializeBot = async () => {
  if (isAuthenticated()) {
    launchServer();
  } else {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.stdoutMuted = true;
    console.log(chalk.bold.yellow('Enter password to start bot server: '));
    rl.question(chalk.green('Password: '), function (input) {
      if (input !== startupPassword) {
        process.exit(1);
      }
      setAuthenticated(true);
      rl.close();
      launchServer();
    });
    rl._writeToOutput = function (stringToWrite) {
      if (rl.stdoutMuted) rl.output.write("*");
      else rl.output.write(stringToWrite);
    };
  }
};

function isAuthenticated() {
  return fs.existsSync(AUTH_FILE) && JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8')).authenticated;
}

function setAuthenticated(value) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ authenticated: value }, null, 2));
}

async function launchServer() {
  global.botName = 'KAYA-MD';

  startAutoCleanup();

  // 👈 Import direct de ton fichier bot.js
  import('./bot.js');

  console.log(chalk.blue("⏳ Restauration des sessions en cours..."));
  await restoreSessions();
  
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(chalk.blue("🚀 Surveillance des demandes de pairage web activée."));
  watchPairingRequests();

  const ignoredErrors = [
    'Socket connection timeout', 'EKEYTYPE', 'item-not-found',
    'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found',
    'Socket closed', 'ReferenceError'
  ];

  process.on('uncaughtException', (err) => {
    if (ignoredErrors.some((e) => String(err).includes(e))) return;
    console.error(err?.message || err);
  });

  process.on('unhandledRejection', (reason) => {
    if (ignoredErrors.some((e) => String(reason).includes(e))) return;
    console.error(reason?.message || reason);
  });
}

initializeBot().catch(() => {});
