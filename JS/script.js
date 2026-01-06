// ===============================
// ROLAGEM SUAVE PARA ÂNCORAS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
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


// ===============================
// MENU MOBILE
// ===============================
const toggleBtn = document.querySelector('.toggle_btn');
const dropdownMenu = document.querySelector('.dropdown_menu');

toggleBtn?.addEventListener('click', () => {
  dropdownMenu.classList.toggle('open');
  toggleBtn.classList.toggle('active');
  document.body.classList.toggle('menu-aberto');
});

document.querySelectorAll('.dropdown_menu a').forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    toggleBtn.classList.remove('active');
    document.body.classList.remove('menu-aberto');
  });
});


// ===============================
// RODAPÉ QUE SOBE NO FINAL
// ===============================
window.addEventListener("scroll", () => {
  const footer = document.getElementById("footerFinal");
  if (!footer) return;

  const scrollPos = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPos >= pageHeight - 10) {
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  } else {
    footer.style.opacity = "0";
    footer.style.transform = "translateY(100%)";
  }
});


// ===============================
// CONTADOR ANIMADO
// ===============================
const contadores = document.querySelectorAll('.contador');

const animarContador = (contador) => {
  const valorFinal = +contador.dataset.numero;
  let valorAtual = 0;
  const incremento = Math.ceil(valorFinal / 40);

  contador.textContent = contador.textContent.includes('h') ? '0h' : '0+';

  const atualizar = () => {
    valorAtual += incremento;
    if (valorAtual >= valorFinal) {
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


// ===============================
// FADE-IN + CONTADOR (INTERSECTION)
// ===============================
const elementosFade = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      entry.target.querySelectorAll('.contador')
        .forEach(animarContador);
    } else {
      entry.target.classList.remove('show');

      entry.target.querySelectorAll('.contador').forEach(contador => {
        contador.textContent =
          contador.textContent.includes('h') ? '0h' : '0+';
      });
    }
  });
}, { threshold: 0.35 });

elementosFade.forEach(el => observer.observe(el));


// ===============================
// PORTFOLIO CASCATA
// ===============================
document.querySelectorAll('.portfolio-btn').forEach(botao => {
  botao.addEventListener('click', () => {
    botao.closest('.portfolio-item')?.classList.toggle('ativo');
  });
});


// ===============================
// CARROSSEL CENTRAL FIXO + TEXTO
// ===============================
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDescs = document.querySelectorAll('.carousel-desc');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');

let carouselIndex = 0;

function atualizarCarrossel() {
  const total = carouselItems.length;

  carouselItems.forEach(item =>
    item.classList.remove('active', 'prev', 'next')
  );

  carouselDescs.forEach(desc =>
    desc.classList.remove('active')
  );

  const prevIndex = (carouselIndex - 1 + total) % total;
  const nextIndex = (carouselIndex + 1) % total;

  carouselItems[carouselIndex].classList.add('active');
  carouselItems[prevIndex].classList.add('prev');
  carouselItems[nextIndex].classList.add('next');

  const descId = carouselItems[carouselIndex].dataset.desc;
  const descAtiva = document.getElementById(descId);
  if (descAtiva) descAtiva.classList.add('active');
}

btnNext?.addEventListener('click', () => {
  carouselIndex = (carouselIndex + 1) % carouselItems.length;
  atualizarCarrossel();
});

btnPrev?.addEventListener('click', () => {
  carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
  atualizarCarrossel();
});

window.addEventListener('load', atualizarCarrossel);
