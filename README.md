# Professzionális Fogadási Rendszer v9.1

Fejlett AI-alapú sportelemző és értékfogadási rendszer modern webes felülettel.

## Funkciók

- AI-alapú sportelemzés
- Valós idejű odds összehasonlítás
- Fejlett statisztikai elemzés
- Modern, reszponzív felület
- Biztonságos API integráció

## Projekt Struktúra

```
├── backend_ai_server.js    # Backend szerver AI integrációval
├── public/                # Statikus fájlok
│   └── index.html        # Fő alkalmazás felület
├── package.json          # Projekt függőségek
└── README.md            # Projekt dokumentáció
```

## Telepítés

1. Függőségek telepítése:
```bash
npm install
```

2. Fejlesztői szerver indítása:
```bash
npm run dev
```

3. Éles környezetben:
```bash
npm start
```

## Környezeti Változók

Hozzon létre egy `.env` fájlt a gyökérkönyvtárban a következő tartalommal:
```
OPENAI_API_KEY=az_ön_api_kulcsa
```

## Biztonság

- API kulcsok biztonságos kezelése
- CORS védelem engedélyezve
- Bemeneti adatok validálása
- Hibakezelés implementálva

## Licenc

Saját tulajdon - Minden jog fenntartva 