// UI interactions - modals, toasts, loading, keyboard shortcuts, tutorial

// Tutorial overlay functions
function closeTutorial() {
    document.getElementById('tutorialOverlay').classList.remove('active');
}

// Show tutorial on first visit
if (!localStorage.getItem('tutorialShown')) {
    window.addEventListener('DOMContentLoaded', function() {
        document.getElementById('tutorialOverlay').classList.add('active');
        localStorage.setItem('tutorialShown', 'true');
    });
}

// Modal functions
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('map').classList.add('dimmed');
    document.getElementById('errorContainer').innerHTML = '';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('map').classList.remove('dimmed');
    document.getElementById('reliefForm').reset();
    document.getElementById('errorContainer').innerHTML = '';
    document.querySelectorAll('.need-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.urgency-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.urgency-btn')[2].classList.add('selected');
    resetProgress();
}

// Click outside modal to close
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? '✅' : '⚠️';
    toast.className = `toast ${type}`;
    toast.querySelector('.toast-icon').textContent = icon;
    toast.querySelector('div > div:first-child').textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// Loading indicator
function showLoading(text = 'Processing...') {
    const loading = document.getElementById('loadingIndicator');
    loading.querySelector('.loading-text').textContent = text;
    loading.classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingIndicator').classList.remove('active');
}

// Reset view checkbox toggle handler
function handleResetViewToggle(checkbox) {
    if (checkbox.checked) {
        resetView();
        // Uncheck after reset
        setTimeout(() => {
            checkbox.checked = false;
        }, 500);
    }
}

// Keyboard shortcuts - Only Escape key, others disabled to prevent accidental triggers
document.addEventListener('keydown', function(e) {
    // Only allow Escape key for closing modals and panels
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById('analyticsPanel').classList.remove('open');
        if (typeof closeDetailsPanel === 'function') {
            closeDetailsPanel();
        }
    }

    // All letter key shortcuts disabled to prevent accidental triggers while typing
    // Users should use the UI buttons instead
});
