document.getElementById('whatsappButton').addEventListener('click', function() {
    // Captura os valores dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Validação básica
    if (name === '' || email === '' || phone === '' || service === '' || message === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Formata a mensagem para o WhatsApp
    const whatsappMessage = `*SOLICITAÇÃO DE SERVIÇO DE TI*\n\n` +
                           `*Nome:* ${name}\n` +
                           `*Email:* ${email}\n` +
                           `*Telefone:* ${phone}\n\n` +
                           `*Serviço solicitado:* ${service}\n\n` +
                           `*Detalhes do serviço:*\n${message}\n\n` +
                           `Por favor, informe disponibilidade para atendimento.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Link do WhatsApp com a mensagem pré-preenchida
    const whatsappLink = `https://wa.me/5511997180903?text=${encodedMessage}`;

    // Redireciona para o WhatsApp
    window.open(whatsappLink, '_blank');
});