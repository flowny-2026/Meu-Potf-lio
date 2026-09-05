const botao = document.getElementById('botao-tema');
const body = document.body;

// --- GERENCIAMENTO DE TEMA (CLARO/ESCURO) ---

// Função para verificar se deve usar tema escuro baseado no horário (18h às 6h)
function deveUsarTemaEscuro() {
  const agora = new Date();
  const hora = agora.getHours();
  return hora >= 18 || hora < 6;
}

// Função para aplicar o tema visual e trocar o ícone
function temaEscuro(tipo) {
  if (tipo === true) {
    body.classList.add('escuro');
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// Função para aplicar tema automático ou manual na inicialização
function aplicarTema() {
  const temaManual = localStorage.getItem('tema-manual');
  
  if (!temaManual) {
    // Se não houver escolha manual, segue o relógio
    temaEscuro(deveUsarTemaEscuro());
  } else {
    // Se houver escolha manual, segue o que está salvo
    const temaSalvo = localStorage.getItem('tema');
    temaEscuro(temaSalvo === 'escuro');
  }
}

// Evento de clique no botão de tema
botao.addEventListener('click', () => {
  const isEscuroAgora = body.classList.toggle('escuro');
  temaEscuro(isEscuroAgora);
  
  // Salva a preferência do usuário
  localStorage.setItem('tema-manual', 'true');
  localStorage.setItem('tema', isEscuroAgora ? 'escuro' : 'claro');
});

// --- NAVEGAÇÃO E SCROLL SUAVE ---

// Seleciona todos os links do menu que apontam para IDs (#)
const navLinks = document.querySelectorAll('#menu ul a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Só aplica o scroll suave se o link for para uma seção interna (começa com #)
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});