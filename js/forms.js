// Form handling and submission

// Geocoding function to get accurate coordinates
async function geocodeAddress(barangay, municipality) {
    try {
        // Build the full address for better accuracy
        const fullAddress = `${barangay}, ${municipality}, Batangas, Philippines`;

        // Use Nominatim (OpenStreetMap) geocoding API - FREE, no API key needed
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(fullAddress)}&` +
            `format=json&` +
            `limit=1&` +
            `countrycodes=ph`;

        console.log('Geocoding address:', fullAddress);

        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'KapitBayan-Relief-Map' // Required by Nominatim
            }
        });

        if (!response.ok) {
            throw new Error('Geocoding failed');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            console.log('Geocoded coordinates:', lat, lng);
            return { lat, lng, success: true };
        } else {
            console.warn('No results from geocoding');
            return { success: false };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return { success: false };
    }
}

// Populate barangay dropdown when municipality is selected
document.addEventListener('DOMContentLoaded', function() {
    const municipalitySelect = document.getElementById('municipality');
    const barangaySelect = document.getElementById('barangay');

    if (municipalitySelect && barangaySelect) {
        municipalitySelect.addEventListener('change', function() {
            const selectedMunicipality = this.value;

            // Clear and reset barangay dropdown
            barangaySelect.innerHTML = '<option value="">Select your barangay</option>';

            if (selectedMunicipality && typeof barangayData !== 'undefined' && barangayData[selectedMunicipality]) {
                // Enable barangay dropdown
                barangaySelect.disabled = false;

                // Populate with barangays
                const barangays = barangayData[selectedMunicipality];
                barangays.forEach(function(barangay) {
                    const option = document.createElement('option');
                    option.value = barangay;
                    option.textContent = barangay;
                    barangaySelect.appendChild(option);
                });
            } else {
                // Disable if no municipality selected
                barangaySelect.disabled = true;
                barangaySelect.innerHTML = '<option value="">Select municipality first</option>';
            }

            updateProgress();
        });
    }
});

function toggleNeed(element, id) {
    const checkbox = document.getElementById(id);
    checkbox.checked = !checkbox.checked;
    element.classList.toggle('selected', checkbox.checked);
    updateProgress();
}

function selectUrgency(button, level) {
    document.querySelectorAll('.urgency-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('urgency').value = level;
    updateProgress();
}

function updateProgress() {
    const municipality = document.getElementById('municipality').value;
    const barangay = document.getElementById('barangay').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const needs = document.querySelectorAll('input[name="needs"]:checked').length;

    const progress = [municipality, barangay, contact, needs > 0];
    const dots = document.querySelectorAll('.progress-dot');

    progress.forEach((filled, index) => {
        if (filled) {
            dots[index].classList.add('active');
        } else {
            dots[index].classList.remove('active');
        }
    });
}

function resetProgress() {
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        if (index === 0) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function submitRequest(event) {
    event.preventDefault();

    const municipality = document.getElementById('municipality').value;
    const barangay = document.getElementById('barangay').value;
    const contact = document.getElementById('contact').value.trim();
    const contactName = document.getElementById('contactName').value.trim();
    const checkboxes = document.querySelectorAll('input[name="needs"]:checked');
    const needs = Array.from(checkboxes).map(cb => cb.value);
    const urgency = document.getElementById('urgency').value;

    if (!municipality) {
        showError('Please select your municipality/city.');
        return;
    }

    if (!barangay) {
        showError('Please select your barangay.');
        return;
    }

    if (!contact) {
        showError('Please enter your contact number.');
        return;
    }

    if (needs.length === 0) {
        showError('Please select at least one need.');
        return;
    }

    const street = document.getElementById('street').value.trim();
    const peopleCount = document.getElementById('peopleCount').value;
    const notes = document.getElementById('notes').value;

    showLoading('Finding exact location...');

    // Try to geocode the address for accurate coordinates
    const geocodeResult = await geocodeAddress(barangay, municipality);

    let lat, lng;

    if (geocodeResult.success) {
        // Use geocoded coordinates (accurate!)
        lat = geocodeResult.lat;
        lng = geocodeResult.lng;
        console.log('Using geocoded coordinates for accurate pinning');
    } else {
        // Fallback to municipality center with small offset if geocoding fails
        console.warn('Geocoding failed, using municipality center as fallback');
        const coords = municipalityCoordinates[municipality] || [13.7565, 121.0583];
        lat = coords[0] + (Math.random() - 0.5) * 0.008;
        lng = coords[1] + (Math.random() - 0.5) * 0.008;
    }

    createLocation(lat, lng, municipality, barangay, street, contact, contactName, needs, peopleCount, notes, urgency);
}

function createLocation(lat, lng, municipality, barangay, street, contact, contactName, needs, peopleCount, notes, urgency) {
    const newLocation = {
        lat: lat,
        lng: lng,
        municipality: municipality,
        barangay: barangay,
        street: street,
        contact: contact,
        contactName: contactName,
        needs: needs,
        people: parseInt(peopleCount) || null,
        status: 'needs',
        urgency: urgency,
        time: new Date().toISOString(),
        timestamp: Date.now(),
        notes: notes
    };

    // Save to Firebase
    if (typeof locationsRef !== 'undefined') {
        const newLocationRef = locationsRef.push();
        newLocationRef.set(newLocation)
            .then(() => {
                console.log('Location saved to Firebase:', newLocationRef.key);
                hideLoading();
                closeModal();
                showToast('Your request has been submitted successfully!', 'success');

                // The map will update automatically through Firebase listener
                map.setView([lat, lng], 14);
            })
            .catch((error) => {
                console.error('Error saving to Firebase:', error);
                hideLoading();
                showToast('Error submitting request. Please try again.', 'error');
            });
    } else {
        // Fallback if Firebase is not configured
        console.warn('Firebase not configured, using local storage only');
        addMarker(newLocation);
        locations.push(newLocation);
        updateStats();

        hideLoading();
        closeModal();
        showToast('Your request has been submitted successfully!', 'success');

        map.setView([lat, lng], 14);

        setTimeout(() => {
            const newIndex = locations.length - 1;
            showDetailsPanel(newIndex);
        }, 500);
    }
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const contactInput = document.getElementById('contact');
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            e.target.value = value;
        });
    }
});
