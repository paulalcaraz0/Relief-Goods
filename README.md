# KapitBayan - Disaster Relief Coordination

A real-time disaster relief coordination system for managing and tracking emergency relief requests across Batangas province.

## 📁 Project Structure

```
relief-map/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All stylesheets (TRON-style)
├── js/
│   ├── data.js            # Sample location data and municipality coordinates
│   ├── map.js             # Map initialization and marker management
│   ├── boundaries.js      # Municipality boundary highlighting
│   ├── forms.js           # Form handling and submission
│   ├── filters.js         # Search and filter functionality
│   ├── analytics.js       # Analytics dashboard
│   └── ui.js              # UI interactions (modals, toasts, keyboard shortcuts)
├── data/                  # For GeoJSON boundary files
├── assets/                # For future images/icons
├── README.md             # This file
└── BOUNDARIES_GUIDE.md   # Guide for adding real municipality boundaries
```

## 🚀 Features

### 🎮 TRON-Inspired Design
- **Dark Map**: CartoDB dark tiles with cyan accents
- **Glowing Effects**: Scan lines, grid overlay, and neon borders
- **Pulsing Markers**: Glowing markers with TRON-style animations
- **Cyan UI**: All panels feature glowing cyan borders and effects
- **Focused View**: Map restricted to Batangas province only

### Map Features
- **Interactive Map**: View all relief requests on an interactive map
- **Municipality Boundaries**: Click to highlight entire municipalities with glowing cyan borders
- **Color-coded Markers** (by urgency level):
  - Red markers = Critical priority (⚠ symbol, pulsing)
  - Orange markers = High priority (⚠ symbol)
  - Yellow markers = Medium priority (⚠ symbol)
  - Blue markers = Low priority (⚠ symbol)
  - Green markers = Assisted (✓ symbol)

### Filter & Search
- **Status Filters**: All Requests, Needs Help, Assisted
- **Urgency Filters**: Critical, High, Medium, Low
- **Search**: Search by location, name, or municipality

### Request Management
- **Submit Requests**: Fill out detailed forms to request relief
- **Track Progress**: Form progress indicator shows completion
- **Mark as Assisted**: Relief coordinators can mark locations as served

### Analytics Dashboard
- Overview statistics (total requests, people affected, response rate)
- Urgency breakdown
- Top municipalities needing help
- Most needed resources

### Data Export
- Export all data to CSV format for reporting

### Keyboard Shortcuts
- `?` - Toggle shortcuts panel
- `N` - New relief request
- `R` - Reset map view
- `A` - Analytics dashboard
- `Esc` - Close modals/panels

## 📂 File Descriptions

### CSS Files
- **styles.css**: Contains all styling for the application including:
  - Layout and positioning
  - Component styles (cards, buttons, forms)
  - Animations and transitions
  - Responsive design for mobile devices

### JavaScript Files

#### data.js
- Contains sample location data
- Municipality coordinates for all Batangas towns/cities
- Easy to modify or connect to a backend database

#### map.js
- Initializes the Leaflet map
- Creates and manages map markers
- Handles marker icons and popups
- Map bounds and view management

#### forms.js
- Form submission handling
- Form validation
- Progress indicator updates
- Phone number formatting
- Creating new relief requests

#### filters.js
- Status filtering (needs/served/all)
- Urgency filtering (critical/high/medium/low)
- Location search functionality
- Apply and reset filters

#### analytics.js
- Analytics dashboard calculations
- Statistics generation
- Data export to CSV
- Municipality and resource analysis

#### ui.js
- Modal open/close functionality
- Toast notifications
- Loading indicators
- Keyboard shortcuts
- Tutorial overlay

## 🔥 Firebase Integration

**NEW!** KapitBayan now uses Firebase Realtime Database to persist relief requests!

- All data saves automatically to the cloud
- Real-time updates across all users
- Data persists even after page refresh

**Setup Required:** Follow the [Firebase Setup Guide](FIREBASE_SETUP.md) to configure your Firebase project.

## 📍 Accurate Geocoding

**NEW!** Smart location pinning using geocoding APIs!

- **Accurate pins** - No more random offsets, pins placed at actual barangay locations
- **Auto-geocoding** - System finds exact coordinates for "Barangay, Municipality"
- **Free service** - Uses Nominatim (OpenStreetMap) API
- **Fallback system** - Works even if geocoding fails

**Example:** User selects "Alangilan, Batangas City" → Pin placed in actual Alangilan, not Poblacion!

See [Geocoding Guide](GEOCODING_GUIDE.md) for details and OpenCage API setup.

## 🛠️ How to Use

1. **Set Up Firebase** (Required for data persistence)
   - Follow instructions in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Takes about 5-10 minutes
   - Free tier is sufficient for most use cases

2. **Open the Application**
   - Simply open `index.html` in a web browser
   - The app will work offline with local data only if Firebase is not configured

3. **View Relief Requests**
   - Click on any marker to see details
   - Use filters on the left panel to narrow down requests

4. **Submit a New Request**
   - Click the blue "+" button (bottom right)
   - Fill out the form with your location and needs
   - Submit to add to the map

5. **Mark as Assisted**
   - Click a red (needs help) marker
   - Click "Mark as Assisted" button in the popup
   - Marker will turn green

6. **View Analytics**
   - Click the header stats or the 📊 button
   - View detailed statistics and reports

7. **Export Data**
   - Click the 📥 Export button
   - Download CSV file with all requests

## 🎨 Customization

### Adding New Municipalities
Edit `js/data.js` and add to `municipalityCoordinates` object:
```javascript
'Your Municipality': [latitude, longitude]
```

### Changing Colors
Edit `css/styles.css`:
- Critical color: `#ef4444` (Red)
- High color: `#f97316` (Orange)
- Medium color: `#eab308` (Yellow)
- Low color: `#3b82f6` (Blue)
- Served color: `#10b981` (Green)

### Adding New Relief Types
Edit `index.html` modal section and add a new need card:
```html
<div class="need-card" onclick="toggleNeed(this, 'newtype')">
    <input type="checkbox" id="newtype" name="needs" value="newtype">
    <div class="need-icon">🔧</div>
    <div class="need-label">New Type</div>
</div>
```

## 🔧 Backend Integration

To connect to a backend database:

1. **Modify data.js**
   - Replace sample data with API calls
   - Fetch locations from your backend

2. **Modify forms.js**
   - Update `createLocation()` to POST to your API
   - Handle API responses

3. **Add real-time updates**
   - Implement WebSocket or polling
   - Update map markers dynamically

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all files are in the correct folders
3. Verify file paths in `index.html`

## 📄 License

This project is open source and available for use in disaster relief coordination efforts.

## 🙏 Acknowledgments

- Map tiles from OpenStreetMap
- Leaflet.js for map functionality
- Focus on Batangas province, Philippines
