/* ========================================================
   NOVA TENDÊNCIA - Script principal
   JavaScript nativo, sem dependências externas
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== ANO ATUAL NO RODAPÉ ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== NAVBAR: SOMBRA AO ROLAR ===== */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* ===== MENU MOBILE (HAMBÚRGUER) ===== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer link
  document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ===== SCROLL SUAVE PARA ÂNCORAS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ===== BOTÃO VOLTAR AO TOPO ===== */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== ANIMAÇÕES AO ROLAR (INTERSECTION OBSERVER) ===== */
  const animatedElements = document.querySelectorAll('[data-animate], [data-animate-group]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: caso o navegador não suporte IntersectionObserver
    animatedElements.forEach(el => el.classList.add('in-view'));
  }

  /* ===== BOTÕES "AGENDAR" DOS SERVIÇOS (MENSAGEM DINÂMICA NO WHATSAPP) ===== */
  const WHATSAPP_PHONE = '5524988679120';

  const buildWhatsappLink = (servico) => {
    const mensagem = `Olá Salão Nova Tendência, gostaria de agendar ${servico}.`;
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(mensagem)}&type=phone_number&app_absent=0`;
  };

  document.querySelectorAll('[data-servico]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.open(buildWhatsappLink(botao.dataset.servico), '_blank', 'noopener');
    });
  });

  /* ===== DESTAQUE DO LINK ATIVO NO MENU CONFORME SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink();

});
