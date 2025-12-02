# Municipality Boundaries Setup Guide

I've added TRON-style glowing municipality boundaries to your map! However, the current data is **placeholder data** with simplified boundaries. Here's how to get real boundary data:

## 🗺️ Current Features

- ✅ Click any municipality boundary to highlight it with TRON-style cyan glow
- ✅ Shows municipality information in the details panel
- ✅ Displays relief statistics for that municipality
- ✅ Lists recent requests from that area
- ✅ Pulsing glow animation on selected municipality
- ✅ Hover effects on boundaries

## 📥 How to Get Real Boundary Data

### Option 1: OpenStreetMap (Recommended)

1. Visit **Overpass Turbo**: https://overpass-turbo.eu/
2. Use this query to get Batangas municipalities:

```
[out:json][timeout:25];
// Fetch all municipalities in Batangas
area["name"="Batangas"]["admin_level"="4"]->.batangas;
(
  relation["boundary"="administrative"]["admin_level"="6"](area.batangas);
);
out geom;
```

3. Click **Run** (▶️ button)
4. Click **Export** → **GeoJSON**
5. Save the file

### Option 2: GADM Database

1. Visit: https://gadm.org/download_country.html
2. Select **Philippines**
3. Download **Level 2** (municipalities)
4. Filter for Batangas province

### Option 3: PhilGIS

1. Visit: https://philgis.org/
2. Download Philippine administrative boundaries
3. Extract Batangas municipalities

## 📝 How to Use the Real Data

Once you have the GeoJSON file:

1. **Simple Method**: Replace the `municipalityBoundaries` object in `js/boundaries.js`:

```javascript
// Replace this entire object with your downloaded GeoJSON
const municipalityBoundaries = {
    // Paste your GeoJSON here
};
```

2. **Better Method**: Load from external file:

Create `data/batangas-boundaries.geojson` and update `boundaries.js`:

```javascript
// At the top of boundaries.js
let municipalityBoundaries = null;

// Load GeoJSON from file
fetch('data/batangas-boundaries.geojson')
    .then(response => response.json())
    .then(data => {
        municipalityBoundaries = data;
        initMunicipalityBoundaries(map);
    });
```

## 🎨 Customizing the Style

Edit these functions in `js/boundaries.js`:

### Change Default Boundary Color
```javascript
function getDefaultStyle() {
    return {
        color: '#00ffff',        // Change this color
        weight: 1,               // Line thickness
        opacity: 0.3,            // Transparency
    };
}
```

### Change Highlight Style
```javascript
function getHighlightStyle() {
    return {
        color: '#00ffff',        // Glow color
        weight: 3,               // Thicker when selected
        opacity: 1,              // Fully visible
        fillOpacity: 0.1,        // Slight fill
    };
}
```

### Adjust Glow Effect
In the CSS (automatically injected):
```css
.municipality-highlight {
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))
            drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))
            drop-shadow(0 0 30px rgba(0, 255, 255, 0.4));
}
```

## 🔧 Adding More Municipality Data

You can add more properties to each municipality in the GeoJSON:

```json
{
    "type": "Feature",
    "properties": {
        "name": "Batangas City",
        "population": "351,437",
        "area": "282.5 km²",
        "mayor": "Mayor Name",
        "barangays": 105,
        "zip_code": "4200"
    },
    "geometry": { ... }
}
```

Then display them in `showMunicipalityInfo()` function.

## 🎯 Current Placeholder Data

The app currently has boundaries for:
- Batangas City
- Lipa City
- Tanauan City

These are **simplified rectangles** - not actual boundaries!

## ✨ Features You Can Add

1. **Toggle boundaries on/off**
2. **Color-code by number of requests**
3. **Show population density**
4. **Add municipality labels**
5. **Export municipality reports**

## 🚨 Troubleshooting

**Boundaries not showing?**
- Check browser console for errors
- Verify GeoJSON format is valid
- Ensure coordinates are in [longitude, latitude] format

**Wrong boundaries?**
- Make sure GeoJSON uses WGS84 coordinate system
- Coordinates should be around 121° longitude, 13-14° latitude for Batangas

**Performance issues?**
- Simplify complex boundaries using: https://mapshaper.org/
- Reduce number of coordinate points

## 🎮 Usage

1. **Click** a municipality boundary to select it
2. **Hover** to see highlight preview
3. Details panel shows:
   - Municipality name and info
   - Relief statistics
   - Recent requests
4. **Click X** or press **ESC** to deselect
