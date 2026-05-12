# 🖤 Noir — Music Player

A beautiful, ad-free personal music player. Built with Electron.

---

## Quick Start (Run without building)

1. Make sure you have **Node.js** installed → https://nodejs.org
2. Open a terminal in this folder
3. Run:
   ```
   npm install
   npm start
   ```
   Noir will open as a desktop app!

---

## Build an Installer (so you can install it permanently)

### Windows (.exe installer)
```
npm install
npm run dist:win
```
→ Find the installer in the `dist/` folder. Run it to install Noir.

### Mac (.dmg)
```
npm install
npm run dist:mac
```
→ Find the `.dmg` in `dist/`. Drag Noir to Applications.

### Linux (.AppImage)
```
npm install
npm run dist:linux
```
→ Find the `.AppImage` in `dist/`. Make it executable and run it.

---

## Features
- 🎵 Play MP3, WAV, OGG, FLAC, M4A, AAC
- 💾 Songs saved permanently (IndexedDB — stays after closing)
- 🔀 Shuffle & repeat modes
- ♥ Like tracks
- ⌨️ Keyboard shortcuts (Space, Arrow keys, N, P, M, L, S)
- 🖱️ Drag & drop files
- 🎨 Beautiful dark UI with custom titlebar

---

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Space | Play / Pause |
| → | Skip forward 10s |
| ← | Skip back 10s |
| ↑ | Volume up |
| ↓ | Volume down |
| N | Next track |
| P | Previous track |
| M | Mute |
| L | Like track |
| S | Toggle shuffle |
