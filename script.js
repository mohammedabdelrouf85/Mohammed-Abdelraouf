/**
 * MOHAMMED ABDELRAOUF PORTFOLIO INTERACTIVE SCRIPT (2026)
 * Features: Cursor Spotlight, Interactive CLI Terminal, One-Click Copy, Filter Matrices, Navigation & Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------
       0. PROFESSIONAL DEVELOPER PRELOADER SEQUENCE
    ---------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    const preloaderText = document.getElementById('preloaderText');
    const preloaderPercent = document.getElementById('preloaderPercent');

    if (preloader && preloaderBar) {
        let progress = 0;
        const steps = [
            { pct: 18, text: 'Booting PHP 8.2 & PDO Database Core...' },
            { pct: 40, text: 'Loading Talabat CSAT & Live Chat metrics...' },
            { pct: 62, text: 'Mounting AgriStats Flutter & Systems Blueprint...' },
            { pct: 82, text: 'Configuring Interactive Developer Terminal...' },
            { pct: 95, text: 'Finalizing security protocols & OWASP checks...' },
            { pct: 100, text: 'Portfolio system ready!' }
        ];

        let currentStep = 0;
        let pauseTicks = 0;

        const timer = setInterval(() => {
            if (currentStep < steps.length) {
                const targetPct = steps[currentStep].pct;

                if (pauseTicks > 0) {
                    pauseTicks--;
                    return;
                }

                if (progress < targetPct) {
                    progress += 2;
                    if (progress > targetPct) progress = targetPct;

                    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
                    if (preloaderPercent) preloaderPercent.innerText = `${progress}%`;
                    if (preloaderText) preloaderText.innerText = steps[currentStep].text;
                } else {
                    // Pause at each milestone step for realistic multi-phase feel
                    pauseTicks = (currentStep === steps.length - 1) ? 2 : 5; 
                    currentStep++;
                }
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                }, 400);
            }
        }, 35);
    }

    /* ----------------------------------------------------
       1. MOUSE CURSOR SPOTLIGHT TRACER
    ---------------------------------------------------- */
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    /* ----------------------------------------------------
       2. NAVBAR SCROLL & MOBILE MENU TOGGLE
    ---------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinkItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                if (hamburger.querySelector('i')) {
                    hamburger.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });

        // Close mobile menu when tapping outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('mobile-open') && !navbar.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                if (hamburger.querySelector('i')) {
                    hamburger.querySelector('i').className = 'fa-solid fa-bars';
                }
            }
        });
    }

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ----------------------------------------------------
       3. QUICK-COPY TO CLIPBOARD & TOAST NOTIFICATIONS
    ---------------------------------------------------- */
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
            }).catch(err => {
                showToast('Failed to copy to clipboard', 'error');
            });
        });
    });

    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '<i class="fa-solid fa-check-circle text-accent-blue"></i>';
        if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation text-accent-purple"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /* ----------------------------------------------------
       4. SKILLS FILTER TABS
    ---------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------
       5. PROJECTS FILTER TABS
    ---------------------------------------------------- */
    const pFilterBtns = document.querySelectorAll('.p-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    pFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const pFilterValue = btn.getAttribute('data-pfilter');

            projectCards.forEach(card => {
                const pCategory = card.getAttribute('data-pcategory');
                if (pFilterValue === 'all' || pCategory === pFilterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------
       6. INTERACTIVE DEVELOPER TERMINAL CLI
    ---------------------------------------------------- */
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalScreen = document.getElementById('terminalScreen');
    const shortcutBtns = document.querySelectorAll('.btn-shortcut');

    const commandsMap = {
        'help': `Available Commands:
  - about      : Summary of Mohammed's background & career goals
  - skills     : Technical & operational skill set overview
  - experience : Work history timeline (Teleperformance, Elbostan, Kazyon)
  - projects   : Key projects & technical deliverables
  - contact    : Direct contact details (Email, Phone, Location)
  - clear      : Clear terminal screen`,

        'about': `Name       : Mohammed Abdelraouf
Location   : Egypt 🇪🇬
Education  : Business Administration (MIS Student @ MTI University)
Roles      : Live Chat Support Specialist (Teleperformance - Talabat Account)
Focus      : Aspiring Back-End PHP Developer & Cybersecurity Learner`,

        'skills': `Technical Stack:
  [PHP] Back-End Web Apps, OOP, Session Handling, PDO
  [MySQL] Relational Database Design, SQL Querying, Normalization
  [MIS] Systems Analysis & Design, ERD/DFD Modeling
  [Cyber] Web Security Fundamentals, OWASP Top 10 Prevention
  [Hardware] PC Spec Building, Laptop Diagnostics, Budget Tuning

Operations & Soft Skills:
  Live Chat Support, CSAT/FCR Metrics, Technical Consultation`,

        'experience': `Work History:
1. Teleperformance (Feb 2026 - Present)
   Role: Live Chat Support Specialist (Talabat Account)
   Impact: Top CSAT & FCR performance in high-velocity chat queues.

2. Mall Elbostan (Jun 2025 - Dec 2025)
   Role: IT Hardware & Laptop Sales Specialist
   Impact: Technical advisory on PC builds, CPU/GPU matching & budget specs.

3. Kazyon Market (Jan 2025 - Mar 2025)
   Role: Cashier & Retail Operations`,

        'projects': `Projects Portfolio:
  1. Gaming Zonee Portal (First Web Project) -> https://mohammedabdelrouf85.github.io/Gaming-Zonee/
  2. Custom PHP & MySQL E-Commerce Core System
  3. University MIS System Analysis & ERD/DFD Blueprint
  4. Talabat CSAT & FCR Optimization Framework
  5. OWASP SQL Injection & Prepared Statements Security Lab
  6. PC Hardware Spec & Budget Matcher Matrix`,

        'contact': `Contact Information:
  Email    : mohammedabdelrouf85@gmail.com
  Phone    : +20 1098539085
  Location : Egypt (Open to Remote & On-Site Roles)`
    };

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                processCommand(cmd);
                terminalInput.value = '';
            }
        });

        shortcutBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.getAttribute('data-cmd');
                processCommand(cmd);
            });
        });
    }

    function processCommand(cmd) {
        if (!cmd) return;

        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const block = document.createElement('div');
        block.className = 'terminal-output-block';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-cmd-entry';
        cmdLine.innerHTML = `<span class="prompt-user">guest@mohammed-dev</span>:<span class="prompt-path">~</span>$&nbsp;${cmd}`;

        const resLine = document.createElement('div');
        resLine.className = 'term-res-text';

        if (commandsMap[cmd]) {
            resLine.innerText = commandsMap[cmd];
        } else {
            resLine.innerText = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
        }

        block.appendChild(cmdLine);
        block.appendChild(resLine);
        terminalOutput.appendChild(block);

        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    /* ----------------------------------------------------
       7. CONTACT FORM SUBMISSION (FormSubmit AJAX) & WHATSAPP
    ---------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formsubmit.co/ajax/mohammedabdelrouf85@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const data = await response.json();

                if (response.ok || data.success === 'true' || data.success === true) {
                    showToast('Message sent successfully! Thank you for reaching out.', 'success');
                    contactForm.reset();
                } else {
                    // Fallback to standard form submission if AJAX returns error
                    showToast('Submitting message...', 'info');
                    contactForm.submit();
                }
            } catch (err) {
                console.error('Form submission error:', err);
                // Fallback to standard POST submit if AJAX fetch fails
                contactForm.submit();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
        });
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('senderName')?.value.trim() || '';
            const email = document.getElementById('senderEmail')?.value.trim() || '';
            const subject = document.getElementById('messageSubject')?.value.trim() || '';
            const message = document.getElementById('messageBody')?.value.trim() || '';

            let text = `Hello Mohammed,`;
            if (name) text += `\n*Name:* ${name}`;
            if (email) text += `\n*Email:* ${email}`;
            if (subject) text += `\n*Subject:* ${subject}`;
            if (message) text += `\n\n*Message:*\n${message}`;

            const whatsappUrl = `https://wa.me/201098539085?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    /* ----------------------------------------------------
       8. SCROLL REVEAL ANIMATION OBSERVER
    ---------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .glass-card, .timeline-item');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* ----------------------------------------------------
       9. ANIMATED STATS NUMBERS COUNTER
    ---------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    function animateStats() {
        if (animatedStats) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
            const suffix = stat.querySelector('span')?.outerHTML || '';
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.innerHTML = `${current}${suffix}`;
            }, 30);
        });
        animatedStats = true;
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    } else {
        animateStats();
    }

});

