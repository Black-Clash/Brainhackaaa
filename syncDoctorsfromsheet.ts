import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load service account key
const serviceAccount = JSON.parse(readFileSync('/Users/eeshi/Downloads/hachkathon111-c8bd516d8345.json', 'utf-8'));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = '1l5nAecO6HjDsIC0oyO_S5VX5lDPFpqtfgWFqKCBooN0';
const RANGE = `'Form Responses 1'!B2:D`;

async function syncDoctors() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 1) {
    console.log('❌ No data found in sheet.');
    return;
  }

  for (const row of rows) {
    const [name, specialty, queueLength] = row;
  
    const doctor = {
      name: name || "String",
      specialty: specialty || "String",
      queueLength: isNaN(Number(queueLength)) ? 0 : Number(queueLength),
    };
    await db.collection('Doctor').add(doctor);
    console.log(`✅ Added ${name}`);
  }
  
  }


  console.log('🎉 All doctors synced from Google Sheets!');
syncDoctors();