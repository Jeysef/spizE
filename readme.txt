README
======

Adresářová struktura a popis klíčových částí projektu
-----------------------------------------------------

Tento projekt je implementován jako webová aplikace s využitím frameworku SolidJS a sestavovacího nástroje Vite.

Struktura adresářů (src/):
--------------------------
/src
  |-- /components
  |     - Obsahuje znovupoužitelné UI komponenty aplikace (např. navigační lišta, karty položek, tlačítka).
  |
  |-- /pages
  |     - KLÍČOVÁ ČÁST FE: Obsahuje logiku a pohledy (Views) pro jednotlivé stránky aplikace.
  |     - /items: Hlavní přehled zásob a položek.
  |     - /shopping: Nákupní seznam a logika s ním spojená.
  |     - /low-stock: Stránka s docházejícími zásobami.
  |     - /item: Detail konkrétní položky a editace. (nahrazena inline implementací v items)
  |
  |-- /providers
  |     - Správa globálního stavu aplikace (např. přihlášený uživatel, položky, kategorie).
  |
  |-- /client
  |     - Klient pro komunikaci s backend API (vygenerované).
  |
  |-- app.tsx
  |     - Hlavní komponenta aplikace, definuje základní layout a obaluje aplikaci providery.
  |
  |-- routes.ts
  |     - Definice všech cest v aplikaci.
  |
  |-- index.tsx
  |     - Vstupní bod aplikace (entry point).

Spuštění projektu:
------------------
Aplikace je dostupná online na adrese: https://itu-spize.netlify.app/

Pro lokální spuštění je nutné mít nainstalované prostředí Node.js.

1. Instalace závislostí:
   npm install

2. Konfigurace prostředí (.env):
   Projekt vyžaduje soubor .env s definovanými proměnnými VITE_API_BASE_URL a VITE_AUTH_TOKEN.

3. Spuštění vývojového serveru:
   npm run dev

Aplikace bude dostupná na adrese http://localhost:3000.

Autorství:
----------
Veškeré části tohoto projektu, včetně návrhu architektury, implementace komponent, logiky stránek a stylování, byly vypracovány mnou. Celý obsah tohoto archivu je mým autorským dílem.
