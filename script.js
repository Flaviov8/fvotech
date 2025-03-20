// Captura o botão de enviar
document.getElementById('whatsappButton').addEventListener('click', function () {
    // Captura os valores dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value.trim(); // Captura o serviço selecionado
    const message = document.getElementById('message').value.trim();

    // Validação dos campos
    if (name === '' || email === '' || service === '' || message === '') {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    // Validação do e-mail (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Mapeia os valores para nomes amigáveis (opcional)
    const serviceNames = {
        'chatbot': 'Chatbot',
        'cursos-ia': 'Cursos de IA (adaptando IA para minha realidade)',
        'manutencao-notebook': 'Manutenção Notebook',
        'manutencao-site': 'Manutenção Site',
        'locacao-notebook': 'Locação Notebook',
        'manutencao-loja-virtual': 'Manutenção Loja Virtual',
        'sistema-empresa': 'Sistema para Minha Empresa',
        'infraestrutura': 'Infraestrutura'
    };

    // Obtém o nome amigável do serviço selecionado
    const serviceFriendlyName = serviceNames[service] || service;

    // Formata a mensagem para o WhatsApp
    const whatsappMessage = `Olá, meu nome é *${name}*.\n\n` +
        `E-mail: ${email}\n\n` +
        `Serviço de interesse: *${serviceFriendlyName}*\n\n` +
        `Mensagem: ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage); // Codifica a mensagem para URL

    // Link do WhatsApp com a mensagem pré-preenchida
    const whatsappLink = `https://wa.me/5511997180903?text=${encodedMessage}`;

    // Redireciona para o WhatsApp
    window.open(whatsappLink, '_blank');
});