# Geocoding Implementation Guide

Your relief map now uses **geocoding** to get accurate coordinates for each barangay instead of random offsets!

## Current Implementation

### Nominatim (OpenStreetMap) - FREE ✅
- **Currently Active**
- **No API key required**
- **No billing needed**
- **Rate limit**: 1 request per second
- **Coverage**: Good for Philippines

When a user submits a relief request, the system:
1. Geocodes: "Barangay, Municipality, Batangas, Philippines"
2. Gets actual lat/lng coordinates
3. Places pin at exact location
4. Falls back to municipality center if geocoding fails

## Example Results

**Before (Inaccurate):**
- User selects: "Alangilan, Batangas City"
- System used: Batangas City center + random offset
- Result: Pin could be in Poblacion (WRONG!)

**After (Accurate):**
- User selects: "Alangilan, Batangas City"
- System geocodes the address
- Result: Pin placed in actual Alangilan location (CORRECT!)

## Optional: Add OpenCage API as Backup

If you want even more reliability, you can add OpenCage API as a backup geocoder.

### OpenCage Geocoding API
- **Free tier**: 2,500 requests/day
- **Very accurate**
- **Worldwide coverage**
- **Fast response times**

### Setup Steps:

1. **Sign up for OpenCage**
   - Go to: https://opencagedata.com/
   - Create free account
   - Get your API key from dashboard

2. **Add to firebase-config.js**

```javascript
// Add after Firebase config
const OPENCAGE_API_KEY = 'YOUR_OPENCAGE_API_KEY_HERE';
```

3. **Update forms.js geocoding function**

Replace the current `geocodeAddress` function with this enhanced version:

```javascript
async function geocodeAddress(barangay, municipality) {
    try {
        // Build the full address
        const fullAddress = `${barangay}, ${municipality}, Batangas, Philippines`;

        console.log('Geocoding address:', fullAddress);

        // Try OpenCage API first (if API key is set)
        if (typeof OPENCAGE_API_KEY !== 'undefined' && OPENCAGE_API_KEY !== 'YOUR_OPENCAGE_API_KEY_HERE') {
            try {
                const opencageUrl = `https://api.opencagedata.com/geocode/v1/json?` +
                    `q=${encodeURIComponent(fullAddress)}&` +
                    `key=${OPENCAGE_API_KEY}&` +
                    `countrycode=ph&` +
                    `limit=1`;

                const response = await fetch(opencageUrl);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const lat = data.results[0].geometry.lat;
                    const lng = data.results[0].geometry.lng;
                    console.log('OpenCage geocoded coordinates:', lat, lng);
                    return { lat, lng, success: true, source: 'opencage' };
                }
            } catch (error) {
                console.warn('OpenCage geocoding failed, trying Nominatim...', error);
            }
        }

        // Fallback to Nominatim (OpenStreetMap) - FREE
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(fullAddress)}&` +
            `format=json&` +
            `limit=1&` +
            `countrycodes=ph`;

        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'KapitBayan-Relief-Map'
            }
        });

        if (!response.ok) {
            throw new Error('Geocoding failed');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            console.log('Nominatim geocoded coordinates:', lat, lng);
            return { lat, lng, success: true, source: 'nominatim' };
        } else {
            console.warn('No results from geocoding');
            return { success: false };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return { success: false };
    }
}
```

## How It Works

### Geocoding Flow:
```
User submits form
    ↓
System geocodes: "Alangilan, Batangas City, Batangas, Philippines"
    ↓
API returns: lat: 13.7865, lng: 121.0765
    ↓
Pin placed at EXACT location
    ↓
Saved to Firebase
```

### Fallback Strategy:
1. **Try OpenCage** (if API key configured) - Most accurate
2. **Try Nominatim** (always available) - Good accuracy, free
3. **Fallback to municipality center** - If both fail

## Testing

1. **Submit a test request:**
   - Municipality: Batangas City
   - Barangay: Alangilan
   - Submit the form

2. **Check browser console:**
   ```
   Geocoding address: Alangilan, Batangas City, Batangas, Philippines
   Geocoded coordinates: 13.7865, 121.0765
   Using geocoded coordinates for accurate pinning
   ```

3. **Verify on map:**
   - Pin should be placed in actual Alangilan area
   - NOT in Poblacion or random location

## API Comparison

| Feature | Nominatim (Current) | OpenCage (Optional) |
|---------|---------------------|---------------------|
| Cost | FREE | FREE (2,500/day) |
| API Key | Not needed | Required |
| Accuracy | Good | Excellent |
| Speed | Fast | Very Fast |
| Philippines Coverage | Good | Excellent |
| Rate Limit | 1 req/sec | 1 req/sec |

## Troubleshooting

### Pin still inaccurate?
1. Check browser console for geocoding logs
2. Verify the address format
3. Try different barangay (some small barangays may not be in database)

### Geocoding not working?
1. Check internet connection
2. Look for errors in browser console
3. Verify you're not hitting rate limits

### Want even more accuracy?
- Add street/sitio information when submitting
- System will geocode: "Purok 3, Alangilan, Batangas City"
- Even more precise!

## Rate Limits

**Nominatim:**
- Max 1 request per second
- Be respectful of their free service
- System automatically handles this

**OpenCage:**
- 2,500 requests per day (free tier)
- 1 request per second
- Upgrade available if needed

## Benefits

✅ **Accurate pins** - Markers placed at correct barangay locations
✅ **Better response** - Relief workers find locations faster
✅ **User trust** - Users see pins in correct areas
✅ **Free** - No cost with Nominatim
✅ **Reliable** - Fallback system if geocoding fails

## Need Help?

- Check browser console (F12) for geocoding logs
- Verify address format matches: "Barangay, Municipality, Province, Country"
- Test with well-known barangays first (e.g., Poblacion)
