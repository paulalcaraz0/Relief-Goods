# Firebase Setup Guide for KapitBayan

This guide will help you set up Firebase to persist your relief requests in a real-time database.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "kapitbayan-relief")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project" and wait for it to complete

## Step 2: Set Up Realtime Database

1. In your Firebase project, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose a location (preferably close to Philippines, like `asia-southeast1`)
4. Select "Start in **test mode**" for now (we'll secure it later)
5. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the Web icon `</>` to add a web app
5. Register your app (name it "KapitBayan Web")
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 4: Update Your Configuration File

1. Open `js/firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. Save the file

## Step 5: Test Your Integration

1. Open `index.html` in your web browser
2. Open browser console (F12 or Right-click > Inspect > Console)
3. You should see: "Firebase initialized successfully!"
4. Click the "+" button to submit a test relief request
5. Go to Firebase Console > Realtime Database
6. You should see your data appear in real-time under `reliefRequests/`

## Step 6: Secure Your Database (IMPORTANT!)

After testing, secure your database with these rules:

1. In Firebase Console, go to "Realtime Database"
2. Click on the "Rules" tab
3. Replace the rules with:

```json
{
  "rules": {
    "reliefRequests": {
      ".read": true,
      ".write": true,
      "$requestId": {
        ".validate": "newData.hasChildren(['lat', 'lng', 'municipality', 'barangay', 'status'])"
      }
    }
  }
}
```

4. Click "Publish"

**For production use, implement proper authentication!**

## Optional: Add Domain to Authorized Domains

If deploying to a custom domain:

1. Go to Firebase Console > Authentication
2. Click "Settings" tab
3. Scroll to "Authorized domains"
4. Add your domain (e.g., `kapitbayan.com`)

## What's Fixed

### 1. Database Integration
- All relief requests now save to Firebase Realtime Database
- Data persists even after page refresh
- Real-time updates across all connected users

### 2. Location Accuracy
- Updated Lemery coordinates to `[13.9167, 120.8833]` (more accurate)
- Reduced random offset from ±2km to ±800m
- Markers now stay within municipality boundaries

### 3. Real-Time Features
- When someone submits a request, all users see it instantly
- When status changes to "Assisted", all users see the update
- Automatic synchronization across devices

## Data Structure in Firebase

Your data will be stored like this:

```
reliefRequests/
  ├── -NXyz123abc/
  │   ├── lat: 13.9167
  │   ├── lng: 120.8833
  │   ├── municipality: "Lemery"
  │   ├── barangay: "Poblacion"
  │   ├── street: "Purok 3"
  │   ├── contact: "09171234567"
  │   ├── contactName: "Juan Dela Cruz"
  │   ├── needs: ["water", "food"]
  │   ├── people: 15
  │   ├── status: "needs"
  │   ├── urgency: "high"
  │   ├── timestamp: 1701234567890
  │   └── notes: "Urgent help needed"
  └── -NXyz123def/
      └── ...
```

## Troubleshooting

**Error: Firebase not defined**
- Make sure you're connected to the internet
- Check that Firebase CDN links in `index.html` are loading

**Error: Permission denied**
- Check your database rules
- Make sure you're in "test mode" for development

**Markers not appearing**
- Open browser console (F12) to check for errors
- Verify your Firebase config is correct
- Check that databaseURL is set correctly

**Old location for Lemery**
- Clear your browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify Firebase configuration
3. Check Firebase Console for data
4. Review Firebase documentation: https://firebase.google.com/docs/database

## Next Steps

Consider adding:
- User authentication (Firebase Auth)
- Admin panel to manage requests
- SMS notifications using Twilio
- Export reports functionality
- Image uploads for damage assessment
