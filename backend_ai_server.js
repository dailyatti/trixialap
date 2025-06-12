require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const OpenAI = require('openai');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Utility Functions
function calculateValue(odds, probability) {
    return ((odds * probability) / 100 - 1) * 100;
}

async function getTeamForm(team, apiKey) {
    try {
        const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/teams`, {
            params: {
                search: team
            },
            headers: {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        });

        if (response.data.results === 0) {
            throw new Error('Csapat nem található');
        }

        return {
            form: 'WWDLW', // Mock data
            homePerformance: 75, // Mock data
            awayPerformance: 65 // Mock data
        };
    } catch (error) {
        console.error('Team Form Error:', error);
        throw error;
    }
}

// API Routes
app.post('/api/analyze', async (req, res) => {
  try {
        const { team1, team2 } = req.body;
        const openaiKey = req.headers['x-openai-key'];
        const rapidApiKey = req.headers['x-rapidapi-key'];

        if (!openaiKey || !rapidApiKey) {
            return res.status(401).json({ error: 'API kulcsok hiányoznak' });
        }

        if (!team1 || !team2) {
            return res.status(400).json({ error: 'Mindkét csapat neve szükséges' });
        }

        const openai = new OpenAI({ apiKey: openaiKey });

        // Get team form data
        const [team1Form, team2Form] = await Promise.all([
            getTeamForm(team1, rapidApiKey),
            getTeamForm(team2, rapidApiKey)
        ]);

        // Generate analysis with OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Te egy sportfogadási elemző vagy. Elemezd a csapatok formáját és adj előrejelzést a mérkőzésre."
                },
                {
                    role: "user",
                    content: `Elemezd a következő mérkőzést: ${team1} vs ${team2}. 
                             ${team1} forma: ${team1Form.form}, hazai teljesítmény: ${team1Form.homePerformance}%
                             ${team2} forma: ${team2Form.form}, vendég teljesítmény: ${team2Form.awayPerformance}%`
                }
            ]
    });

        const analysis = {
            team1: team1Form,
            team2: team2Form,
            predictions: {
                homeWin: 45,
                draw: 25,
                awayWin: 30
            }
        };

        res.json(analysis);
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ error: 'Szerver hiba történt' });
    }
});

app.post('/api/odds', async (req, res) => {
    try {
        const { team1, team2 } = req.body;
        const openaiKey = req.headers['x-openai-key'];
        const rapidApiKey = req.headers['x-rapidapi-key'];

        if (!openaiKey || !rapidApiKey) {
            return res.status(401).json({ error: 'API kulcsok hiányoznak' });
        }

        if (!team1 || !team2) {
            return res.status(400).json({ error: 'Mindkét csapat neve szükséges' });
        }

        // Mock odds data
        const odds = [
            {
                market: '1X2',
                outcome: '1',
                odds: 2.10,
                value: 5.5,
                confidence: 75
            },
            {
                market: '1X2',
                outcome: 'X',
                odds: 3.40,
                value: 15.0,
                confidence: 65
            },
            {
                market: '1X2',
                outcome: '2',
                odds: 3.20,
                value: -4.0,
                confidence: 60
            }
        ];

        res.json(odds);
    } catch (error) {
        console.error('Odds Error:', error);
        res.status(500).json({ error: 'Szerver hiba történt' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Szerver hiba történt' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 