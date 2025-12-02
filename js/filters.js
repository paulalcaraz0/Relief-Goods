// Search and filter functionality

let currentStatusFilter = 'all';
let currentUrgencyFilter = 'all';

function filterStatus(status) {
    currentStatusFilter = status;

    // Update UI
    const statusOptions = document.querySelectorAll('.filter-section:nth-child(2) .filter-option');
    statusOptions.forEach(opt => opt.classList.remove('active'));
    event.target.closest('.filter-option').classList.add('active');

    applyCurrentFilters();
}

function filterUrgency(urgency) {
    currentUrgencyFilter = urgency;

    // Update UI
    const urgencyOptions = document.querySelectorAll('.filter-section:nth-child(3) .filter-option');
    urgencyOptions.forEach(opt => opt.classList.remove('active'));
    event.target.closest('.filter-option').classList.add('active');

    applyCurrentFilters();
}

function applyCurrentFilters() {
    // Check if required elements exist
    if (!map || !locations || !markers) return;

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    // Remove all markers from map
    markers.forEach(marker => {
        if (marker && map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    });

    // Apply filters and add markers back
    locations.forEach(loc => {
        if (!loc || !loc.marker) return;

        let showMarker = true;

        // Apply status filter
        if (currentStatusFilter !== 'all' && loc.status !== currentStatusFilter) {
            showMarker = false;
        }

        // Apply urgency filter
        if (currentUrgencyFilter !== 'all' && loc.urgency !== currentUrgencyFilter) {
            showMarker = false;
        }

        // Apply search filter - support full address search
        if (searchTerm) {
            const fullAddress = `${loc.barangay}, ${loc.municipality}${loc.street ? ', ' + loc.street : ''}`.toLowerCase();
            const municipality = loc.municipality.toLowerCase();
            const barangay = loc.barangay.toLowerCase();
            const contactName = (loc.contactName || '').toLowerCase();

            // Check if search matches full address, municipality, barangay, or contact name
            const matchesSearch =
                fullAddress.includes(searchTerm) ||
                municipality.includes(searchTerm) ||
                barangay.includes(searchTerm) ||
                contactName.includes(searchTerm);

            if (!matchesSearch) {
                showMarker = false;
            }
        }

        if (showMarker && loc.marker) {
            loc.marker.addTo(map);
        }
    });
}

function searchLocation() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clearBtn = document.getElementById('clearSearch');

    if (searchTerm) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }

    applyCurrentFilters();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.remove('visible');
    applyCurrentFilters();
}

function resetFilters() {
    currentStatusFilter = 'all';
    currentUrgencyFilter = 'all';
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.remove('visible');

    // Reset UI - remove all active classes
    document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));

    // Find and activate the first "All" options in each filter section
    const filterSections = document.querySelectorAll('.filter-section');
    // Status section (second filter section - index 1)
    const statusSection = filterSections[1];
    if (statusSection) {
        const firstOption = statusSection.querySelector('.filter-option');
        if (firstOption) firstOption.classList.add('active');
    }

    // Urgency section (third filter section - index 2)
    const urgencySection = filterSections[2];
    if (urgencySection) {
        const firstOption = urgencySection.querySelector('.filter-option');
        if (firstOption) firstOption.classList.add('active');
    }

    applyCurrentFilters();
    showToast('Filters reset', 'success');
}
