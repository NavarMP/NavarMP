/**
 * Navar MP - Personal Portfolio
 * JavaScript Functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Preloader =====
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Start animations when page is loaded
            startAnimations();
            // Initialize skill bars
            initSkillBars();
        }, 500);
    });

    // ===== Theme Switcher =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = currentTheme;

    // Update button icon based on current theme
    updateThemeIcon();

    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const isDark = body.classList.contains('dark-theme');
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        const mainLogo = document.querySelector('.main-logo');

        if (isDark) {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
            mainLogo.style.filter = 'invert(1)';
        } else {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
            mainLogo.style.filter = 'invert(0)';
        }
    }

    // ===== Language Switcher =====
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageButtons = document.querySelectorAll('.language-dropdown button');
    const currentLangSpan = document.querySelector('.current-lang');

    // Language translations
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.skills': 'Skills',
            'nav.portfolio': 'Portfolio',
            'nav.resume': 'Resume',
            'nav.testimonials': 'Testimonials',
            'nav.contact': 'Contact',
            'hero.im': 'I\'m',
            'hero.profession': 'Web, UI/UX & Graphic Designer',
            'hero.description': 'Crafting visually stunning and user-friendly digital experiences',
            'hero.viewWork': 'View My Work',
            'hero.hireMe': 'Hire Me',
            'about.title': 'About Me',
            'about.description': 'I am a passionate freelance designer specializing in web design, UI/UX, and graphic design. With a keen eye for detail and a love for creating meaningful digital experiences, I help businesses and individuals bring their visions to life.',
            'about.approach': 'My approach combines aesthetic beauty with functional design, ensuring that every project not only looks great but also delivers results.',
            'about.phone': 'Phone:',
            'about.email': 'Email:',
            'skills.title': 'My Skills',
            'skills.design': 'Design',
            'skills.development': 'Development',
            'skills.tools': 'Tools',
            'portfolio.title': 'My Portfolio',
            'portfolio.all': 'All',
            'portfolio.logo': 'Logo',
            'portfolio.web': 'Web',
            'portfolio.app': 'App',
            'portfolio.flyer': 'Flyer',
            'portfolio.3d': '3D',
            'resume.title': 'My Resume',
            'resume.download': 'Download PDF',
            'resume.all': 'All',
            'resume.education': 'Education',
            'resume.experience': 'Experience',
            'resume.awards': 'Awards',
            'testimonials.title': 'Testimonials',
            'contact.title': 'Contact Me',
            'contact.phone': 'Phone',
            'contact.email': 'Email',
            'contact.location': 'Location',
            'contact.namePlaceholder': 'Your Name',
            'contact.emailPlaceholder': 'Your Email',
            'contact.subjectPlaceholder': 'Subject',
            'contact.messagePlaceholder': 'Your Message',
            'contact.send': 'Send Message',
            'footer.rights': 'All Rights Reserved'
        },
        ml: {
            'nav.home': 'ഹോം',
            'nav.about': 'എന്നെക്കുറിച്ച്',
            'nav.skills': 'കഴിവുകൾ',
            'nav.portfolio': 'പോർട്ട്ഫോളിയോ',
            'nav.resume': 'റെസ്യൂമെ',
            'nav.testimonials': 'സാക്ഷ്യപത്രങ്ങൾ',
            'nav.contact': 'ബന്ധപ്പെടുക',
            'hero.im': 'ഞാൻ',
            'hero.profession': 'വെബ്, UI/UX & ഗ്രാഫിക് ഡിസൈനർ',
            'hero.description': 'ആകർഷകവും ഉപയോക്തൃ സൗഹൃദവുമായ ഡിജിറ്റൽ അനുഭവങ്ങൾ സൃഷ്ടിക്കുന്നു',
            'hero.viewWork': 'എന്റെ ജോലി കാണുക',
            'hero.hireMe': 'എന്നെ നിയമിക്കൂ',
            'about.title': 'എന്നെക്കുറിച്ച്',
            'about.description': 'ഞാൻ വെബ് ഡിസൈൻ, UI/UX, ഗ്രാഫിക് ഡിസൈൻ എന്നിവയിൽ വിദഗ്ധനായ ഒരു ആവേശകരമായ ഫ്രീലാൻസ് ഡിസൈനറാണ്. വിശദാംശങ്ങളിൽ ശ്രദ്ധ ചെലുത്തുന്നതിനും അർത്ഥവത്തായ ഡിജിറ്റൽ അനുഭവങ്ങൾ സൃഷ്ടിക്കുന്നതിനുമുള്ള താൽപ്പര്യത്തോടെ, ബിസിനസുകളെയും വ്യക്തികളെയും അവരുടെ കാഴ്ചപ്പാടുകൾ യാഥാർത്ഥ്യമാക്കാൻ ഞാൻ സഹായിക്കുന്നു.',
            'about.approach': 'എന്റെ സമീപനം സൗന്ദര്യാത്മക സൗന്ദര്യവും പ്രവർത്തനക്ഷമമായ ഡിസൈനും സംയോജിപ്പിക്കുന്നു, ഓരോ പ്രോജക്റ്റും മികച്ച രൂപത്തിൽ മാത്രമല്ല, ഫലങ്ങൾ നൽകുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.',
            'about.phone': 'ഫോൺ:',
            'about.email': 'ഇമെയിൽ:',
            'skills.title': 'എന്റെ കഴിവുകൾ',
            'skills.design': 'ഡിസൈൻ',
            'skills.development': 'ഡെവലപ്മെന്റ്',
            'skills.tools': 'ടൂളുകൾ',
            'portfolio.title': 'എന്റെ പോർട്ട്ഫോളിയോ',
            'portfolio.all': 'എല്ലാം',
            'portfolio.logo': 'ലോഗോ',
            'portfolio.web': 'വെബ്',
            'portfolio.app': 'ആപ്പ്',
            'portfolio.flyer': 'ഫ്ലയർ',
            'portfolio.3d': '3D',
            'resume.title': 'എന്റെ റെസ്യൂമെ',
            'resume.download': 'PDF ഡൗൺലോഡ് ചെയ്യുക',
            'resume.all': 'എല്ലാം',
            'resume.education': 'വിദ്യാഭ്യാസം',
            'resume.experience': 'അനുഭവം',
            'resume.awards': 'അവാർഡുകൾ',
            'testimonials.title': 'സാക്ഷ്യപത്രങ്ങൾ',
            'contact.title': 'എന്നോട് ബന്ധപ്പെടുക',
            'contact.phone': 'ഫോൺ',
            'contact.email': 'ഇമെയിൽ',
            'contact.location': 'സ്ഥലം',
            'contact.namePlaceholder': 'നിങ്ങളുടെ പേര്',
            'contact.emailPlaceholder': 'നിങ്ങളുടെ ഇമെയിൽ',
            'contact.subjectPlaceholder': 'വിഷയം',
            'contact.messagePlaceholder': 'നിങ്ങളുടെ സന്ദേശം',
            'contact.send': 'സന്ദേശം അയയ്ക്കുക',
            'footer.rights': 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്'
        },
        ar: {
            'nav.home': 'الرئيسية',
            'nav.about': 'عني',
            'nav.skills': 'مهاراتي',
            'nav.portfolio': 'أعمالي',
            'nav.resume': 'السيرة الذاتية',
            'nav.testimonials': 'الشهادات',
            'nav.contact': 'اتصل بي',
            'hero.im': 'أنا',
            'hero.profession': 'مصمم ويب وواجهة مستخدم وجرافيك',
            'hero.description': 'أصمم تجارب رقمية جذابة وسهلة الاستخدام',
            'hero.viewWork': 'عرض أعمالي',
            'hero.hireMe': 'وظفني',
            'about.title': 'عني',
            'about.description': 'أنا مصمم مستقل شغوف متخصص في تصميم الويب وواجهة المستخدم والتصميم الجرافيكي. بعين حادة للتفاصيل وحب لإنشاء تجارب رقمية هادفة، أساعد الشركات والأفراد على تحقيق رؤيتهم.',
            'about.approach': 'نهجي يجمع بين الجمال الجمالي والتصميم الوظيفي، مما يضمن أن كل مشروع لا يبدو رائعًا فحسب، بل يحقق نتائج أيضًا.',
            'about.phone': 'الهاتف:',
            'about.email': 'البريد الإلكتروني:',
            'skills.title': 'مهاراتي',
            'skills.design': 'التصميم',
            'skills.development': 'التطوير',
            'skills.tools': 'الأدوات',
            'portfolio.title': 'أعمالي',
            'portfolio.all': 'الكل',
            'portfolio.logo': 'الشعارات',
            'portfolio.web': 'الويب',
            'portfolio.app': 'التطبيقات',
            'portfolio.flyer': 'المنشورات',
            'portfolio.3d': 'ثلاثي الأبعاد',
            'resume.title': 'سيرتي الذاتية',
            'resume.download': 'تحميل PDF',
            'resume.all': 'الكل',
            'resume.education': 'التعليم',
            'resume.experience': 'الخبرة',
            'resume.awards': 'الجوائز',
            'testimonials.title': 'الشهادات',
            'contact.title': 'اتصل بي',
            'contact.phone': 'الهاتف',
            'contact.email': 'البريد الإلكتروني',
            'contact.location': 'الموقع',
            'contact.namePlaceholder': 'اسمك',
            'contact.emailPlaceholder': 'بريدك الإلكتروني',
            'contact.subjectPlaceholder': 'الموضوع',
            'contact.messagePlaceholder': 'رسالتك',
            'contact.send': 'إرسال الرسالة',
            'footer.rights': 'جميع الحقوق محفوظة'
        }
    };

    // Check for saved language preference or use default
    let currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);

    // Toggle language dropdown
    languageToggle.addEventListener('click', function() {
        languageDropdown.classList.toggle('active');
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    // Language selection
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            languageDropdown.classList.remove('active');
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update current language display
        currentLangSpan.textContent = lang.toUpperCase();
        
        // Update active button
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Update HTML dir attribute for RTL languages
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update all translations
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }

    // ===== Audio Player =====
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicToggle.classList.remove('playing');
        } else {
            backgroundMusic.play().catch(error => {
                console.log('Auto-play was prevented. User interaction required.');
            });
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // ===== Cursor Effect =====
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');
    let cursorVisible = true;
    let cursorTimeout;

    // Hide cursor initially on mobile devices
    if (isMobileDevice()) {
        cursor.style.display = 'none';
    } else {
        // Show cursor on mouse movement
        document.addEventListener('mousemove', function(e) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Show cursor and reset timeout
            if (!cursorVisible) {
                cursor.classList.remove('hidden');
                cursorVisible = true;
            }
            
            clearTimeout(cursorTimeout);
            
            // Hide cursor after 3 seconds of inactivity
            cursorTimeout = setTimeout(function() {
                cursor.classList.add('hidden');
                cursorVisible = false;
            }, 3000);
        });
        
        // Add active class on hover over links and buttons
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });
            
            link.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', function() {
            cursor.classList.add('hidden');
        });
        
        // Show cursor when entering the window
        document.addEventListener('mouseenter', function() {
            cursor.classList.remove('hidden');
        });
    }

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // ===== Side Menu =====
    const sideMenu = document.querySelector('.side-menu');
    const leftTrigger = document.querySelector('.side-menu-trigger.left');
    const rightTrigger = document.querySelector('.side-menu-trigger.right');
    const closeMenu = document.querySelector('.close-menu');
    const menuToggle = document.getElementById('menu-toggle');

    // Open menu when hovering over left trigger (desktop only)
    if (!isMobileDevice()) {
        leftTrigger.addEventListener('mouseenter', function() {
            sideMenu.classList.add('active');
        });
    }

    // Close menu when clicking close button
    closeMenu.addEventListener('click', function() {
        sideMenu.classList.remove('active');
    });

    // Toggle menu when clicking menu button
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && !leftTrigger.contains(e.target)) {
            sideMenu.classList.remove('active');
        }
    });

    // ===== Floating Navigation =====
    const floatingNav = document.querySelector('.floating-nav');
    // let lastScrollTop = 0;
    let isScrolling;

    // Show/hide floating nav based on scroll direction
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show nav when scrolling up, hide when scrolling down
        if (scrollTop > lastScrollTop) {
            floatingNav.classList.add('hidden');
        } else {
            floatingNav.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Show nav when scrolling stops
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            floatingNav.classList.remove('hidden');
        }, 1000);
    });

    // ===== Global Search =====
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.querySelector('.search-modal');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.querySelector('.search-results');

    // Open search modal
    searchToggle.addEventListener('click', function() {
        searchModal.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    // Close search modal
    closeSearch.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });

    // Close search modal when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '<p>Type at least 2 characters to search...</p>';
            return;
        }
        
        // Get all searchable content
        const sections = document.querySelectorAll('section');
        let results = [];
        
        sections.forEach(section => {
            const sectionId = section.id;
            const sectionTitle = section.querySelector('.section-title')?.textContent || '';
            const sectionContent = section.textContent;
            
            if (sectionTitle.toLowerCase().includes(query) || sectionContent.toLowerCase().includes(query)) {
                results.push({
                    id: sectionId,
                    title: sectionTitle,
                    excerpt: getExcerpt(sectionContent, query)
                });
            }
        });
        
        // Display results
        if (results.length > 0) {
            let html = '';
            results.forEach(result => {
                html += `
                    <div class="search-result-item">
                        <h3><a href="#${result.id}" class="search-result-link">${result.title}</a></h3>
                        <p>${result.excerpt}</p>
                    </div>
                `;
            });
            searchResults.innerHTML = html;
            
            // Add click event to search result links
            document.querySelectorAll('.search-result-link').forEach(link => {
                link.addEventListener('click', function() {
                    searchModal.classList.remove('active');
                });
            });
        } else {
            searchResults.innerHTML = '<p>No results found for "' + query + '"</p>';
        }
    });

    function getExcerpt(text, query) {
        const maxLength = 100;
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query.toLowerCase());
        
        if (index === -1) return text.substring(0, maxLength) + '...';
        
        const start = Math.max(0, index - 30);
        const end = Math.min(text.length, index + query.length + 30);
        let excerpt = text.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < text.length) excerpt += '...';
        
        return excerpt;
    }

    // ===== Portfolio Filter =====
    const portfolioFilters = document.querySelectorAll('.portfolio-filter .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== Portfolio Modal =====
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const portfolioModal = document.querySelector('.portfolio-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Sample portfolio projects data
    const portfolioProjects = {
        project1: {
            title: 'E-commerce Website',
            category: 'Web Design',
            client: 'Fashion Boutique',
            date: 'January 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/web/web-1.jpg']
        },
        project2: {
            title: 'Mobile App UI Design',
            category: 'App Design',
            client: 'Health & Fitness Startup',
            date: 'March 2023',
            description: 'A comprehensive UI design for a health and fitness tracking mobile application. The design focuses on user experience, with intuitive navigation and visually appealing data visualization.',
            images: ['assets/images/portfolio/app/app-1.jpg', 'assets/images/portfolio/app/app-1-detail.jpg']
        },
        project3: {
            title: 'Brand Identity',
            category: 'Logo Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A complete brand identity package for a technology consultancy firm. The project included logo design, color palette selection, typography, and brand guidelines.',
            images: ['assets/images/portfolio/logo/logo-1.jpg', 'assets/images/portfolio/logo/logo-1-detail.jpg']
        },
        project4: {
            title: 'Web Design',
            category: 'Web Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/web/web-2.jpg', 'assets/images/portfolio/web/web-2-detail.jpg']
        },
        project5: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-1.jpg']
        },
        project6: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-2.jpg']
        },
        project7: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-3.jpg']
        },
        project8: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-4.jpg']
        },
        project9: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-5.jpg']
        },
        project10: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-6.jpg']
        },
        project11: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-7.jpg']
        },
        project12: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-8.jpg']
        },
        project13: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-9.jpg']
        },
        project14: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-10.jpg']
        },
        project15: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-11.jpg']
        },
        project16: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-12.jpg']
        },
        project17: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-13.jpg']
        },
        project18: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-14.jpg']
        },
        project19: {
            title: 'Flyer Design',
            category: 'Flyer Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/flyer/flyer-15.jpg']
        },
        project20: {
            title: 'Logo Design',
            category: 'Logo Design',
            client: 'Tech Consultancy',
            date: 'May 2023',
            description: 'A fully responsive e-commerce website for a fashion boutique. The project included custom product pages, shopping cart functionality, and a streamlined checkout process.',
            images: ['assets/images/portfolio/logo/logo-16.jpg']
        }
    };

    // Open portfolio modal
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            const project = portfolioProjects[projectId];
            
            if (project) {
                let imagesHtml = '';
                project.images.forEach(image => {
                    imagesHtml += `<img src="${image}" alt="${project.title}" class="modal-image">`;
                });
                
                modalBody.innerHTML = `
                    <div class="modal-images">${imagesHtml}</div>
                    <div class="modal-details">
                        <h2>${project.title}</h2>
                        <div class="project-info">
                            <div class="info-item">
                                <span class="info-label">Category:</span>
                                <span class="info-value">${project.category}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Client:</span>
                                <span class="info-value">${project.client}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Date:</span>
                                <span class="info-value">${project.date}</span>
                            </div>
                        </div>
                        <div class="project-description">
                            <h3>Project Description</h3>
                            <p>${project.description}</p>
                        </div>
                    </div>
                `;
                
                portfolioModal.classList.add('active');
            }
        });
    });

    // Close portfolio modal
    closeModal.addEventListener('click', function() {
        portfolioModal.classList.remove('active');
    });

    // Close portfolio modal when clicking outside
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active');
        }
    });

    // Close portfolio modal when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            portfolioModal.classList.remove('active');
        }
    });

    // ===== Resume Filter =====
    const resumeFilters = document.querySelectorAll('.resume-filter .filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    resumeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            resumeFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide timeline items based on filter
            timelineItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== Testimonials Slider =====
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create dots for testimonials
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        testimonialDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Initialize testimonials
    function initTestimonials() {
        testimonialItems.forEach((item, index) => {
            item.style.display = index === 0 ? 'block' : 'none';
        });
    }

    // Show specific testimonial
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }

    // Previous testimonial
    prevTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });

    // Next testimonial
    nextTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });

    // Initialize testimonials
    initTestimonials();

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Pause auto-rotation when hovering over testimonials
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // ===== Animations =====
    function startAnimations() {
        // Animate elements when they come into view
        const animatedElements = document.querySelectorAll('.section-title, .about-image, .about-text, .skill-category, .portfolio-item, .timeline-item, .testimonial-item, .contact-item, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===== Skill Bars Animation =====
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // ===== Update Current Year =====
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close side menu if open
                sideMenu.classList.remove('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Update active nav links
                updateActiveNavLinks(targetId.substring(1));
            }
        });
    });

    // ===== Update Active Nav Links =====
    function updateActiveNavLinks(sectionId) {
        const navLinks = document.querySelectorAll('.menu-items a, .floating-nav a');
        
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            
            if (linkSection === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                updateActiveNavLinks(section.id);
            }
        });
    });

    // ===== Generate Portfolio Items =====
    function generatePortfolioItems() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        // Clear existing items (except the example)
        const existingItems = portfolioGrid.querySelectorAll('.portfolio-item:not(:first-child)');
        existingItems.forEach(item => item.remove());
        
        // Sample portfolio data
        const portfolioData = [
            {
                id: 'project2',
                category: 'app',
                image: 'assets/images/portfolio/app/app-1.jpg',
                title: 'Fitness Tracker App',
                type: 'App Design'
            },
            {
                id: 'project3',
                category: 'logo',
                image: 'assets/images/portfolio/logo/logo-1.jpg',
                title: 'Tech Company Rebrand',
                type: 'Logo Design'
            },
            {
                id: 'project4',
                category: 'web',
                image: 'assets/images/portfolio/web/web-2.jpg',
                title: 'Portfolio Website',
                type: 'Web Design'
            },
            {
                id: 'project5',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-1.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project6',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-2.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project7',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-3.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project8',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-4.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project9',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-5.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project10',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-6.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project11',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-7.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project12',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-8.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project5',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-9.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project13',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-10.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project14',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-11.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            // {
            //     id: 'project15',
            //     category: 'flyer',
            //     image: 'assets/images/portfolio/flyer/flyer-12.jpg',
            //     title: 'Event Promotion',
            //     type: 'Flyer Design'
            // },
            {
                id: 'project16',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-13.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project17',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-14.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            {
                id: 'project18',
                category: 'flyer',
                image: 'assets/images/portfolio/flyer/flyer-15.jpg',
                title: 'Event Promotion',
                type: 'Flyer Design'
            },
            // {
            //     id: 'project19',
            //     category: 'flyer',
            //     image: 'assets/images/portfolio/flyer/flyer-16.jpg',
            //     title: 'Event Promotion',
            //     type: 'Flyer Design'
            // },
            {
                id: 'project20',
                category: '3d',
                image: 'assets/images/portfolio/3d/3d-1.jpg',
                title: 'Product Visualization',
                type: '3D Rendering'
            }
        ];
        
        // Generate portfolio items
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.type}</p>
                            <a href="#" class="portfolio-link" data-project="${item.id}"><i class="fas fa-plus"></i></a>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Update portfolio links
        const newPortfolioLinks = document.querySelectorAll('.portfolio-link:not([data-event-attached])');
        newPortfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const projectId = this.getAttribute('data-project');
                const project = portfolioProjects[projectId];
                
                if (project) {
                    let imagesHtml = '';
                    project.images.forEach(image => {
                        imagesHtml += `<img src="${image}" alt="${project.title}" class="modal-image">`;
                    });
                    
                    modalBody.innerHTML = `
                        <div class="modal-images">${imagesHtml}</div>
                        <div class="modal-details">
                            <h2>${project.title}</h2>
                            <div class="project-info">
                                <div class="info-item">
                                    <span class="info-label">Category:</span>
                                    <span class="info-value">${project.category}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Client:</span>
                                    <span class="info-value">${project.client}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Date:</span>
                                    <span class="info-value">${project.date}</span>
                                </div>
                            </div>
                            <div class="project-description">
                                <h3>Project Description</h3>
                                <p>${project.description}</p>
                            </div>
                        </div>
                    `;
                    
                    portfolioModal.classList.add('active');
                }
            });
            
            link.setAttribute('data-event-attached', 'true');
        });
    }

    // Call the function to generate portfolio items
    generatePortfolioItems();

    // ===== Hide Elements on Scroll =====
    const themeSwitcher = document.querySelector('.theme-switcher');
    const languageSwitcher = document.querySelector('.language-switcher');
    const searchContainer = document.querySelector('.search-container');
    const audioPlayer = document.querySelector('.audio-player');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            themeSwitcher.style.opacity = '0';
            languageSwitcher.style.opacity = '0';
            searchContainer.style.opacity = '0';
            audioPlayer.style.opacity = '0';
        } else {
            themeSwitcher.style.opacity = '1';
            languageSwitcher.style.opacity = '1';
            searchContainer.style.opacity = '1';
            audioPlayer.style.opacity = '1';
        }
        lastScrollTop = scrollTop;
    });
});