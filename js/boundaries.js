// Municipality boundaries and interaction

let municipalityLayer = null;
let selectedMunicipality = null;

// Simplified municipality boundaries for Batangas (you'll need actual GeoJSON data)
// This is a placeholder - you should replace with actual boundary coordinates
const municipalityBoundaries = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Batangas City",
                "population": "351,437",
                "area": "282.5 km²"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [121.03, 13.73],
                    [121.08, 13.73],
                    [121.08, 13.78],
                    [121.03, 13.78],
                    [121.03, 13.73]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Lipa City",
                "population": "372,931",
                "area": "209.4 km²"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [121.14, 13.92],
                    [121.19, 13.92],
                    [121.19, 13.97],
                    [121.14, 13.97],
                    [121.14, 13.92]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Tanauan City",
                "population": "193,936",
                "area": "166.4 km²"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [121.13, 14.04],
                    [121.18, 14.04],
                    [121.18, 14.09],
                    [121.13, 14.09],
                    [121.13, 14.04]
                ]]
            }
        }
    ]
};

// Default styling for municipality boundaries
function getDefaultStyle() {
    return {
        color: '#3b82f6',
        weight: 2,
        opacity: 0.4,
        fillColor: 'transparent',
        fillOpacity: 0
    };
}

// Highlighted styling
function getHighlightStyle() {
    return {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.8,
        fillColor: '#3b82f6',
        fillOpacity: 0.15,
        className: 'municipality-highlight'
    };
}

// Initialize municipality boundaries on map
function initMunicipalityBoundaries(map) {
    // Add CSS for glowing effect
    if (!document.getElementById('boundary-styles')) {
        const style = document.createElement('style');
        style.id = 'boundary-styles';
        style.textContent = `
            .municipality-highlight {
                filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))
                        drop-shadow(0 0 12px rgba(59, 130, 246, 0.4));
            }

            .leaflet-interactive {
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    // Create GeoJSON layer
    municipalityLayer = L.geoJSON(municipalityBoundaries, {
        style: getDefaultStyle,
        onEachFeature: function(feature, layer) {
            // Add hover effect
            layer.on('mouseover', function(e) {
                if (selectedMunicipality !== layer) {
                    layer.setStyle({
                        weight: 2,
                        opacity: 0.6
                    });
                }
            });

            layer.on('mouseout', function(e) {
                if (selectedMunicipality !== layer) {
                    layer.setStyle(getDefaultStyle());
                }
            });

            // Add click handler
            layer.on('click', function(e) {
                selectMunicipality(layer, feature);
                L.DomEvent.stopPropagation(e);
            });
        }
    }).addTo(map);
}

// Select and highlight a municipality
function selectMunicipality(layer, feature) {
    // Reset previous selection
    if (selectedMunicipality) {
        selectedMunicipality.setStyle(getDefaultStyle());
    }

    // Highlight new selection
    selectedMunicipality = layer;
    layer.setStyle(getHighlightStyle());

    // Show municipality info in details panel
    showMunicipalityInfo(feature);

    // Zoom to municipality
    map.fitBounds(layer.getBounds(), {
        padding: [50, 50],
        maxZoom: 13
    });
}

// Show municipality information
function showMunicipalityInfo(feature) {
    const panel = document.getElementById('detailsPanel');
    if (!panel) return;

    const props = feature.properties;

    // Get statistics for this municipality
    const municipalityRequests = locations.filter(loc =>
        loc.municipality === props.name
    );
    const needsCount = municipalityRequests.filter(l => l.status === 'needs').length;
    const servedCount = municipalityRequests.filter(l => l.status === 'served').length;
    const totalPeople = municipalityRequests.reduce((sum, l) => sum + (l.people || 0), 0);

    panel.innerHTML = `
        <div class="details-header">
            <div class="details-title">
                <div class="icon">📍</div>
                <div class="text">
                    <h3>${props.name}</h3>
                    <span class="details-badge medium">Municipality</span>
                </div>
            </div>
            <button class="details-close" onclick="closeMunicipalityInfo()">✕</button>
        </div>

        <div class="details-section">
            <div class="details-section-title">Municipality Information</div>
            <div class="details-info-box">
                <div class="details-info-item">
                    <div class="icon">👥</div>
                    <div class="content">
                        <div class="label">Population</div>
                        <div class="value highlight">${props.population || 'N/A'}</div>
                    </div>
                </div>

                <div class="details-info-item">
                    <div class="icon">📏</div>
                    <div class="content">
                        <div class="label">Area</div>
                        <div class="value highlight">${props.area || 'N/A'}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="details-section">
            <div class="details-section-title">Relief Statistics</div>
            <div class="stat-grid">
                <div class="stat-box">
                    <span class="stat-value" style="color: #ef4444;">${needsCount}</span>
                    <span class="stat-label">Needs Help</span>
                </div>
                <div class="stat-box">
                    <span class="stat-value" style="color: #10b981;">${servedCount}</span>
                    <span class="stat-label">Assisted</span>
                </div>
                <div class="stat-box">
                    <span class="stat-value" style="color: #3b82f6;">${municipalityRequests.length}</span>
                    <span class="stat-label">Total Requests</span>
                </div>
                <div class="stat-box">
                    <span class="stat-value" style="color: #3b82f6;">${totalPeople}</span>
                    <span class="stat-label">People Affected</span>
                </div>
            </div>
        </div>

        ${municipalityRequests.length > 0 ? `
            <div class="details-section">
                <div class="details-section-title">Recent Requests</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${municipalityRequests.slice(0, 3).map(loc => `
                        <div style="background: rgba(59,130,246,0.05); padding: 10px; border-radius: 8px; border-left: 2px solid ${loc.status === 'needs' ? '#ef4444' : '#10b981'}; cursor: pointer;" onclick="showLocationFromMunicipality('${loc.barangay}', '${loc.municipality}')">
                            <div style="font-size: 12px; color: #3b82f6; font-weight: 600;">${loc.barangay}</div>
                            <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${loc.needs.join(', ')} • ${loc.people || '?'} people</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;

    panel.classList.add('active');
}

// Close municipality info
window.closeMunicipalityInfo = function() {
    if (selectedMunicipality) {
        selectedMunicipality.setStyle(getDefaultStyle());
        selectedMunicipality = null;
    }
    closeDetailsPanel();
};

// Show specific location from municipality view
window.showLocationFromMunicipality = function(barangay, municipality) {
    const index = locations.findIndex(loc =>
        loc.barangay === barangay && loc.municipality === municipality
    );
    if (index !== -1) {
        showDetailsPanel(index);
        // Zoom to location
        const loc = locations[index];
        map.setView([loc.lat, loc.lng], 15);
    }
};

// Export functions
window.initMunicipalityBoundaries = initMunicipalityBoundaries;
window.selectMunicipality = selectMunicipality;
