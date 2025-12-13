#import "template.typ": ApiEndpoint, FIT-Protocol, ohms, rnd, volts

#show: FIT-Protocol.with(
  language: "CZ",
  academic-subject: "Tvorba uživatelských rozhraní (ITU)",
  academic-year: "2025/2026",
  protocol-title: "Semestrální projekt - Spiz-E",
  protocol-subtitle: "Finální zpráva (Fáze II)",

  team: [
    Tým Spiz-E
  ],
  authors: (
    (name: "Patrik Puškár", login: "xpuskap00", leader: true),
    (name: "Josef Michalík", login: "xmichaj00"),
    (name: "Jan Ukropec", login: "xukropj00"),
    (name: "Petr Georgiev", login: "xgeorgp00"),
  ),
  // location: "Brno",
  // date: datetime.today().display(),
)

/*
= Fáze I: Zadání, návrh a základ aplikace

== Cílová skupina a účel
*Uživatel:* Člověk v domácnosti. \
*Účel aplikace:* Sledování a spravování obsahu spíže. Informovat uživatele o položkách, které si má koupit a které mu docházejí.

== Uživatelský průzkum
Členové týmu provedli průzkum s potenciálními uživateli, aby zjistili jejich potřeby a návyky.

=== Otázky kladené respondentům:
1. Jakým způsobem si uchováváte přehled o stavu zásob své spíže?
2. Co vám na tom vyhovuje a co ne?
3. Znáte nějakou aplikaci na správu spíže?
4. Jaké vlastnosti očekáváte od takové aplikace?
5. Co byste chtěli vidět hned po otevření aplikace?
6. Jak si představujete úpravu/přidání položky do aplikace?
7. Na jakém zařízení byste tuto aplikaci chtěli používat?

=== Výsledky průzkumu dle členů
*Josef Michalík (xmichaj00)* \
_Respondent 1 (Žena v domácnosti):_
- Kontroluje 1x za měsíc, projde lednice a skříně. Občas věci projdou.
- Nezná žádnou aplikaci.
- Očekává hlídání expirace, historii, kategorie.
- Po otevření chce vidět to, co dochází.
- Přidání vyfocením, spojení s bankou/účtenkou.
- Zařízení: Mobil.

_Respondent 2 (Student):_
- Používá proprietární IS, nejednotné, zdlouhavé.
- Sleduje jen to, co aktuálně používá.
- Očekává jednoduchost.
- Chce vidět co chybí, dochází, expiruje.
- Přidání: Přepis kvantity, jednoduchý formulář.
- Zařízení: Mobil i PC.

*Petr Georgiev (xgeorgp00)* \
_Respondent 1 (Učitelka):_
- Pravidelný pohled do lednice.
- Očekává včasné hlášení docházejících potravin.
- Chce seznam všech potravin s barevným zvýrazněním nedostatků.
- Vždy viditelné tlačítko "přidat/upravit".
- Zařízení: Mobil.

_Respondent 2 (Tlumočnice):_
- Neustálá kontrola zásob.
- Žádná konkrétní očekávání, zvyklá na pohled do ledničky.
- Přidání skenováním čárového kódu.
- Zařízení: Mobil.

*Jan Ukropec (xukropj00)* \
_Respondent 1 (Programátor):_
- Pravidelná fyzická kontrola nebo paměť.
- Očekává editaci zásob (aktuální/ideální stav), +/- tlačítka.
- Sdílení seznamu, generování nákupního seznamu (rozdíl stavů).
- Identifikace položek textově nebo čárovým kódem.
- Zařízení: Mobil, Web.

_Respondent 2 (Učitelka SŠ):_
- Nemá systém.
- Očekává upozornění na blížící se datum spotřeby.
- Zobrazení tabulky potravin řazené dle expirace.
- Zařízení: Mobil.

*Patrik Puškár (xpuskap00)* \
_Respondent 1 (Student IT na internátě):_
- Zjišťuje stav až při vaření. Má excelový arch.
- Očekává automatické upozornění, přehled spotřeby.
- Momentální stav po otevření.
- Zařízení: Telefon / Notebook.

_Respondent 2 (Svobodná matka):_
- Pravidelný nákupní seznam.
- Očekává dostupnost odkudkoliv a přehled toho, co dochází.
- Přidání fotkou nebo skenem účtenky.
- Zařízení: Telefon.

==== Souhrn za tým
- Většina uživatelů kontroluje zásoby až před nákupy a nepoužívá specializovanou aplikaci.
- Uživatelé preferují jednoduchost.
- Po otevření aplikace je vyžadován okamžitý přehled docházejících a procházejících věcí.
- Preference automatizovaného zadávání (sken, foto), ale i rychlé manuální editace.
- Primární platformou je mobil, sekundárně Desktop/PC.

== Průzkum existujících řešení
Tým analyzoval několik existujících aplikací na trhu.

*My Pantry Tracker (Web & Mobil)*
- _Výhody:_ Export nákupního seznamu do PDF, skenování čárových kódů, kategorie.
- _Nevýhody:_ Nepřehledná homepage, mnoho informací, špatný "empty state", nevhodné pro mobilní zobrazení (web verze), nemožnost editace data spotřeby (mobil verze).

*Pantry inventory & check (Android)*
- _Výhody:_ Jednoduchá úprava počtu, lokace, nerušivý design.
- _Nevýhody:_ Nejasné přidání položky, okamžité otevření kamery, chybí cílový počet, chybí přehled nedostatků.

*Cooklist: Pantry & Cooking App*
- _Výhody:_ Automatické přidávání, recepty, nákupní seznamy.
- _Nevýhody:_ Vyžaduje předplatné, pomalá odezva.

*Your Food App / Pantry Check*
- _Výhody:_ Více seznamů (lokací), řazení dle expirace, sdílení v reálném čase.
- _Nevýhody:_ Často chybí jednoduchá tlačítka +/- pro úpravu množství, chybí "undo" akce.

*The Ungrocery List / Whaz in the Pantry (Windows)*
- _Výhody:_ Jednoduchost, místo uskladnění.
- _Nevýhody:_ Zastaralý design (Windows 8 style), základní ovládací prvky.

==== Závěry z průzkumu pro vlastní návrh
1. Každá část aplikace by měla mít jeden jasný účel.
2. Provedené změny musí jít vrátit zpět (Undo).
3. Formátování textu a vizuální čistota jsou klíčové pro přehlednost.

== Zadání a specifikace aplikace
*Cíl:* Aplikace umožní uživateli přehled položek ve spíži, jejich správu a poradí mu, jaké položky dokoupit.

Aplikace bude obsahovat:
- Úvodní obrazovku s rychlým přehledem a akcí pro přidání.
- Stránku přehledu nákupního seznamu.
- Stránku pro editaci a přidávání položky.
- Data položky: jméno, aktuální počet, očekávaný počet, kategorie, poznámka, datum spotřeby/editace.

=== Struktura a technologie (Fáze I)
Tým se rozhodl pro realizaci klientů na různých platformách sdílejících společný backend.

*Backend (Patrik Puškár):*
- *Tech:* FastAPI, Python, REST API, SSE (Server Sent Events).
- Běží na serveru Wranglers Software.

*Frontend - Web (Josef Michalík):*
- *Tech:* SolidJS, SolidRouter, TanStack Query, TanStack DB, MVVM model.
- *Důvod:* Moderní reaktivní technologie s dobrou podporou.

*Frontend - Android (Petr Georgiev):*
- *Tech:* NativeScript, Node.js.
- *Důvod:* Multiplatformní podpora JavaScriptu.

*Frontend - Desktop (Jan Ukropec, Patrik Puškár):*
- *Tech:* JavaFX (Jan Ukropec), WPF .NET (Patrik Puškár).
- *Důvod:* Nativní desktopové technologie, podpora MVVM (WPF).
*/

= Fáze II: Výsledná aplikace (Implementace FE)
Každý člen týmu implementoval svou vlastní verzi frontendového klienta dle společného zadání a API.

== Josef Michalík (xmichaj00) - Webová aplikace

=== Implementace a cíle
Hlavním cílem bylo dotáhnout webovou aplikaci do stavu, kdy je plně použitelná pro efektivní správu domácích zásob s důrazem na "Mobile First" přístup.

*Realizované části:*
- *Hlavní přehled položek (`ItemsPage`)*: Tato stránka slouží jako úvodní dashboard. Je navržena tak, aby poskytovala okamžitý přístup k seznamu položek, protože nejčastější akcí uživatele je *odebírání spotřebovaných surovin*. Seznam podporuje filtrování, řazení a fulltextové vyhledávání.
- *Interaktivní komponenty*:
  - `ItemCard`: Komponenta s možností "inline" editace názvu a rychlé změny množství.
  - `ItemInlineDetail`: Komplexní rozbalovací formulář pro detailní úpravu.
- *Logika*: MVVM architektura (`ItemsPage.vm.tsx`) oddělující logiku od zobrazení.
- *Synchronizace*: Integrace TanStack Query a SolidDB s optimistickými aktualizacemi.

=== Zapracování připomínek z kontrolní prezentace
1. *Způsob interakce*: Původní koncept oddělených formulářů byl nahrazen plnou *inline editací*. Uživatel může upravovat název, množství (pomocí tlačítek +/-) i další detaily přímo v seznamu. Tím odpadá nutnost proklikávat se na detailní stránku pro běžné úkony.
2. *Design a interaktivita*: Došlo k posunu od "desktopového" rozvržení k modernímu, dotykově orientovanému rozhraní. Úvodní stránka nyní funguje jako interaktivní pracovní plocha, kde lze většinu úkonů (odebrání, přidání) provést na jedno nebo málo kliknutí.
3. *Reaktivita*: Používáním reaktivního frameworku *SolidJS* a implementací *optimistických aktualizací* UI reaguje okamžitě bez čekání na server (např. při změně počtu kusů), což dodává aplikaci pocit svižnosti a plynulosti.

=== Technický popis interaktivní manipulace s daty
Aplikace využívá reaktivní signály SolidJS a asynchronní synchronizaci na pozadí.
- *Data Flow*: `UI (ItemCard)` [View] → `ViewModel (onUpdate)` [ViewModel] → `Local Collection` [Model] → `API Client` [Model].
- *Optimistická aktualizace*: Při změně dat (např. klik na "+") je lokální cache okamžitě aktualizována. Uživatel vidí výsledek hned. Asynchronní požadavek na server se odešle na pozadí. V případě chyby se stav vrátí zpět.

=== Testování (xmichaj00)
*Uživatel:* Respondent 1 (Žena v domácnosti)
*Profil:* Uživatelka, která spravuje zásoby pro rodinu, preferuje kontrolu jednou za čas, ale ocenila by průběžný přehled. Technicky méně zdatná, používá primárně mobil.

*Průběh testování:*
Uživatelka dostala za úkol zkontrolovat zásoby po nákupu.
1. _Úkol:_ Upravit množství u mouky (právě dokoupeno).
2. _Úkol:_ Přidat novou položku, která v seznamu chybí.
3. _Úkol:_ Najít položky, které docházejí.

*Výsledky a pozorování:*
1. *Intuitivnost inline editace*: Uživatelka nejprve hledala tlačítko "Upravit", ale rychle pochopila, že může kliknout přímo na číslo/text. Ocenila, že nemusí nikam přecházet a že nejčastější akci (změna množství) má hned po ruce.
2. *Rychlost odezvy*: Byla pozitivně překvapena, že aplikace "nečeká" a reaguje hned, což jí připadalo plynulejší než webové stránky, na které je zvyklá.
3. *Mobilní zobrazení*: Velikost prvků na mobilním telefonu jí vyhovovala, trefila se do tlačítek +/- i bez brýlí.

#line(length: 100%, stroke: 0.5pt + gray)

== Petr Georgiev (xgeorgp00) - Android aplikace

=== Implementace
// TODO: Doplnit popis implementace Android aplikace (NativeScript/Node.js)
// - Jaké obrazovky byly realizovány?
// - Jak funguje propojení s API?

=== Interaktivní manipulace s daty
// TODO: Popsat technické řešení interakce (MVC/MVVM na Androidu?)

=== Testování (xgeorgp00)
*Uživatel:* [Doplnit profil uživatele]
// Respondent 1 (Učitelka) nebo 2 (Tlumočnice) ze Fáze I?

*Výsledky:*
// TODO: Doplnit výsledky testování

#line(length: 100%, stroke: 0.5pt + gray)

== Jan Ukropec (xukropj00) - Desktop (JavaFX)

=== Implementace
// TODO: Doplnit popis implementace JavaFX
// - Struktura aplikace, FXML?

=== Interaktivní manipulace s daty
// TODO: Popsat, jak je řešeno propojení UI a logiky v Javě

=== Testování (xukropj00)
*Uživatel:* [Doplnit profil uživatele]

*Výsledky:*
// TODO: Doplnit výsledky testování

#line(length: 100%, stroke: 0.5pt + gray)

== Patrik Puškár (xpuskap00) - Desktop (WPF .NET) & Backend

=== Implementace Backend
Backend je postaven na *FastAPI (Python)* a zajišťuje REST API pro všechny klienty. Podporuje SSE pro real-time notifikace.

=== Implementace Frontend (WPF)
Desktopový klient využívá WPF a .NET 8.
// TODO: Doplnit detaily o WPF implementaci
// - MVVM pattern, databinding

=== Interaktivní manipulace s daty
// TODO: Popis data bindingu ve WPF a komunikace s API

=== Testování (xpuskap00)
*Uživatel:* [Doplnit profil uživatele]

*Výsledky:*
// TODO: Doplnit výsledky testování
