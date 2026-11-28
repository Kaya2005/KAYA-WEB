// lib/master.js
// Numbers allowed to use the GLOBAL commands (stats, blacklist, sessions, alerts).
// Set them once in the server environment:  MASTER_NUMBERS=243812345678,243900000000
// (digits only, with country code) or write them in the list below.
const LIST = ['243999585890'];

const clean = (n) => String(n || '').replace(/[^0-9]/g, '');

export const MASTERS = [...LIST, ...(process.env.MASTER_NUMBERS || '').split(',')]
    .map(clean)
    .filter(Boolean);

export const isMaster = (id) => MASTERS.includes(clean(String(id).split('@')[0].split(':')[0]));

export const NO_MASTER_TEXT =
    'No master number configured.\nAdd MASTER_NUMBERS=your number (digits only, with country code) to the server environment, then restart.';
