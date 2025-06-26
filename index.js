import 'dotenv/config';
import express from 'express';
import { getFastestDoctor } from './routes/fastestDoctor.js'; 

const app = express();
app.use(express.json());

app.post('/api/suggest', async (req, res) => {
  try {
    const { condition } = req.body;
    const result = await getFastestDoctor(condition);
    res.send({ suggestion: result });
  } catch (err) {
    console.error("🔥 Error in POST /api/suggest:", err?.response?.data || err);
    res.status(500).send({ error: 'Something went wrong.' });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
