/* ============================================
   ARTHASETU - Main JavaScript
   Handles interactivity: navbar, accordion, 
   GSAP animations, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- GSAP Plugin Registration ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --- Sticky Navbar Effect ---
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Menu ---
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const closeMenuBtn = document.getElementById('close-menu');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  // Close menu on nav link click
  const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const dropdown = link.closest('.dropdown');
      if (dropdown && window.innerWidth <= 768) {
        // Toggle dropdown on mobile instead of navigating if it has content
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
          e.preventDefault();
          dropdown.classList.toggle('active');

          // Close other dropdowns
          document.querySelectorAll('.mobile-menu .dropdown').forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
          });
          return;
        }
      }
      closeMenu();
    });
  });

  // Handle nested dropdowns on mobile
  const nestedTriggers = document.querySelectorAll('.nested-trigger');
  nestedTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parent = trigger.closest('.nested-dropdown');
        parent.classList.toggle('active');

        // Close other nested dropdowns in the same parent
        const siblingNested = parent.parentElement.querySelectorAll('.nested-dropdown');
        siblingNested.forEach(sib => {
          if (sib !== parent) sib.classList.remove('active');
        });
      }
    });
  });

  // --- Accordion ---
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    const content = body.querySelector('.accordion-body__content');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          if (typeof gsap !== 'undefined') {
            gsap.to(otherItem.querySelector('.accordion-body'), { height: 0, duration: 0.4, ease: "power2.out" });
          } else {
            otherItem.querySelector('.accordion-body').style.height = '0px';
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        if (typeof gsap !== 'undefined') {
          gsap.to(body, { height: 0, duration: 0.4, ease: "power2.out" });
        } else {
          body.style.height = '0px';
        }
      } else {
        item.classList.add('active');
        if (typeof gsap !== 'undefined') {
          gsap.to(body, { height: content.scrollHeight, duration: 0.4, ease: "power2.out" });
        } else {
          body.style.height = content.scrollHeight + 'px';
        }
      }
    });
  });

  // Open first accordion item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    firstItem.classList.add('active');
    const firstBody = firstItem.querySelector('.accordion-body');
    const firstContent = firstBody.querySelector('.accordion-body__content');

    if (typeof gsap !== 'undefined') {
      gsap.set(firstBody, { height: firstContent.scrollHeight });
    } else {
      firstBody.style.height = firstContent.scrollHeight + 'px';
    }
  }

  // --- Contact FAQ Accordion ---
  const faqItems = document.querySelectorAll('.contact-faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.contact-faq-header');
    const body = item.querySelector('.contact-faq-body');
    const content = body.querySelector('p');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.contact-faq-body').style.height = '0px';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        body.style.height = '0px';
      } else {
        item.classList.add('active');
        body.style.height = content.scrollHeight + 'px';
      }
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- GSAP Animations ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    // Initial Hero Animations
    const tl = gsap.timeline();
    tl.from(".hero__badge", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", clearProps: "all" })
      .from(".hero__title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", clearProps: "all" }, "-=0.4")
      .from(".hero__subtitle", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", clearProps: "all" }, "-=0.6")
      .from(".hero__buttons > *", { opacity: 0, y: 20, duration: 0.5, stagger: 0.15, ease: "power2.out", clearProps: "all" }, "-=0.4")
      .from(".hero__checks > *", { opacity: 0, y: 20, duration: 0.5, stagger: 0.15, ease: "power2.out", clearProps: "all" }, "-=0.2");

    // Fade Up Animation
    gsap.utils.toArray('[data-animate]').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });
    });

    // Stagger Children Animation
    gsap.utils.toArray('[data-stagger]').forEach(container => {
      const children = Array.from(container.children);
      gsap.from(children, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      });
    });

    // Slide Left Animation
    gsap.utils.toArray('[data-animate-left]').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });
    });

    // Slide Right Animation
    gsap.utils.toArray('[data-animate-right]').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });
    });

  } else {
    // Fallback if GSAP fails to load - just make elements visible immediately
    document.querySelectorAll('[data-animate], [data-animate-left], [data-animate-right]').forEach(el => {
      el.style.opacity = '1';
    });
    document.querySelectorAll('[data-stagger] > *').forEach(el => {
      el.style.opacity = '1';
    });
  }

});
