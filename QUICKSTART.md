# AI Nexus - Quick Start (5 minutes)

## What's Already Done
✅ All 28 files created and configured
✅ React Router setup with 6 pages
✅ Firebase integration ready
✅ Beautiful glassmorphism UI with premium styling
✅ Framer Motion animations throughout
✅ Bottom navigation with active states
✅ PWA configuration
✅ Responsive mobile design

## 3 Steps to Launch

### Step 1: Set Up Firebase (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project" and name it "ai-nexus-salon"
3. Skip Google Analytics (optional)
4. Go to Project Settings (⚙️ icon)
5. Under "Your apps", click "Web" icon (</> symbol)
6. Register app as "ai-nexus"
7. Copy your Firebase config values

### Step 2: Add Credentials (1 minute)

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local and paste your Firebase values
nano .env.local
```

Your `.env.local` should look like:
```
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Step 3: Run! (2 minutes)

```bash
# Install dependencies (already done if you ran npm install)
npm install

# Start dev server
npm run dev
```

Visit: **http://localhost:5173**

## Test These Features

### Login Page
- Try creating a new account with any email/password
- Firebase will handle it securely
- Click toggle to switch between login/register

### Dashboard
- See your email displayed
- View stats cards with animations
- Quick links to other pages
- Recent activity feed

### Contents (Browse Courses)
- 8 AI courses with real descriptions
- Filter by category (All, AI Basics, Prompt Engineering, Tools, Advanced)
- Search functionality
- Bookmark/save courses
- Difficulty badges (Beginner, Intermediate, Advanced)

### Q&A (Community)
- View sample Q&A posts
- Click "Ask Question" to create new posts
- Posts save to Firestore (shows dummy data if Firestore fails)
- See reply counts and view stats

### Notifications
- 6 sample notifications
- Read/unread states
- Time-based grouping (Today, Yesterday, Earlier)
- Delete notifications
- Mark all as read

### Profile
- View your account info
- User stats (courses completed, contributions, etc.)
- Account settings (notifications toggle, dark mode toggle)
- Logout button

## Customize the App

### Change Colors
Edit `/src/styles/global.css`:
```css
:root {
  --primary-start: #6366f1;  /* Change blue to any color */
  --primary-end: #8b5cf6;    /* Change violet to any color */
}
```

### Change App Name
1. Edit `/index.html` - `<title>` tag
2. Edit `/public/manifest.json` - "name" and "short_name"

### Add More Courses
Edit `/src/pages/Contents.jsx` - `contentData` array has 8 courses

### Add More Notifications
Edit `/src/pages/Notifications.jsx` - `notifications` state

### Add Custom Q&A Posts
Firestore will auto-save posts. Initial posts are in `/src/pages/QA.jsx`

## Deploy to Production

### Option 1: Vercel (Recommended - 2 minutes)

```bash
npm install -g vercel
vercel
```

When prompted:
1. Link to existing project or create new one
2. Set environment variables in Vercel dashboard:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - etc. (all 6 from .env.local)

### Option 2: Any Hosting

```bash
# Build the app
npm run build

# Output is in 'dist/' folder - upload to any host
# (Netlify, GitHub Pages, Firebase Hosting, etc.)
```

## File Locations Reference

| Page | Files |
|------|-------|
| Login | `src/pages/Login.jsx` + `Login.module.css` |
| Dashboard | `src/pages/Dashboard.jsx` + `Dashboard.module.css` |
| Contents | `src/pages/Contents.jsx` + `Contents.module.css` |
| Q&A | `src/pages/QA.jsx` + `QA.module.css` |
| Notifications | `src/pages/Notifications.jsx` + `Notifications.module.css` |
| Profile | `src/pages/Profile.jsx` + `Profile.module.css` |

## Common Questions

**Q: How do I add more courses?**
A: Edit `src/pages/Contents.jsx` - add items to the `contentData` array

**Q: How do I change the theme?**
A: Edit CSS variables in `src/styles/global.css`

**Q: Where does data get saved?**
A: Q&A posts go to Firestore. Notifications and courses are in component state.

**Q: Can I use this without Firebase?**
A: Yes! The app has fallback dummy data. Just comment out Firebase imports.

**Q: How do I enable dark mode?**
A: Toggle is in Profile page, but styling not fully implemented yet. Easy to add!

## What's Inside

- **React Router**: 6 pages with nested routing
- **Firebase Auth**: Email/password authentication
- **Firestore**: Q&A posts storage
- **Framer Motion**: Smooth page transitions and micro-interactions
- **CSS Modules**: Scoped styling to prevent conflicts
- **Glassmorphism**: Premium frosted glass design
- **PWA**: Installable on mobile home screen
- **Responsive**: Works beautifully on all devices

## Troubleshooting

**Blank page after login?**
- Check browser console for errors (F12)
- Make sure .env.local has correct Firebase values
- Verify Firebase project has Authentication enabled

**Styling looks wrong?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (npm run dev)

**Q&A posts not saving?**
- Check Firebase Console > Firestore Database
- Verify "collections" section
- Check Firestore rules allow read/write

## That's It!

You have a production-ready, world-class AI salon app. Customize it, add more features, and launch!

For detailed customization guide, see `SETUP.md`
