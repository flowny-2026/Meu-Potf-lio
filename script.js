const botao = document.getElementById('botao-tema');
const body = document.body;

// Função para verificar se deve usar tema escuro baseado no horário
function deveUsarTemaEscuro() {
  const agora = new Date();
  const hora = agora.getHours();
  // Tema escuro entre 18h e 6h
  return hora >= 18 || hora < 6;
}

// Função para aplicar tema automático baseado no horário
function aplicarTemaAutomatico() {
  const temaManual = localStorage.getItem('tema-manual');
  const agora = new Date();
  const hora = agora.getHours();
  
  console.log(`Hora atual: ${hora}h, Tema manual: ${temaManual}`);
  
  // Se o usuário nunca clicou no botão, usa tema automático
  if (!temaManual) {
    const usarEscuro = deveUsarTemaEscuro();
    console.log(`Aplicando tema automático: ${usarEscuro ? 'escuro' : 'claro'}`);
    temaEscuro(usarEscuro);
    return;
  }
  
  // Se o usuário já escolheu manualmente, usa a preferência dele
  const temasalvo = localStorage.getItem('tema');
  console.log(`Usando tema manual: ${temasalvo}`);
  temaEscuro(temasalvo === 'escuro');
}

// Função para alternar entre tema claro e escuro
function temaEscuro(tipo) {
  if (tipo == true) {
    body.classList.add('escuro');
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// Aplicar tema na inicialização
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página carregada, aplicando tema...');
  aplicarTemaAutomatico();
});

// Verificar tema automático a cada hora (3600000 ms = 1 hora)
setInterval(aplicarTemaAutomatico, 3600000);

botao.addEventListener('click', () => {
  const isescuro = body.classList.toggle('escuro');
  temaEscuro(isescuro);
  
  // Marcar que o usuário escolheu manualmente
  localStorage.setItem('tema-manual', 'true');
  localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});