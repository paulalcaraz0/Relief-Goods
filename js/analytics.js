// Analytics dashboard functionality

function toggleAnalytics() {
    const panel = document.getElementById('analyticsPanel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        updateAnalytics();
    }
}

function updateAnalytics() {
    const total = locations.length;
    const served = locations.filter(l => l.status === 'served').length;
    const needs = locations.filter(l => l.status === 'needs').length;
    const totalPeople = locations.reduce((sum, l) => sum + (l.people || 0), 0);
    const critical = locations.filter(l => l.urgency === 'critical' && l.status === 'needs').length;
    const responseRate = total > 0 ? Math.round((served / total) * 100) : 0;

    document.getElementById('totalRequests').textContent = total;
    document.getElementById('totalPeople').textContent = totalPeople;
    document.getElementById('criticalCount').textContent = critical;
    document.getElementById('responseRate').textContent = responseRate + '%';

    const urgencyCounts = {
        critical: locations.filter(l => l.urgency === 'critical' && l.status === 'needs').length,
        high: locations.filter(l => l.urgency === 'high' && l.status === 'needs').length,
        medium: locations.filter(l => l.urgency === 'medium' && l.status === 'needs').length,
        low: locations.filter(l => l.urgency === 'low' && l.status === 'needs').length
    };

    const urgencyList = document.getElementById('urgencyList');
    urgencyList.innerHTML = Object.entries(urgencyCounts).map(([level, count]) => `
        <div class="urgency-item">
            <span class="label">${level.charAt(0).toUpperCase() + level.slice(1)} Priority</span>
            <span class="count">${count}</span>
        </div>
    `).join('');

    const municipalityCounts = {};
    locations.forEach(l => {
        if (l.status === 'needs') {
            municipalityCounts[l.municipality] = (municipalityCounts[l.municipality] || 0) + 1;
        }
    });

    const sortedMunicipalities = Object.entries(municipalityCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const municipalityList = document.getElementById('municipalityList');
    municipalityList.innerHTML = sortedMunicipalities.map(([name, count]) => `
        <div class="municipality-item">
            <span class="name">${name}</span>
            <span class="count">${count} requests</span>
        </div>
    `).join('') || '<div style="color: #64748b; text-align: center; padding: 20px;">No data available</div>';

    const resourceCounts = {};
    locations.filter(l => l.status === 'needs').forEach(l => {
        l.needs.forEach(need => {
            resourceCounts[need] = (resourceCounts[need] || 0) + 1;
        });
    });

    const sortedResources = Object.entries(resourceCounts)
        .sort((a, b) => b[1] - a[1]);

    const resourceList = document.getElementById('resourceList');
    resourceList.innerHTML = sortedResources.map(([resource, count]) => `
        <div class="urgency-item">
            <span class="label">${resource.charAt(0).toUpperCase() + resource.slice(1)}</span>
            <span class="count">${count}</span>
        </div>
    `).join('') || '<div style="color: #64748b; text-align: center; padding: 20px;">No data available</div>';
}

function exportData() {
    showLoading('Generating report...');

    setTimeout(() => {
        const needs = locations.filter(l => l.status === 'needs');
        const served = locations.filter(l => l.status === 'served');

        let csvContent = "Status,Municipality,Barangay,Contact,Contact Name,Needs,People,Urgency,Time,Notes\n";

        [...needs, ...served].forEach(loc => {
            const row = [
                loc.status === 'needs' ? 'NEEDS RELIEF' : 'SERVED',
                loc.municipality,
                loc.barangay,
                loc.contact,
                loc.contactName || 'N/A',
                loc.needs.join(';'),
                loc.people || 'Unknown',
                loc.urgency,
                loc.time,
                (loc.notes || '').replace(/,/g, ';')
            ].map(field => `"${field}"`).join(',');
            csvContent += row + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `KapitBayan_Report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();

        hideLoading();
        showToast('Report exported successfully!', 'success');
    }, 1000);
}
