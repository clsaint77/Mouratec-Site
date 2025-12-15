/* -------------------------
const modal = document.querySelector(".modal");
const mascara = document.querySelector(".mascara-modal");


function mostrarModal() {
  modal.style.left = "50%";
  mascara.style.visibility = "visible";
}

function fecharModal() {
  modal.style.left = "-50%";
  mascara.style.visibility = "hidden";
}
------------------------- */

// Rolagem suave para âncoras internas (corrigido)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href');

    // ignora links vazios ou "#"
    if (!id || id === '#') return;

    const alvo = document.querySelector(id);
    if (!alvo) return;

    e.preventDefault();
    window.scrollTo({
      top: alvo.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});



// MENU MOBILE
const toggleBtn = document.querySelector('.toggle_btn');
const dropdownMenu = document.querySelector('.dropdown_menu');

toggleBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('open');
  toggleBtn.classList.toggle('active');
  document.body.classList.toggle('menu-aberto');
});

// Fecha o menu ao clicar em um item
document.querySelectorAll('.dropdown_menu a').forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    toggleBtn.classList.remove('active');
    document.body.classList.remove('menu-aberto');
  });
});

// RODAPE QUE APARECE NO FINAL DA PAGINA
window.addEventListener("scroll", () => {
    const footer = document.getElementById("footerFinal");

    const scrollPos = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    // Quando chegar ao final, exibe o rodape
    if (scrollPos >= pageHeight - 10) {
        footer.style.opacity = "1";
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.opacity = "0";
        footer.style.transform = "translateY(100%)";
    }
});

// ===== CONTADOR ANIMADO =====
const contadores = document.querySelectorAll('.contador');

const animarContador = (contador) => {
  const valorFinal = +contador.getAttribute('data-numero');
  let valorAtual = 0;
  const incremento = Math.ceil(valorFinal / 40);

  // reseta antes de animar
  contador.textContent = contador.textContent.includes('h') ? '0h' : '0+';

  const atualizar = () => {
    valorAtual += incremento;
    if (valorAtual >= valorFinal) {
      valorAtual = valorFinal;
      contador.textContent =
        valorFinal + (contador.textContent.includes('h') ? 'h' : '+');
    } else {
      contador.textContent =
        valorAtual + (contador.textContent.includes('h') ? 'h' : '+');
      requestAnimationFrame(atualizar);
    }
  };

  atualizar();
};


// ===== contador e fade in reativavel =====
const elementosFade = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {

    if (entrada.isIntersecting) {
      // entra na tela
      entrada.target.classList.add('show');

      // se tiver contador dentro, anima
      const contadoresInternos = entrada.target.querySelectorAll('.contador');
      contadoresInternos.forEach(contador => {
        animarContador(contador);
      });

    } else {
      // saiu da tela → reseta animação
      entrada.target.classList.remove('show');

      const contadoresInternos = entrada.target.querySelectorAll('.contador');
      contadoresInternos.forEach(contador => {
        contador.textContent =
          contador.textContent.includes('h') ? '0h' : '0+';
      });
    }

  });
}, {
  threshold: 0.35
});

elementosFade.forEach(el => observer.observe(el));
