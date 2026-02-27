// Project Data
const projects = [
    {
        id: 4,
        title: "Panopticon",
        image: "Media\\Games\\Panopticon\\panopticonThumbnail.gif",
        imageAlt: "Panopticon",
        description: "BLEND IN BLEND IN BLEND IN",
        memberIds: [1, 2, 3, 4, 5],
        links: [
            { url: "https://eneme22.itch.io/panopticon", title: "PLAY", icon: "gamepad-2" },
        ]
    },
    {
        id: 3,
        title: "Asphyxiatus",
        image: "Media\\Games\\Asphyxiatus\\asphyxiatusThumbnail.gif",
        imageAlt: "Asphyxiatus",
        description: "GET IN GET THE EGGS GET OUT",
        memberIds: [1, 2, 3, 4, 5, 6],
        links: [
            { url: "https://eneme22.itch.io/asphyxiatus", title: "PLAY", icon: "gamepad-2" },
        ]
    },
    {
        id: 2,
        title: "OddJob",
        image: "Media\\Games\\OddJob\\oddjobThumbnail.gif",
        imageAlt: "OddJob",
        description: "Totally Normal Job Simulator",
        memberIds: [1, 2, 4],
        links: [
            { url: "https://orbxorb.itch.io/oddjob", title: "PLAY", icon: "gamepad-2" },
        ]
    },
    {
        id: 1,
        title: "Till Nightfall",
        image: "Media\\Games\\TillNightfall\\tillnightfallThumbnail.png",
        imageAlt: "TillNightfall",
        description: "BLEND IN BLEND IN BLEND IN",
        memberIds: [2, 3, 4, 6],
        links: [
            { url: "https://eneme22.itch.io/tillnightfall", title: "PLAY", icon: "gamepad-2" },
        ]
    }
];

// Function to create a project card HTML
function createProjectCard(project) {
    const primaryProjectLink = project.links?.[0]?.url;
    const projectLinkCount = project.links.length;
    const linkSizeClass = projectLinkCount <= 1
        ? 'text-base'
        : projectLinkCount === 2
            ? 'text-sm'
            : 'text-xs';
    const iconSizeClass = projectLinkCount <= 1
        ? 'w-4 h-4'
        : projectLinkCount === 2
            ? 'w-3.5 h-3.5'
            : 'w-3 h-3';

    // Generate links HTML dynamically
    const linksHtml = project.links.map((link, index) => {
        // Alternate colors for visual hierarchy: first link is brighter
        const colorClass = index === 0 ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-gray-300';
        return `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${colorClass} ${linkSizeClass} flex items-center gap-1.5 transition-colors">
                <i data-lucide="${link.icon}" class="${iconSizeClass}"></i>
                ${link.title}
            </a>
        `;
    }).join('');

    const projectMembers = (project.memberIds || [])
        .map((memberId) => members.find((member) => member.id === memberId))
        .filter(Boolean);

    const projectMembersHtml = projectMembers.map((member) => {
        const primaryLink = member.links?.[0]?.url;
        if (!primaryLink) return '';

        return `
            <a href="${primaryLink}" target="_blank" rel="noopener noreferrer" title="${member.name}" aria-label="${member.name}" class="w-7 h-7 rounded-full border border-neutral-700 overflow-hidden hover:border-neutral-500 transition-colors">
                <img src="${member.image}" alt="${member.imageAlt}" class="w-full h-full object-cover member-avatar">
            </a>
        `;
    }).join('');

    const thumbnailHtml = primaryProjectLink
        ? `
            <a href="${primaryProjectLink}" target="_blank" rel="noopener noreferrer" class="aspect-video mb-6 overflow-hidden border border-neutral-800 block">
                <img src="${project.image}" alt="${project.imageAlt}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
            </a>
        `
        : `
            <div class="aspect-video mb-6 overflow-hidden border border-neutral-800">
                <img src="${project.image}" alt="${project.imageAlt}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
            </div>
        `;

    return `
        <article class="project-card border-brutalist p-6 bg-[#080808] group flex flex-col">
            ${thumbnailHtml}
            <h2 class="text-lg mb-2 font-bold tracking-tight">${project.title}</h2>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed h-16">
                ${project.description}
            </p>
            <div class="mt-4 pt-3 border-t border-neutral-900">
                <p class="text-[10px] text-gray-600 tracking-[0.15em] mb-2">MEMBERS</p>
                <div class="flex items-center gap-2">
                    ${projectMembersHtml}
                </div>
            </div>
            <footer class="mt-4 pt-3 border-t border-neutral-900">
                <div class="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    ${linksHtml}
                </div>
            </footer>
        </article>
    `;
}

// Function to render all projects
function renderProjects() {
    const carousel = document.getElementById('projectCarousel');
    if (carousel) {
        carousel.innerHTML = projects.map(project => createProjectCard(project)).join('');
        // Re-initialize icons for dynamically added content
        lucide.createIcons();
        updateCarouselControls();
    }
}

// Members Data
const members = [
    {
        id: 1,
        name: "2Aphids",
        image: "Media\\Members\\2aphidsPP.jpg",
        imageAlt: "2Aphids",
        bio: "3D Artist<br>Godot Lover",
        links: [
            { url: "https://github.com/2aphids", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 2,
        name: "eneme",
        image: "Media\\Members\\enemePP.png",
        imageAlt: "eneme",
        bio: "Game Programmer<br>Creative Coder<br>Unity Lover",
        links: [
            { url: "https://emilioneme.com", title: "WEBSITE", icon: "globe" },
            { url: "https://github.com/emilioneme", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 3,
        name: "paincakes",
        image: "Media\\Members\\paincakesPP.jpg",
        imageAlt: "paincakes",
        bio: "Software Dev<br>AI Programming",
        links: [
            { url: "https://github.com/Alastairrd", title: "GITHUB", icon: "github" },
        ]
    },
    {
        id: 4,
        name: "shtoa",
        image: "Media\\Members\\shtoaPP.jpg",
        imageAlt: "shtoa",
        bio: "Digital Artist.<br>Environmental Artist.",
        links: [
            { url: "https://github.com/shtoa", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 5,
        name: "kunggings",
        image: "Media\\Members\\kunggingsPP.jpg",
        imageAlt: "kunggings",
        bio: "Game Designer<br>Sound Engineering",
        links: [
            { url: "https://github.com/kunggings", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 6,
        name: "Flamberg",
        image: "Media\\Members\\flambergPP.jpg",
        imageAlt: "Flamberg",
        bio: "Tool development<br>Narrative Designer",
        links: [
            { url: "https://github.com/Flamberger", title: "GITHUB", icon: "github" }
        ]
    }
];

// Function to create a member card HTML
function createMemberCard(member) {
    // Generate links HTML dynamically
    const linksHtml = member.links.map((link, index) => {
        // Alternate colors for visual hierarchy: first link is brighter
        const colorClass = index === 0 ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-gray-300';
        return `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${colorClass} flex items-center gap-1 transition-colors text-[10px] underline decoration-neutral-800 underline-offset-4">
                <i data-lucide="${link.icon}" class="w-3 h-3"></i>
                ${link.title}
            </a>
        `;
    }).join('');

    return `
        <div class="flex flex-col items-center text-center group">
            <div class="w-30 h-30 rounded-full border border-neutral-800 overflow-hidden mb-4 p-1 group-hover:border-neutral-600 transition-colors">
                <img src="${member.image}" alt="${member.imageAlt}" class="w-full h-full rounded-full member-avatar object-cover">
            </div>
            <h3 class="text-sm font-bold mb-1 tracking-tight">${member.name}</h3>
            <p class="text-[10px] text-gray-600 mb-3 leading-tight">${member.bio}</p>
            <div class="flex flex-col items-center gap-1">
                ${linksHtml}
            </div>
        </div>
    `;
}

// Function to render all members
function renderMembers() {
    const grid = document.getElementById('membersGrid');
    if (grid) {
        grid.innerHTML = members.map(member => createMemberCard(member)).join('');
        // Re-initialize icons for dynamically added content
        lucide.createIcons();
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderMembers();
});

// Initialize Lucide icons for static content
lucide.createIcons();

// Carousel Drag Functionality
const carousel = document.getElementById('projectCarousel');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');
const carouselIndicators = document.getElementById('carouselIndicators');
const carouselControls = document.getElementById('carouselControls');

function updateCarouselControls() {
    if (!carousel) return;
    const hasOverflow = carousel.scrollWidth > carousel.clientWidth + 1;
    if (carouselIndicators) {
        carouselIndicators.classList.toggle('hidden', !hasOverflow);
    }
    if (carouselControls) {
        carouselControls.classList.toggle('hidden', !hasOverflow);
    }
}

let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
    // Mouse Events for Drag
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch Support
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Button Controls
if (leftBtn && carousel) {
    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -420, behavior: 'smooth' });
    });
}

if (rightBtn && carousel) {
    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 420, behavior: 'smooth' });
    });
}

window.addEventListener('resize', updateCarouselControls);
window.addEventListener('load', updateCarouselControls);