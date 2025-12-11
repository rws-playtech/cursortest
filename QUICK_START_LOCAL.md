# Quick Start - Run Locally on Your PC

## Prerequisites

You need **Node.js** installed. Check by running:
```bash
node --version
```

If not installed, download from: https://nodejs.org/ (LTS version)

---

## Method 1: Using Git (Fastest)

Open your PC's terminal and run these commands:

```bash
# Clone the repository
git clone https://github.com/rws-playtech/cursortest.git

# Navigate into it
cd cursortest

# Switch to the redesign branch
git checkout cursor/redesign-roadmap-page-e025

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open: **http://localhost:5173** in your browser

---

## Method 2: Download ZIP (No Git Required)

### 1. Download the Project

**Option A:** Direct download from GitHub
- Go to: https://github.com/rws-playtech/cursortest
- Click green **"Code"** button
- Click **"Download ZIP"**
- Extract the ZIP file

**Option B:** Access through GitHub branch
- Go to: https://github.com/rws-playtech/cursortest/tree/cursor/redesign-roadmap-page-e025
- Click green **"Code"** button  
- Click **"Download ZIP"**
- Extract the ZIP file

### 2. Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd` and press Enter

**Mac:**
- Press `Cmd + Space`
- Type `terminal` and press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### 3. Navigate to the Project

```bash
cd path/to/extracted/folder
```

Example:
- Windows: `cd C:\Users\YourName\Downloads\cursortest-cursor-redesign-roadmap-page-e025`
- Mac/Linux: `cd ~/Downloads/cursortest-cursor-redesign-roadmap-page-e025`

### 4. Install Dependencies

```bash
npm install
```

Wait for installation to complete (takes 1-2 minutes)

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open in Browser

Look for this in your terminal:
```
➜  Local:   http://localhost:5173/
```

Click that link or copy/paste it into your browser!

---

## What You'll See

✅ **Featured Banner** - Click to navigate to game profile  
✅ **Game Filters** - Filter by category (Slots, Table Games, etc.)  
✅ **View Toggle** - Switch between Visual grid and Calendar  
✅ **Game Cards** - Expandable with full details  
✅ **Request Activation** - Select variants (1 of up to 7)  
✅ **CSV Export** - Download complete roadmap data  
✅ **Marketing Assets** - Links when available  
✅ **Game Profiles** - Links when games are released  

---

## Common Issues

### "npm not found" or "node not found"
→ Install Node.js from https://nodejs.org/

### Port already in use
→ Server will auto-select next port (5174, 5175, etc.)  
→ Or manually specify: `npm run dev -- --port 3000`

### Module not found errors
→ Delete `node_modules` and `package-lock.json`  
→ Run `npm install` again

### Permission errors (Mac/Linux)
→ You might need to use `sudo npm install`  
→ Or fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

---

## To Stop the Server

Press `Ctrl + C` in the terminal

---

## Project Structure

```
cursortest/
├── src/
│   ├── components/          # All React components
│   ├── types.ts            # TypeScript types
│   ├── mockData.ts         # Sample game data
│   └── index.css           # Global styles
├── package.json            # Dependencies
├── README.md               # Full documentation
├── QUICKSTART.md           # Quick reference
└── FEATURES.md             # Feature checklist
```

---

## Need Help?

Check these files in the project:
- **README.md** - Complete documentation
- **IMPLEMENTATION_NOTES.md** - Technical details
- **FEATURES.md** - All implemented features

---

**That's it! Enjoy your modern roadmap page!** 🚀
