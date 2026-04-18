document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const handleNavScroll = () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // ===== MOBILE TOGGLE =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== DOCS SIDEBAR ACTIVE STATE =====
    const docsSidebarLinks = document.querySelectorAll('.docs-sidebar-nav a');

    if (docsSidebarLinks.length > 0) {
        const docsSections = [];

        docsSidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    docsSections.push({ link, section });
                }
            }
        });

        if (docsSections.length > 0) {
            const updateActiveSidebarLink = () => {
                const scrollPos = window.scrollY + 100;
                let activeIdx = 0;

                docsSections.forEach((item, idx) => {
                    if (scrollPos >= item.section.offsetTop) {
                        activeIdx = idx;
                    }
                });

                docsSidebarLinks.forEach(l => l.classList.remove('active'));
                docsSections[activeIdx].link.classList.add('active');
            };

            window.addEventListener('scroll', updateActiveSidebarLink, { passive: true });
            updateActiveSidebarLink();
        }
    }

    // ===== NAVBAR ACTIVE LINK HIGHLIGHT =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.navbar-links a');

    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (!href.startsWith('#') && href !== currentPage) {
            link.classList.remove('active');
        }
    });

    // ===== LIGHTBOX MODAL =====
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const closeBtn = document.querySelector(".close");
    const images = document.querySelectorAll('.distro-card-screenshot img, .about-image img');

    if (modal && modalImg && closeBtn) {
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = "flex";
                modalImg.src = this.src;
                document.body.style.overflow = "hidden";
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        };

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

});
