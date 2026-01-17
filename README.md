# oChronos – High-End Time Tracking App

oChronos ist eine moderne, responsive Zeiterfassungs-App, die mit Fokus auf UX/UI-Design und technische Sauberkeit entwickelt wurde. Das Design orientiert sich an aktuellen Apple-Standards (Glassmorphism, High-End-Typography) und bietet eine nahtlose Erfahrung auf Mobile, Tablet und Desktop.

# 🚀 Features

-   Präzises Tracking: Real-time Timer mit "Tabular Nums" (Space Grotesk), um visuelle Sprünge bei den Sekunden zu vermeiden.
-   Modularer Aufbau: Strukturierte SCSS-Architektur nach dem 7-1 Pattern (Variables, Components, Pages, Layouts).
-   Full Responsive: Optimiertes Grid-Layout für Smartphones (Bottom-Nav & FAB) sowie Laptops (Dashboard-Grid).
-   Persistent Storage: Automatische Speicherung aller Daten im localStorage des Browsers.
-   Projekt-Management: Erfassung von Aufgaben, Zuordnung zu Projekten und Budget-Fortschrittsanzeige.
-   Edit & Manage: Bearbeitungsfunktion für Aufgabennamen und sicheres Löschen über ein Dropdown-Menü.

# 🛠 Tech Stack

-   Framework: Vue.js 3 (Composition API)
-   Sprache: TypeScript (Strict Mode)
-   Styling: SCSS (BEM-Methodik, 7-1 Struktur)
-   Icons: Font Awesome 6
-   Fonts: Manrope (UI) & Space Grotesk (Technisch/Timer)

# 📂 ProjektstrukturPlaintextsrc/

```bash
src/
├── assets/scss/            # Modulare SCSS Architektur
│   ├── components/         # _timer-card.scss, etc.
│   ├── includes/           # _variables.scss
│   ├── layouts/            # _default.scss
│   ├── pages/              # _home.scss, _list.scss
│   └── main.scss           # Zentraler Import-Punkt
├── components/             # Wiederverwendbare Vue-Partials
├── layouts/                # Seiten-Layouts (DefaultLayout)
├── pages/                  # Views (Home, List)
├── store/                  # Globaler Reactive State & LocalStorage Logik
└── types/                  # TypeScript Interfaces (TimeLog)
```

# ⚙️ Installation & Entwicklung

1. Repository klonen

```bash
git clone https://github.com/jamshed03/oChronos.git
cd ochronos
```

2. Abhängigkeiten installieren

```bash
cd frontend
npm install
```

3. Development Server starten

```bash
cd frontend
npm run dev
```

4. Produktions-Build erstellen

```bash
cd frontend
npm run build
```

# Entwickelt mit ❤️ von Jamshedjon Sidiqov
