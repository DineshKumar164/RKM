document.addEventListener('DOMContentLoaded', () => {
    renderPublications();
    setupNavigation();
});

/**
 * Renders the list of publications from the global 'publications' array.
 */
function renderPublications() {
    const listContainer = document.getElementById('publication-list');

    if (!listContainer) return;

    // Clear loading text
    listContainer.innerHTML = '';

    if (typeof publications === 'undefined' || !Array.isArray(publications)) {
        listContainer.innerHTML = '<p>Error loading publications. Please check js/publications.js</p>';
        return;
    }

    publications.forEach(pub => {
        const item = document.createElement('div');
        item.className = 'pub-item';

        let html = `
            <a href="${pub.url}" target="_blank" class="pub-title">${pub.title} <i class='bx bx-link-external' style="font-size: 0.8em;"></i></a>
            <div class="pub-meta">
                <span class="pub-year">${pub.year}</span>
                <span class="pub-venue"> | ${pub.venue}</span>
            </div>
        `;

        if (pub.summary) {
            html += `<p style="margin-top: 0.5rem; font-size: 0.9rem; color: #64748b;">${pub.summary}</p>`;
        }

        item.innerHTML = html;
        listContainer.appendChild(item);
    });
}

/**
 * Smooth scrolling and Active Link highlighting
 */
/**
 * Optimized Navigation Logic
 * - Uses IntersectionObserver for performant scroll highlighting (no scroll lag).
 * - Relies on CSS 'scroll-behavior: smooth' for scrolling (rendering engine handles it).
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section');

    // 1. Highlight active section using IntersectionObserver
    // Triggers when a section takes up >50% of the viewport center
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get ID of the visible section
                const id = entry.target.getAttribute('id');

                // Update navigation state
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px' // Bias slightly towards top-center
    });

    sections.forEach(section => observer.observe(section));
}
