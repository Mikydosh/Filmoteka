# 🎬 Filmotéka

Mobilní aplikace pro procházení filmů a seriálů a správu vlastních seznamů. Postavená na Ionic (Angular) a Capacitoru, data o filmech pochází z TMDB API, uživatelé a seznamy jsou uloženy ve Firebase.
 
Školní projekt (UTB FAI Zlín, Mobilní technologie).

<img width="200" height="200" alt="logo-square" src="https://github.com/user-attachments/assets/89c62ccd-973c-4f3b-b8c4-ad2809fefd7f" />


## ✨ Hlavní funkce

- **Procházení filmů a seriálů** - populární, nejlépe hodnocené, nadcházející
- **Detailní informace** - popis, hodnocení, herci, štáb
- **Vyhledávání** - rychlé vyhledávání s debounce
- **Vlastní seznamy** - vytváření a správa vlastních seznamů
- **Výchozí seznamy** - "Zhlédnuto" a "Chci vidět"
- **Tmavý režim** - přepínání mezi světlým a tmavým tématem
- **Autentizace** - přihlášení, registrace, změna hesla
- **Responzivní design** - optimalizováno pro různé velikosti obrazovek
- **Infinite scroll** - plynulé načítání dalších filmů

## 🚀 Technologie

- **Framework**: Ionic 8 + Angular 20
- **Jazyk**: TypeScript
- **Backend**: Firebase (Authentication + Firestore)
- **API**: TMDB (The Movie Database)
- **Styling**: SCSS + CSS variables
- **Build**: Capacitor 7 (pro Android/iOS)

## 📋 Požadavky

- **Node.js** >= 18.x
- **npm** nebo **yarn**
- **Angular CLI** >= 20.x
- **Ionic CLI** >= 7.x

### Volitelné (pro mobilní build):
- **Android Studio** (pro Android build)
- **Xcode** (pro iOS build, pouze macOS)

## 🔧 Instalace

### 1. Klonování repozitáře
```bash
git clone https://github.com/Mikydosh/AP5PM_Filmoteka.git
cd .\AP5PM_Filmoteka\
```

### 2. Instalace závislostí
```bash
npm install
```

### 3. Konfigurace API klíčů

> ⚠️ Repozitář **neobsahuje** žádné API klíče. Před spuštěním je potřeba získat vlastní a doplnit je do souborů `src/environments/environment.ts` a `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'your_tmdb_api_key_here',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p',

  firebase: {
    // your firebase configuration here
  apiKey: "your_firebase_api_key_here",
  authDomain: "your_firebase_auth_domain_here",
  projectId: "your_firebase_project_id_here",
  storageBucket: "your_firebase_storage_bucket_here",
  messagingSenderId: "your_firebase_messaging_sender_id_here",
  appId: "your_firebase_app_id_here"
}
};
```

### TMDB
 
1. Zaregistruj se na [themoviedb.org](https://www.themoviedb.org/) a potvrď e-mail.
2. Otevři Settings, záložku API a požádej o API klíč. Žádost vyžaduje krátký formulář (typ použití: osobní, popis: školní projekt).
3. Zkopíruj hodnotu „API Key“ do `tmdbApiKey`.

### Firebase
 
1. V [Firebase Console](https://console.firebase.google.com/) vytvoř nový projekt.
2. V sekci Authentication zapni poskytovatele Email/Password.
3. V sekci Firestore Database vytvoř databázi.
4. V záložce Rules nastav pravidla:

```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
```

5. V Project settings přidej webovou aplikaci (ikona `</>`), zkopíruj zobrazený objekt `firebaseConfig` a hodnoty vlož do části `firebase` v obou environment souborech.

## 🏃 Spuštění

Webová verze:
 
```bash
ionic serve
```
 
Aplikace poběží na `http://localhost:8100`. Účet si vytvoříš přímo v aplikaci přes „Registrovat se“ (heslo alespoň 6 znaků).
 
### Android
 
```bash
ionic build
ionic cap sync android
ionic cap open android
```
 
V Android Studiu počkej na dokončení synchronizace Gradle, vyber nebo vytvoř virtuální zařízení (Device Manager) a aplikaci spusť tlačítkem Run. Složka `android/` je už součástí repozitáře, příkaz `ionic cap add android` spouštět nemusíš (přepsal by vlastní ikony a nastavení).

## 📁 Struktura projektu
```
filmoteka/
├── src/
│   ├── app/
│   │   ├── guards/           # Auth guard
│   │   ├── models/           # TypeScript interfaces
│   │   ├── pages/            # Stránky aplikace
│   │   │   ├── movies/       # Seznam filmů
│   │   │   ├── series/       # Seznam seriálů
│   │   │   ├── lists/        # Uživatelské seznamy
│   │   │   ├── settings/     # Nastavení
│   │   │   ├── login/        # Přihlášení
│   │   │   ├── movie-detail/ # Detail filmu
│   │   │   ├── series-detail/# Detail seriálu
│   │   │   └── list-detail/  # Detail seznamu
│   │   ├── services/         # Services (API, Firebase)
│   │   └── tabs/             # Tab navigace
│   ├── environments/         # Environment konfigurace
│   ├── theme/                # SCSS styly a CSS variables
│   └── assets/               # Obrázky, loga
├── android/                  # Android build
├── ios/                      # iOS build (na macOS)
└── capacitor.config.ts       # Capacitor konfigurace
```

## 🎨 Screenshoty
> Screenshoty jsou pořízené z emulátoru pro telefon Google Pixel 9 Pro, tvůj vzhled se může lišit v závislosti na typu zařízení, rozlišení, poměru stran atd.

<img width="300" alt="login" src="https://github.com/user-attachments/assets/7db8c259-bf9f-4e9a-96fe-0eb5ab78b0b2" />
<img width="300" alt="filmy" src="https://github.com/user-attachments/assets/d4f61626-8232-4be8-a091-6a60c589cfa0" />
<img width="300"  alt="detail" src="https://github.com/user-attachments/assets/4e0d3c9f-f2e3-4571-b961-659ae5c14366" />
<img width="300"  alt="seznamy" src="https://github.com/user-attachments/assets/4b59af68-15da-42ab-aa96-8b9154012c68" />
<img width="300"  alt="nastaveni" src="https://github.com/user-attachments/assets/b2c46609-dd9a-4b85-be3e-37b8a3028041" />

## 🔑 Klíčové funkce aplikace

### Autentizace
- Registrace nového uživatele
- Přihlášení pomocí emailu a hesla
- Změna hesla
- Reset hesla emailem
- Odhlášení

### Filmy a seriály
- 3 kategorie: Populární, Nejlépe hodnocené, Nadcházející/Vysílané
- Infinite scroll pro plynulé načítání
- Vyhledávání s debounce (300ms)
- Detail s informacemi, herci, štábem
- Rating s barevným kruhovým indikátorem

### Seznamy
- 2 výchozí seznamy: "Zhlédnuto" a "Chci vidět"
- Vytváření vlastních seznamů
- Přidávání/odebírání filmů a seriálů
- Vizuální indikace (checkmarky) kde je film uložen
- Možnost smazání vlastních seznamů

### Nastavení
- Přepínání tmavého/světlého režimu
- Změna hesla
- Vymazání všech dat
- Odhlášení


## 👤 Autor

**Michal Dolanský**
- UTB FAI, SWI, 3. ročník
