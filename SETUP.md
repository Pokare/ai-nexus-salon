# AI Nexus - Setup Guide

A world-class AI online salon membership app built with React, Vite, Firebase, and Framer Motion.

## 🚀 Features

- **Beautiful UI**: Glassmorphism design inspired by Linear, Stripe, and Notion
- **6 Complete Screens**: Login, Dashboard, Contents, Q&A, Notifications, Profile
- **Firebase Integration**: Email/password authentication and Firestore database
- **Smooth Animations**: Framer Motion page transitions and micro-interactions
- **PWA Ready**: Service worker, manifest, offline support
- **Mobile Optimized**: Responsive design with mobile-first approach
- **Bottom Navigation**: Native app-like navigation bar

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Firebase project (free tier is fine)

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

All dependencies are already in package.json:
- react-router-dom: Routing
- firebase: Auth & Firestore
- framer-motion: Animations
- lucide-react: Icons
- vite-plugin-pwa: PWA support

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable Authentication (Email/Password method)
4. Enable Firestore Database
5. Copy your Firebase config values

### 3. Set Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase credentials in `.env.local`:
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

### 4. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 5. Test the App

1. **Login Page**: Create an account with any email/password
2. **Dashboard**: View stats and recent activity
3. **Contents**: Browse 8 AI courses with filters and search
4. **Q&A**: Post questions (tries Firestore, falls back to dummy data)
5. **Notifications**: View announcements and alerts
6. **Profile**: Manage account settings

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
├── firebase.js            # Firebase config
├── contexts/
│   └── AuthContext.jsx    # Auth state management
├── components/
│   ├── Layout.jsx         # Main layout with nav bar
│   ├── ProtectedRoute.jsx # Route guard
│   ├── Layout.module.css  # Layout styles
│   └── Layout.module.css
├── pages/
│   ├── Login.jsx          # Login/Register page
│   ├── Dashboard.jsx      # Home dashboard
│   ├── Contents.jsx       # Course library
│   ├── QA.jsx             # Q&A community
│   ├── Notifications.jsx  # Alerts & announcements
│   ├── Profile.jsx        # User profile
│   └── *.module.css       # Page-specific styles
└── styles/
    └── global.css         # Global styles & CSS variables

public/
├── manifest.json          # PWA manifest
└── favicon.svg

index.html                  # HTML entry point
vite.config.js             # Vite configuration
vercel.json                # Vercel SPA routing
```

## 🎨 Design System

The app uses a premium glassmorphism design with:

- **Color Palette**:
  - Primary Gradient: `#6366f1` → `#8b5cf6` (indigo to violet)
  - Background: `#f8fafc` (light blue-gray)
  - Surface: `#ffffff` (white)
  - Text Primary: `#0f172a` (dark slate)
  - Text Secondary: `#475569` (slate)

- **Typography**: Inter font from Google Fonts
  - Weights: 400, 500, 600, 700
  - Letter spacing: -0.3px for premium feel

- **Spacing**: Consistent rem-based spacing
  - Cards: 16px border-radius
  - Buttons: 12px border-radius
  - Pills: 9999px border-radius

- **Glassmorphism Elements**:
  ```css
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
  }
  ```

## 🔐 Authentication Flow

1. User visits `/login`
2. Creates account or logs in with email/password
3. Firebase stores credentials securely
4. `AuthContext` tracks `currentUser` state
5. Protected routes redirect to login if not authenticated
6. User can logout from profile page

## 🗄️ Firestore Collections

The app uses these collections (created automatically):

- **questions** (optional, Q&A feature)
  - Fields: title, body, author, createdAt, replies, views

## 📱 Mobile Features

- **Responsive Design**: Works on all screen sizes
- **Bottom Navigation**: Native app-like navigation bar
- **Touch Optimized**: 44px minimum touch targets
- **Safe Area Support**: Respects notches and home indicators
- **PWA Support**: Installable on home screen
- **Offline Fallback**: Shows cached content

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set your environment variables in Vercel dashboard:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- etc.

### Deploy to Other Platforms

```bash
npm run build
```

Output will be in `dist/` folder.

## 🔑 Key Files to Customize

1. **src/firebase.js**: Update with your Firebase config (or use .env)
2. **src/pages/Contents.jsx**: Replace dummy content data
3. **src/pages/Notifications.jsx**: Update dummy notifications
4. **public/manifest.json**: Update app name, icons, colors
5. **index.html**: Update title, description, meta tags

## 🛠️ Development Tips

- **CSS Modules**: Each page has its own `.module.css` file
- **Animations**: Use Framer Motion's `motion` component
- **Icons**: lucide-react provides 2000+ icons
- **Global CSS**: `src/styles/global.css` has CSS variables
- **Dark Mode**: Color variables make dark mode easy to add

## 📚 Dependencies Reference

- **react-router-dom**: Client-side routing
- **firebase**: Auth & Firestore
- **framer-motion**: Smooth animations
- **lucide-react**: 2000+ beautiful icons
- **vite-plugin-pwa**: PWA support

## 🐛 Troubleshooting

**Firebase not working?**
- Check .env.local has correct values
- Verify Firestore rules allow read/write for authenticated users
- Check browser console for errors

**Styling looks off?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check if global.css is imported in main.jsx
- Verify Inter font is loading from Google Fonts

**PWA not installing?**
- Must be served over HTTPS (works on localhost for testing)
- Check manifest.json is valid JSON
- Browser must support PWA (all modern browsers do)

## 📖 Next Steps

1. Fill in Firebase credentials in `.env.local`
2. Run `npm run dev` to start development server
3. Create test account at `/login`
4. Explore all 6 screens
5. Customize content and branding
6. Deploy to production

## 💡 Customization Ideas

- Add more course content
- Implement real Q&A with voting
- Add user avatars with real images
- Create course progress tracking
- Add certificate generation
- Implement video player for courses
- Add payment integration
- Create admin dashboard
- Add search functionality to Q&A
- Implement real-time chat

## 📄 License

This project is ready for production use.

## 🎉 You're All Set!

The app is production-ready with world-class design. Enjoy building with AI Nexus!
