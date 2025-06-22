// Global Variables
let map;
let charts = {};
let animationObserver;

// City Data
const citiesData = {
    neom: {
        name: "نيوم",
        coordinates: [28.2, 34.4],
        description: "مدينة المستقبل الذكية على ساحل البحر الأحمر، تمتد على مساحة 26,500 كيلومتر مربع",
        investment: 500,
        population: 1000000,
        progress: 35,
        technologies: ["الذكاء الاصطناعي", "الطاقة المتجددة", "الروبوتات", "إنترنت الأشياء"],
        features: {
            "الطاقة المتجددة": "100%",
            "المساحة": "26,500 كم²",
            "الاستثمار": "500 مليار دولار",
            "السكان المتوقع": "1 مليون نسمة"
        },
        sustainability: {
            carbonNeutral: 100,
            renewableEnergy: 100,
            greenSpaces: 95,
            waterEfficiency: 90
        }
    },
    theline: {
        name: "ذا لاين",
        coordinates: [28.0, 34.2],
        description: "مدينة خطية ثورية بطول 170 كيلومتر وارتفاع 500 متر، بدون سيارات أو شوارع",
        investment: 200,
        population: 9000000,
        progress: 25,
        technologies: ["المدن الذكية", "النقل المستدام", "البناء الذكي", "الطاقة النظيفة"],
        features: {
            "الطول": "170 كيلومتر",
            "الارتفاع": "500 متر",
            "العرض": "200 متر",
            "السكان": "9 مليون نسمة"
        },
        sustainability: {
            carbonNeutral: 100,
            renewableEnergy: 100,
            greenSpaces: 85,
            waterEfficiency: 95
        }
    },
    qiddiya: {
        name: "القدية",
        coordinates: [24.4, 46.4],
        description: "عاصمة الترفيه والرياضة والفنون، تقع على بعد 40 كيلومتر من الرياض",
        investment: 58,
        population: 600000,
        progress: 60,
        technologies: ["الواقع الافتراضي", "الألعاب التفاعلية", "التقنيات الرياضية", "الفنون الرقمية"],
        features: {
            "المساحة": "334 كم²",
            "المرافق الترفيهية": "300+",
            "الفعاليات السنوية": "100+",
            "فرص العمل": "325,000"
        },
        sustainability: {
            carbonNeutral: 80,
            renewableEnergy: 85,
            greenSpaces: 90,
            waterEfficiency: 85
        }
    },
    newriyadh: {
        name: "الرياض الجديدة",
        coordinates: [24.7, 46.7],
        description: "تطوير العاصمة لتصبح مدينة ذكية ومستدامة مع مشاريع النقل والمساحات الخضراء",
        investment: 23,
        population: 15000000,
        progress: 45,
        technologies: ["النقل الذكي", "المباني الذكية", "إدارة النفايات", "الطاقة الذكية"],
        features: {
            "مترو الرياض": "6 خطوط",
            "المساحات الخضراء": "9,000 هكتار",
            "المشاريع الذكية": "50+",
            "السكان الحالي": "7 مليون نسمة"
        },
        sustainability: {
            carbonNeutral: 70,
            renewableEnergy: 75,
            greenSpaces: 80,
            waterEfficiency: 80
        }
    }
};

// Chart Data
const chartData = {
    progress: {
        labels: ['نيوم', 'ذا لاين', 'القدية', 'الرياض الجديدة'],
        data: [35, 25, 60, 45],
        colors: ['#006739', '#00A651', '#FFD700', '#FFA500']
    },
    investment: {
        labels: ['نيوم', 'ذا لاين', 'القدية', 'الرياض الجديدة'],
        data: [500, 200, 58, 23],
        colors: ['#006739', '#00A651', '#FFD700', '#FFA500']
    },
    technologies: {
        labels: ['الذكاء الاصطناعي', 'الطاقة المتجددة', 'إنترنت الأشياء', 'الروبوتات', 'النقل الذكي', 'البناء الذكي'],
        data: [95, 100, 90, 85, 88, 92],
        colors: ['#006739', '#00A651', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4']
    },
    sustainability: {
        labels: ['الحياد الكربوني', 'الطاقة المتجددة', 'المساحات الخضراء', 'كفاءة المياه'],
        data: [87.5, 90, 87.5, 87.5],
        colors: ['#006739', '#00A651', '#FFD700', '#FFA500']
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    initializeMap();
    initializeCharts();
    initializeCityCards();
    initializeProgressBars();
    initializeModal();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animation Observer
function initializeAnimations() {
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.city-card, .tech-card, .kpi-card, .chart-container');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                countObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1);
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Map Initialization
function initializeMap() {
    try {
        map = L.map('map').setView([25.0, 45.0], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add city markers
        Object.keys(citiesData).forEach(cityKey => {
            const city = citiesData[cityKey];
            const marker = L.marker(city.coordinates).addTo(map);
            
            marker.bindPopup(`
                <div style="text-align: center; font-family: 'Cairo', Arial, sans-serif;">
                    <h3 style="color: #006739; margin-bottom: 10px;">${city.name}</h3>
                    <p style="margin-bottom: 10px;">${city.description}</p>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <span><strong>التقدم:</strong> ${city.progress}%</span>
                        <span><strong>الاستثمار:</strong> ${city.investment}B$</span>
                    </div>
                    <button onclick="showCityDetails('${cityKey}')" 
                            style="background: #006739; color: white; border: none; padding: 8px 16px; 
                                   border-radius: 5px; margin-top: 10px; cursor: pointer;">
                        المزيد من التفاصيل
                    </button>
                </div>
            `);
        });
    } catch (error) {
        console.log('Map initialization failed:', error);
        document.getElementById('map').innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; 
                        background: linear-gradient(135deg, #006739, #00A651); color: white; 
                        border-radius: 12px; font-size: 1.2rem;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <div style="text-align: center;">
                    <h3>خريطة المدن الذكية السعودية</h3>
                    <p>نيوم • ذا لاين • القدية • الرياض الجديدة</p>
                </div>
            </div>
        `;
    }
}

// Charts Initialization
function initializeCharts() {
    // Progress Chart
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        charts.progress = new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: chartData.progress.labels,
                datasets: [{
                    data: chartData.progress.data,
                    backgroundColor: chartData.progress.colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Cairo' },
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    // Investment Chart
    const investmentCtx = document.getElementById('investmentChart');
    if (investmentCtx) {
        charts.investment = new Chart(investmentCtx, {
            type: 'bar',
            data: {
                labels: chartData.investment.labels,
                datasets: [{
                    data: chartData.investment.data,
                    backgroundColor: chartData.investment.colors,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: { family: 'Cairo' }
                        }
                    },
                    x: {
                        ticks: {
                            font: { family: 'Cairo' }
                        }
                    }
                }
            }
        });
    }

    // Technology Chart
    const techCtx = document.getElementById('techChart');
    if (techCtx) {
        charts.tech = new Chart(techCtx, {
            type: 'radar',
            data: {
                labels: chartData.technologies.labels,
                datasets: [{
                    label: 'مستوى التطبيق (%)',
                    data: chartData.technologies.data,
                    backgroundColor: 'rgba(0, 103, 57, 0.2)',
                    borderColor: '#006739',
                    borderWidth: 2,
                    pointBackgroundColor: '#006739'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { family: 'Cairo' }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: { family: 'Cairo' }
                        },
                        pointLabels: {
                            font: { family: 'Cairo' }
                        }
                    }
                }
            }
        });
    }

    // Sustainability Chart
    const sustainabilityCtx = document.getElementById('sustainabilityChart');
    if (sustainabilityCtx) {
        charts.sustainability = new Chart(sustainabilityCtx, {
            type: 'line',
            data: {
                labels: chartData.sustainability.labels,
                datasets: [{
                    label: 'مؤشر الاستدامة (%)',
                    data: chartData.sustainability.data,
                    backgroundColor: 'rgba(0, 166, 81, 0.1)',
                    borderColor: '#00A651',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00A651',
                    pointBorderColor: '#006739',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { family: 'Cairo' }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: { family: 'Cairo' }
                        }
                    },
                    x: {
                        ticks: {
                            font: { family: 'Cairo' }
                        }
                    }
                }
            }
        });
    }
}

// City Cards Initialization
function initializeCityCards() {
    const cityCards = document.querySelectorAll('.city-card');
    
    cityCards.forEach(card => {
        card.addEventListener('click', () => {
            const cityKey = card.getAttribute('data-city');
            showCityDetails(cityKey);
        });
    });
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                progressObserver.unobserve(progressBar);
            }
        });
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Modal Functions
function initializeModal() {
    const modal = document.getElementById('cityModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showCityDetails(cityKey) {
    const city = citiesData[cityKey];
    const modal = document.getElementById('cityModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="color: #006739; font-size: 2.5rem; margin-bottom: 1rem;">${city.name}</h2>
            <p style="font-size: 1.2rem; color: #666; line-height: 1.6;">${city.description}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: linear-gradient(135deg, #006739, #00A651); color: white; padding: 1.5rem; border-radius: 12px; text-align: center;">
                <h3 style="margin-bottom: 0.5rem;">التقدم</h3>
                <div style="font-size: 2rem; font-weight: bold;">${city.progress}%</div>
            </div>
            <div style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #1a1a1a; padding: 1.5rem; border-radius: 12px; text-align: center;">
                <h3 style="margin-bottom: 0.5rem;">الاستثمار</h3>
                <div style="font-size: 2rem; font-weight: bold;">${city.investment}B$</div>
            </div>
            <div style="background: linear-gradient(135deg, #00A651, #006739); color: white; padding: 1.5rem; border-radius: 12px; text-align: center;">
                <h3 style="margin-bottom: 0.5rem;">السكان المتوقع</h3>
                <div style="font-size: 2rem; font-weight: bold;">${(city.population / 1000000).toFixed(1)}M</div>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: #006739; margin-bottom: 1rem; font-size: 1.5rem;">التقنيات المستخدمة</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${city.technologies.map(tech => `
                    <span style="background: #006739; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: #006739; margin-bottom: 1rem; font-size: 1.5rem;">المميزات الرئيسية</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                ${Object.entries(city.features).map(([key, value]) => `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-right: 4px solid #006739;">
                        <div style="font-weight: 600; color: #006739; margin-bottom: 0.3rem;">${key}</div>
                        <div style="color: #666;">${value}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div>
            <h3 style="color: #006739; margin-bottom: 1rem; font-size: 1.5rem;">مؤشرات الاستدامة</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                ${Object.entries(city.sustainability).map(([key, value]) => {
                    const labels = {
                        carbonNeutral: 'الحياد الكربوني',
                        renewableEnergy: 'الطاقة المتجددة',
                        greenSpaces: 'المساحات الخضراء',
                        waterEfficiency: 'كفاءة المياه'
                    };
                    return `
                        <div style="text-align: center;">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${labels[key]}</div>
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(#006739 ${value * 3.6}deg, #e0e0e0 0deg); 
                                        display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative;">
                                <div style="width: 45px; height: 45px; background: white; border-radius: 50%; 
                                            display: flex; align-items: center; justify-content: center; font-weight: bold; color: #006739;">
                                    ${value}%
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('cityModal');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});

// Performance Optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Error Handling
window.addEventListener('error', (e) => {
    console.log('Error caught:', e.error);
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showCityDetails = showCityDetails;

