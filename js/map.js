// Map initialization and marker management

let map;
let locations = [];
let markers = [];
let selectedLocationIndex = null;

// Initialize the map
function initMap() {
    map = L.map('map', {
        zoomControl: false
    }).setView([13.8, 121.0], 10.5);

    window.mapInstance = map;

    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);

    // Standard OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 10
    }).addTo(map);

    // Tight bounds focusing only on Batangas province
    const batangasBounds = L.latLngBounds(
        L.latLng(13.45, 120.55),  // Southwest corner
        L.latLng(14.25, 121.55)   // Northeast corner
    );

    // Set strict bounds - users cannot pan outside Batangas
    map.setMaxBounds(batangasBounds);

    // Fit the view to Batangas with padding
    map.fitBounds(batangasBounds, {
        padding: [20, 20],
        maxZoom: 11
    });

    // Prevent panning outside bounds
    map.on('drag', function() {
        map.panInsideBounds(batangasBounds, { animate: false });
    });

    // Load locations from Firebase or use sample data
    if (typeof locationsRef !== 'undefined') {
        console.log('Loading locations from Firebase...');
        initializeFirebaseListeners();
    } else {
        console.log('Firebase not configured, using sample data');
        // Load sample locations as fallback
        sampleLocations.forEach(loc => {
            locations.push(loc);
            addMarker(loc);
        });
    }

    window.locationsData = locations;
    window.markersData = markers;

    updateStats();

    // Initial map size
    setTimeout(function() {
        map.invalidateSize();
    }, 200);
}

// Create marker icon based on status and urgency
function createMarkerIcon(status, urgency = 'high') {
    let backgroundColor;

    if (status === 'served') {
        backgroundColor = '#10b981'; // Green for assisted
    } else {
        // Color based on urgency level for "needs" status
        switch(urgency) {
            case 'critical':
                backgroundColor = '#ef4444'; // Red
                break;
            case 'high':
                backgroundColor = '#f97316'; // Orange
                break;
            case 'medium':
                backgroundColor = '#eab308'; // Yellow
                break;
            case 'low':
                backgroundColor = '#3b82f6'; // Blue
                break;
            default:
                backgroundColor = '#f97316'; // Orange (default)
        }
    }

    const emoji = status === 'needs' ? '🚨' : '✅';
    const pulse = status === 'needs' && urgency === 'critical' ? 'animation: pulse 2s infinite;' : '';

    return L.divIcon({
        html: `<div style="
            background: ${backgroundColor};
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            ${pulse}
            cursor: pointer;
        ">${emoji}</div>
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        </style>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        className: 'custom-marker'
    });
}

// Add a marker to the map
function addMarker(location) {
    const icon = createMarkerIcon(location.status, location.urgency);
    const marker = L.marker([location.lat, location.lng], { icon: icon }).addTo(map);

    // Add click handler to show details panel
    marker.on('click', function() {
        const locationIndex = locations.indexOf(location);
        if (locationIndex !== -1) {
            showDetailsPanel(locationIndex);
        }
    });

    location.marker = marker;
    markers.push(marker);
}

// Show details panel
function showDetailsPanel(index) {
    selectedLocationIndex = index;
    const location = locations[index];
    if (!location) {
        console.error('Location not found at index:', index);
        return;
    }

    const panel = document.getElementById('detailsPanel');
    if (!panel) {
        console.error('Details panel element not found');
        return;
    }
    const fullAddress = `${location.barangay}, ${location.municipality}${location.street ? ', ' + location.street : ''}`;

    const needsHtml = location.needs.map(need =>
        `<span class="details-need-tag">${need}</span>`
    ).join('');

    const notesHtml = location.notes ? `
        <div class="details-section">
            <div class="details-notes">
                <div class="label">📝 Notes</div>
                <div class="text">"${location.notes}"</div>
            </div>
        </div>
    ` : '';

    const actionButton = location.status === 'needs' ? `
        <div class="details-action">
            <button onclick="markAsServedFromPanel(${index})">
                ✓ Mark as Assisted
            </button>
        </div>
    ` : '';

    panel.innerHTML = `
        <div class="details-header">
            <div class="details-title">
                <div class="icon">${location.status === 'needs' ? '🚨' : '✅'}</div>
                <div class="text">
                    <h3>${location.status === 'needs' ? 'Needs Relief' : 'Relief Received'}</h3>
                    <span class="details-badge ${location.urgency}">${location.urgency} Priority</span>
                </div>
            </div>
            <button class="details-close" onclick="closeDetailsPanel()">✕</button>
        </div>

        <div class="details-section">
            <div class="details-section-title">Relief Needs</div>
            <div class="details-needs">
                ${needsHtml}
            </div>
        </div>

        <div class="details-section">
            <div class="details-section-title">Location & Contact</div>
            <div class="details-info-box">
                <div class="details-info-item">
                    <div class="icon">📍</div>
                    <div class="content">
                        <div class="label">Location</div>
                        <div class="value">${fullAddress}</div>
                    </div>
                </div>

                <div class="details-info-item">
                    <div class="icon">👤</div>
                    <div class="content">
                        <div class="label">Contact Person</div>
                        <div class="value">${location.contactName || 'Not provided'}</div>
                        <div class="value highlight">📞 ${location.contact}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="details-section">
            <div class="details-meta">
                <div>
                    👥 <strong>${location.people || '?'}</strong> people
                </div>
                <div>
                    🕐 ${location.time}
                </div>
            </div>
        </div>

        ${notesHtml}
        ${actionButton}
    `;

    panel.classList.add('active');
}

// Close details panel
function closeDetailsPanel() {
    const panel = document.getElementById('detailsPanel');
    panel.classList.remove('active');
    selectedLocationIndex = null;
}

// Mark location as served from panel
window.markAsServedFromPanel = function(index) {
    const location = locations[index];
    if (!location || location.status === 'served') return;

    showLoading('Updating status...');

    // Update status in Firebase if connected
    if (typeof locationsRef !== 'undefined' && location.firebaseId) {
        locationsRef.child(location.firebaseId).update({ status: 'served' })
            .then(() => {
                // Firebase listener will handle the UI update automatically
                hideLoading();
                showToast('Location marked as assisted!', 'success');
                console.log('Status updated in Firebase');
            })
            .catch((error) => {
                console.error('Error updating status in Firebase:', error);
                hideLoading();
                showToast('Error updating status. Please try again.', 'error');
            });
    } else {
        // Fallback for local-only operation
        setTimeout(() => {
            // Update status
            location.status = 'served';

            // Remove old marker
            if (location.marker && map.hasLayer(location.marker)) {
                map.removeLayer(location.marker);
                const markerIndex = markers.indexOf(location.marker);
                if (markerIndex > -1) {
                    markers.splice(markerIndex, 1);
                }
            }

            // Create new marker with updated status
            const icon = createMarkerIcon(location.status, location.urgency);
            const marker = L.marker([location.lat, location.lng], { icon: icon }).addTo(map);

            // Add click handler
            marker.on('click', function() {
                showDetailsPanel(index);
            });

            location.marker = marker;
            markers.push(marker);

            // Update stats
            updateStats();

            // Refresh the details panel
            showDetailsPanel(index);

            hideLoading();
            showToast('Location marked as assisted!', 'success');
        }, 500);
    }
};

// Legacy function for backwards compatibility
window.markAsServed = window.markAsServedFromPanel;

// Update statistics
function updateStats() {
    const needs = locations.filter(l => l.status === 'needs').length;
    const served = locations.filter(l => l.status === 'served').length;

    const needsEl = document.getElementById('needsCount');
    const servedEl = document.getElementById('servedCount');

    if (needsEl) needsEl.textContent = needs;
    if (servedEl) servedEl.textContent = served;
}

// Initialize Firebase real-time listeners
function initializeFirebaseListeners() {
    // Listen for new locations added
    locationsRef.on('child_added', function(snapshot) {
        const locationData = snapshot.val();
        const locationId = snapshot.key;

        // Check if location already exists (to avoid duplicates)
        const existingLocation = locations.find(loc => loc.firebaseId === locationId);
        if (existingLocation) {
            return;
        }

        // Add Firebase ID to the location
        locationData.firebaseId = locationId;

        // Format time for display
        if (locationData.timestamp) {
            locationData.time = formatTimeAgo(locationData.timestamp);
        } else if (locationData.time && typeof locationData.time === 'string') {
            // Keep the time as is if it's already formatted
        } else {
            locationData.time = 'Unknown';
        }

        // Add to locations array and create marker
        locations.push(locationData);
        addMarker(locationData);
        updateStats();

        console.log('New location added from Firebase:', locationId);
    });

    // Listen for location updates (e.g., status changes)
    locationsRef.on('child_changed', function(snapshot) {
        const updatedData = snapshot.val();
        const locationId = snapshot.key;

        // Find the location in the array
        const locationIndex = locations.findIndex(loc => loc.firebaseId === locationId);
        if (locationIndex === -1) return;

        const location = locations[locationIndex];

        // Remove old marker
        if (location.marker && map.hasLayer(location.marker)) {
            map.removeLayer(location.marker);
            const markerIndex = markers.indexOf(location.marker);
            if (markerIndex > -1) {
                markers.splice(markerIndex, 1);
            }
        }

        // Update location data
        Object.assign(location, updatedData);
        location.firebaseId = locationId;

        // Create new marker with updated data
        addMarker(location);
        updateStats();

        console.log('Location updated from Firebase:', locationId);
    });

    // Listen for location deletions
    locationsRef.on('child_removed', function(snapshot) {
        const locationId = snapshot.key;

        // Find and remove the location
        const locationIndex = locations.findIndex(loc => loc.firebaseId === locationId);
        if (locationIndex === -1) return;

        const location = locations[locationIndex];

        // Remove marker from map
        if (location.marker && map.hasLayer(location.marker)) {
            map.removeLayer(location.marker);
            const markerIndex = markers.indexOf(location.marker);
            if (markerIndex > -1) {
                markers.splice(markerIndex, 1);
            }
        }

        // Remove from locations array
        locations.splice(locationIndex, 1);
        updateStats();

        console.log('Location removed from Firebase:', locationId);
    });
}

// Format timestamp to human-readable time ago
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

// Reset map view
function resetView() {
    const batangasBounds = L.latLngBounds(
        L.latLng(13.45, 120.55),
        L.latLng(14.25, 121.55)
    );
    map.fitBounds(batangasBounds, {
        padding: [20, 20],
        maxZoom: 11
    });
    closeDetailsPanel();

    // Reset filters without calling resetFilters to avoid recursion
    currentStatusFilter = 'all';
    currentUrgencyFilter = 'all';
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.remove('visible');

    // Reset UI
    document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));

    const filterSections = document.querySelectorAll('.filter-section');
    if (filterSections[1]) {
        const firstOption = filterSections[1].querySelector('.filter-option');
        if (firstOption) firstOption.classList.add('active');
    }
    if (filterSections[2]) {
        const firstOption = filterSections[2].querySelector('.filter-option');
        if (firstOption) firstOption.classList.add('active');
    }

    applyCurrentFilters();
}

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        map.invalidateSize();
    }, 100);
});

// Export function for use in other files
window.closeDetailsPanel = closeDetailsPanel;
window.showDetailsPanel = showDetailsPanel;
