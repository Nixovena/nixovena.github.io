document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        const handleNavScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // ========== MOBILE TOGGLE ==========
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

    // ========== SCROLL REVEAL ==========
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
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========== SMOOTH SCROLL ==========
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

    // ========== PARTICLES ==========
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 20;
            const opacity = Math.random() * 0.4 + 0.1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--particle-opacity', opacity);

            particlesContainer.appendChild(particle);
        }
    }

    // ========== DOCS SIDEBAR ACTIVE STATE ==========
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
                const scrollPos = window.scrollY + 120;
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

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    let current = 0;
                    const duration = 1500;
                    const step = count / (duration / 16);

                    const updateCounter = () => {
                        current += step;
                        if (current >= count) {
                            target.textContent = count;
                        } else {
                            target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ========== NAVBAR ACTIVE LINK HIGHLIGHT ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.navbar-links a:not(.navbar-cta)');

    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (!href.startsWith('#') && href !== currentPage) {
            link.classList.remove('active');
        }
    });

    // ========== LIGHTBOX MODAL ==========
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
                // Avoid scrolling back to top when opening the modal
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
    }

});

// ========== CONTACT FORM HANDLER ==========
function handleContactSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    if (form && success) {
        form.style.display = 'none';
        document.querySelector('.contact-form h3').style.display = 'none';
        success.style.display = 'block';

        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            document.querySelector('.contact-form h3').style.display = 'block';
            success.style.display = 'none';
        }, 4000);
    }
}
