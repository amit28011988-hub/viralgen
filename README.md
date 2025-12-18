# VIRALGEN - Trending Content Generator

Automatically fetches trending images from Reddit and applies viral-style captions (Yellow Header / Black Footer style).

## Features
- 🔥 Auto-fetch trending images from Reddit
- ✏️ Live caption editor
- 📸 High-quality PNG download
- 🎨 Premium dark UI

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Netlify (via GitHub - RECOMMENDED)

**Option A: GitHub Connection (Best for Windows users)**

1. **Create a new GitHub repository** at https://github.com/new

2. **Push this code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/viralgen.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify:**
   - Go to https://app.netlify.com
   - Click **"Add new site" > "Import an existing project"**
   - Select **GitHub** and choose your `viralgen` repository
   - Netlify will auto-detect Next.js settings
   - Click **"Deploy site"**

4. **Done!** Netlify will build on their Linux servers (avoiding Windows path issues) and deploy automatically.

---

**Option B: Netlify CLI (Alternative)**

If you must deploy from CLI:
```bash
# Delete build artifacts first
Remove-Item -Recurse -Force .next, .netlify

# Deploy (let Netlify build remotely)
netlify deploy --build --prod
```

⚠️ **Note:** Building locally on Windows may cause path errors. Use GitHub deployment instead.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── trending/route.ts   # Reddit API endpoint
│   │   └── proxy/route.ts       # CORS proxy
│   └── page.tsx                 # Main UI
└── components/
    └── MemeCanvas.tsx           # Canvas renderer
```

## Customization

To change trending sources, edit `src/app/api/trending/route.ts`:
```typescript
const subreddits = ['GetMotivated', 'pics', 'memes']; // Add your subreddits
```
