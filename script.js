// Calculadora de economia — irrigação inteligente AgroVerde
const form = document.getElementById('calc-form');
const resultado = document.getElementById('resultado');
const aguaEl = document.getElementById('agua');
const dinheiroEl = document.getElementById('dinheiro');
const piscinasEl = document.getElementById('piscinas');

const fmtNumero = new Intl.NumberFormat('pt-BR');
const fmtMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Estudos mostram que irrigação inteligente economiza ~60% de água
const TAXA_ECONOMIA = 0.6;
const PISCINA_OLIMPICA_LITROS = 2_500_000;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const hectares = parseFloat(document.getElementById('hectares').value);
  const consumo = parseFloat(document.getElementById('consumo').value);
  const custo = parseFloat(document.getElementById('custo').value);

  if ([hectares, consumo, custo].some((v) => isNaN(v) || v < 0)) return;

  const litrosDia = hectares * consumo;
  const economiaLitrosMes = litrosDia * TAXA_ECONOMIA * 30;
  const economiaReaisMes = (economiaLitrosMes / 1000) * custo;
  const piscinasAno = (economiaLitrosMes * 12) / PISCINA_OLIMPICA_LITROS;

  aguaEl.textContent = fmtNumero.format(Math.round(economiaLitrosMes));
  dinheiroEl.textContent = fmtMoeda.format(economiaReaisMes);
  piscinasEl.textContent = piscinasAno.toFixed(1);

  resultado.hidden = false;
  resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Animação suave de entrada nos cards ao rolar
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.card, .benefits li').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});