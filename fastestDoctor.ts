import { google } from 'googleapis';
import axios from 'axios';
import { readFileSync } from 'fs';

// Load Google Sheets API credentials
const auth = new google.auth.GoogleAuth({
  keyFile: './google-sheets-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const SHEET_ID = '1l5nAecO6HjDsIC0oyO_S5VX5lDPFpqtfgWFqKCBooN0';
const RANGE = 'Form Responses 1!A2:H'; // Adjust if form layout changes

export async function getFastestDoctor(condition: string) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return 'No doctor data found.';

  const formattedDoctors = rows.map(row => {
    return `Dr. ${row[0]} | Speciality: ${row[1]} | Queue: ${row[7]}`;
  }).join('\n');

  const prompt = `
You are a helpful medical assistant AI. A patient has the condition: "${condition}".
Here are some doctors and their current queue lengths:

${formattedDoctors}

Please recommend the doctor with the shortest wait time and relevant speciality.
`;

  const geminiRes = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }
  );

  return geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No recommendation.';
}

