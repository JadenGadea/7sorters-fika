# 7Sorters Fika

NFC-tagg på cafébordet → mata en karaktär via Swish → pengarna ger en ensam äldre person fika och sällskap.

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Struktur

- `/c/[id]` — Karaktärssida (NFC-taggen pekar hit)
- `/` — Landningssida med alla 7 karaktärer
- `src/data/characters.ts` — Karaktärsdata och Swish-nummer
- `src/lib/swish.ts` — Swish deep link-logik

## Konfigurera

Uppdatera `SWISH_NUMBER` i `src/data/characters.ts` med ditt riktiga Swish-nummer.

Varje NFC-tagg programmeras med en URL, t.ex. `https://din-domän.se/c/1`.

## Deploy

```bash
npm run build
```

Deploy till Vercel eller valfri plattform.
