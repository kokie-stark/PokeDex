import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Minimal RFC4180-ish CSV parser (handles quoted fields, embedded commas/quotes).
export const parseCsv = text => {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char === '\r') {
      // skip, \n handles the row break
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body
    .filter(r => r.length === header.length)
    .map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));
};

export const readCsv = path => parseCsv(readFileSync(path, 'utf-8'));

const escapeField = value => {
  const str = value ?? '';
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export const writeCsv = (path, headers, rows) => {
  mkdirSync(dirname(path), { recursive: true });
  const lines = [
    headers.join(','),
    ...rows.map(row => headers.map(h => escapeField(row[h])).join(',')),
  ];
  writeFileSync(path, lines.join('\n') + '\n', 'utf-8');
};
