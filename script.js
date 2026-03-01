// Project Data
const projects = [
    {
        id: 4,
        title: "Panopticon",
        image: "Media\\Games\\Panopticon\\panopticonThumbnail.gif",
        imageAlt: "Panopticon",
        description: "BLEND IN BLEND IN BLEND IN",
        memberIds: [5, 4, 3, 2, 1],
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
            { url: "https://orbxorb.itch.io/asphyxiatus", title: "PLAY", icon: "gamepad-2" },
        ]
    },
    {
        id: 2,
        title: "OddJob",
        image: "Media\\Games\\OddJob\\oddJobThumbnail.gif",
        imageAlt: "OddJob",
        description: "Totally Normal Job Simulator",
        memberIds: [4, 2, 1],
        links: [
            { url: "https://orbxorb.itch.io/oddjob", title: "PLAY", icon: "gamepad-2" },
        ]
    },
    {
        id: 1,
        title: "Till Nightfall",
        image: "Media\\Games\\TillNightFall\\tillNightfallThumbnail.png",
        imageAlt: "TillNightfall",
        description: "BLEND IN BLEND IN BLEND IN",
        memberIds: [2, 3, 4, 6],
        links: [
            { url: "https://eneme22.itch.io/tillnightfall", title: "PLAY", icon: "gamepad-2" },
        ]
    }
];

// Function to create a project card HTML
function createProjectCard(project, isClone = false) {
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
        <article class="shrink-0 snap-start project-card border-brutalist p-6 bg-[#080808] group flex flex-col" data-project-id="${project.id}"${isClone ? ' data-clone="true"' : ''}>
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
        const cloneCount = projects.length;
        const prefixClones = projects.slice(-cloneCount).map((project) => createProjectCard(project, true));
        const originalCards = projects.map((project) => createProjectCard(project));
        const suffixClones = projects.slice(0, cloneCount).map((project) => createProjectCard(project, true));

        carousel.innerHTML = [...prefixClones, ...originalCards, ...suffixClones].join('');
        // Re-initialize icons for dynamically added content
        lucide.createIcons();
        initializeInfiniteCarouselPosition();
        updateCarouselControls();
        requestSelectedProjectCardUpdate();
    }
}

// Members Data
const members = [
    {
        id: 1,
        name: "2aphids",
        image: "Media\\Members\\2aphidsPP.jpg",
        imageAlt: "2Aphids",
        bio: "3D Artist<br>FOSS Enthusiast <br>Creative Programmer",
        links: [
            { url: "https://github.com/2aphids", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 2,
        name: "Eneme",
        image: "Media\\Members\\enemePP.png",
        imageAlt: "eneme",
        bio: "Creative Programmer<br>Game Dev",
        links: [
            { url: "https://emilioneme.com", title: "WEBSITE", icon: "globe" },
            { url: "https://github.com/emilioneme", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 3,
        name: "Paincakes",
        image: "Media\\Members\\paincakesPP.jpg",
        imageAlt: "paincakes",
        bio: "Software Dev<br>AI Programming",
        links: [
            { url: "https://github.com/Alastairrd", title: "GITHUB", icon: "github" },
        ]
    },
    {
        id: 4,
        name: "Shtoa",
        image: "Media\\Members\\shtoaPP.jpg",
        imageAlt: "shtoa",
        bio: "Software Dev<br> Creative Technologist",
        links: [
            { url: "https://shtoa.github.io", title: "WEBSITE", icon: "globe" },
            { url: "https://github.com/shtoa", title: "GITHUB", icon: "github" }
        ]
    },
    {
        id: 5,
        name: "Kunggings",
        image: "Media\\Members\\kunggingsPP.jpg",
        imageAlt: "kunggings",
        bio: "Sound Engineering<br>Creative Programmer",
        links: [
            { url: "https://www.georgebiffin.co.uk/", title: "WEBSITE", icon: "globe" },
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
    const primaryMemberLink = member.links?.[0]?.url;

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

    const profileImageHtml = primaryMemberLink
        ? `
            <a href="${primaryMemberLink}" target="_blank" rel="noopener noreferrer" title="${member.name}" aria-label="${member.name}" class="w-30 h-30 rounded-full border border-neutral-800 overflow-hidden mb-4 p-1 group-hover:border-neutral-600 transition-colors block">
                <img src="${member.image}" alt="${member.imageAlt}" class="w-full h-full rounded-full member-avatar object-cover">
            </a>
        `
        : `
            <div class="w-30 h-30 rounded-full border border-neutral-800 overflow-hidden mb-4 p-1 group-hover:border-neutral-600 transition-colors">
                <img src="${member.image}" alt="${member.imageAlt}" class="w-full h-full rounded-full member-avatar object-cover">
            </div>
        `;

    return `
        <div class="flex flex-col items-center text-center group">
            ${profileImageHtml}
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
let isWrappingCarousel = false;

function getCarouselCards() {
    if (!carousel) return [];
    return Array.from(carousel.querySelectorAll('.project-card'));
}

function getOriginalCarouselCards() {
    return getCarouselCards().filter((card) => !card.hasAttribute('data-clone'));
}

function getCenteredScrollLeft(card) {
    if (!carousel || !card) return 0;
    return card.offsetLeft - ((carousel.clientWidth - card.offsetWidth) / 2);
}

function initializeInfiniteCarouselPosition() {
    if (!carousel || projects.length < 2) return;

    const firstOriginalCard = getOriginalCarouselCards()[0];
    if (!firstOriginalCard) return;

    const centeredLeft = getCenteredScrollLeft(firstOriginalCard);
    carousel.scrollLeft = Math.max(0, centeredLeft);
}

function wrapInfiniteCarouselIfNeeded() {
    if (!carousel || projects.length < 2 || isWrappingCarousel) return;

    const cards = getCarouselCards();
    const originalCards = getOriginalCarouselCards();

    if (!cards.length || !originalCards.length) return;

    const firstOriginalCard = originalCards[0];
    const lastOriginalCard = originalCards[originalCards.length - 1];
    const firstPrefixClone = cards.find((card) => card.hasAttribute('data-clone'));

    let firstSuffixClone = null;
    let passedLastOriginal = false;

    for (const card of cards) {
        if (card === lastOriginalCard) {
            passedLastOriginal = true;
            continue;
        }

        if (passedLastOriginal && card.hasAttribute('data-clone')) {
            firstSuffixClone = card;
            break;
        }
    }

    if (!firstOriginalCard || !firstSuffixClone || !firstPrefixClone) return;

    const originalsSpan = firstSuffixClone.offsetLeft - firstOriginalCard.offsetLeft;
    if (originalsSpan <= 0) return;

    const currentLeft = carousel.scrollLeft;
    const leftBoundary = getCenteredScrollLeft(firstOriginalCard);
    const rightBoundary = getCenteredScrollLeft(firstSuffixClone);

    if (currentLeft < leftBoundary - 1) {
        isWrappingCarousel = true;
        carousel.scrollLeft = currentLeft + originalsSpan;
        isWrappingCarousel = false;
        return;
    }

    if (currentLeft >= rightBoundary - 1) {
        isWrappingCarousel = true;
        carousel.scrollLeft = currentLeft - originalsSpan;
        isWrappingCarousel = false;
    }
}

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

function updateSelectedProjectCard() {
    if (!carousel) return;

    const cards = getCarouselCards();
    if (!cards.length) return;

    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + (carouselRect.width / 2);

    const fullyVisibleCards = cards.filter((card) => {
        const cardRect = card.getBoundingClientRect();
        return cardRect.left >= carouselRect.left && cardRect.right <= carouselRect.right;
    });

    const candidateCards = fullyVisibleCards.length ? fullyVisibleCards : cards;

    let selectedCard = candidateCards[0];
    let shortestDistance = Number.POSITIVE_INFINITY;

    candidateCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(cardCenter - carouselCenter);

        if (distance < shortestDistance) {
            shortestDistance = distance;
            selectedCard = card;
        }
    });

    const selectedProjectId = selectedCard.dataset.projectId;

    cards.forEach((card) => {
        card.classList.toggle('project-card-selected', card.dataset.projectId === selectedProjectId);
    });
}

let selectedCardRaf = null;

function requestSelectedProjectCardUpdate() {
    if (selectedCardRaf !== null) return;

    selectedCardRaf = requestAnimationFrame(() => {
        selectedCardRaf = null;
        updateSelectedProjectCard();
    });
}

function getCardCenter(card) {
    const cardRect = card.getBoundingClientRect();
    return cardRect.left + (cardRect.width / 2);
}

function centerCard(card, behavior = 'smooth') {
    if (!carousel || !card) return;

    const targetLeft = getCenteredScrollLeft(card);
    carousel.scrollTo({ left: Math.max(0, targetLeft), behavior });
}

function scrollToClosestCard(direction) {
    if (!carousel) return;

    const allCards = getCarouselCards();
    if (!projects.length || !allCards.length) return;

    const selectedCard = allCards.find((card) => card.classList.contains('project-card-selected')) || allCards[0];
    const currentProjectId = Number(selectedCard.dataset.projectId);
    const selectedIndex = Math.max(0, projects.findIndex((project) => project.id === currentProjectId));
    const directionStep = direction > 0 ? 1 : -1;
    const targetIndex = (selectedIndex + directionStep + projects.length) % projects.length;
    const targetProjectId = String(projects[targetIndex].id);

    const matchingCards = allCards.filter((card) => card.dataset.projectId === targetProjectId);
    if (!matchingCards.length) return;

    const currentScrollLeft = carousel.scrollLeft;

    let bestCard = matchingCards[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    matchingCards.forEach((card) => {
        const cardCenteredLeft = getCenteredScrollLeft(card);
        const distance = Math.abs(cardCenteredLeft - currentScrollLeft);

        if (distance < bestDistance) {
            bestDistance = distance;
            bestCard = card;
        }
    });

    centerCard(bestCard, 'smooth');
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
        const walk = x - startX;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('scroll', () => {
        wrapInfiniteCarouselIfNeeded();
        requestSelectedProjectCardUpdate();
    });
}

// Button Controls
if (leftBtn && carousel) {
    leftBtn.addEventListener('click', () => {
        scrollToClosestCard(-1);
    });
}

if (rightBtn && carousel) {
    rightBtn.addEventListener('click', () => {
        scrollToClosestCard(1);
    });
}

window.addEventListener('resize', updateCarouselControls);
window.addEventListener('load', updateCarouselControls);
window.addEventListener('resize', requestSelectedProjectCardUpdate);
window.addEventListener('load', requestSelectedProjectCardUpdate);

requestSelectedProjectCardUpdate();