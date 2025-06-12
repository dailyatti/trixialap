const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();

// Biztonsági middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*'
}));
app.use(express.json({ limit: '1mb' }));

// Kérésszám korlátozás
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perc
  max: 100 // IP-nként 100 kérés 15 percenként
});
app.use('/api/', limiter);

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// AI webes keresés API végpont
app.post('/api/websearch', async (req, res) => {
  try {
    const { prompt, apiKey } = req.body;
    
    // Bemeneti adatok validálása
    if (!prompt || typeof prompt !== 'string' || prompt.length > 1000) {
      return res.status(400).json({ error: "Érvénytelen keresési kifejezés!" });
    }
    if (!apiKey || apiKey.length < 10) {
      return res.status(400).json({ error: "API kulcs hiányzik vagy túl rövid!" });
    }

    const openai = new OpenAI({ apiKey });
    const response = await openai.responses.create({
      model: "gpt-4o",
      tools: [{ type: "web_search" }],
      input: prompt
    });

    res.json({ output_text: response.output_text });
  } catch (err) {
    console.error('API Hiba:', err);
    res.status(500).json({ 
      error: process.env.NODE_ENV === 'production' 
        ? "Szerver hiba történt!" 
        : err.message 
    });
  }
});

// Hibakezelő middleware
app.use((err, req, res, next) => {
  console.error('Szerver hiba:', err.stack);
  res.status(500).json({ error: "Váratlan szerver hiba történt!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AI backend szerver fut a ${PORT}-es porton!`)); 