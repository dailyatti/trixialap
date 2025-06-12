# Sports Betting AI System

An AI-powered sports betting analysis system that combines machine learning with real-time sports data to provide intelligent betting insights.

## Features

- Real-time sports data analysis
- AI-powered match predictions
- Value betting opportunities identification
- Modern, responsive UI
- Secure API integration

## Prerequisites

- Node.js >= 18.0.0
- OpenAI API key
- RapidAPI key (for sports data)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sports-betting-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend_ai_server.js
├── package.json
├── .env
└── README.md
```

## API Endpoints

### POST /api/analyze
Analyzes a match between two teams.

Request body:
```json
{
    "team1": "Team Name 1",
    "team2": "Team Name 2"
}
```

### POST /api/odds
Retrieves betting odds for a match.

Request body:
```json
{
    "team1": "Team Name 1",
    "team2": "Team Name 2"
}
```

## Security Features

- CORS protection
- Rate limiting
- Helmet security headers
- Input validation
- Error handling

## Development

To start the development server with hot reloading:
```bash
npm run dev
```

## Production

To start the production server:
```bash
npm start
```

## License

MIT License

## Disclaimer

This application is for educational purposes only. Please gamble responsibly and in accordance with local laws and regulations. 