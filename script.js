document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const contactForm = document.getElementById('contactForm');

    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const email = document.getElementById('email').value.trim();
if (email) {
    whatsappMessage += `\n*E-mail:* ${email}`;
}
        
        // Validar campos obrigatórios
        if (!name || !phone || !service || !message) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Validar telefone (mínimo 10 dígitos)
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            alert('Por favor, insira um número de telefone válido com DDD!');
            return;
        }
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá, meu nome é ${name}!\n\n` +
                               `*Serviço desejado:* ${service}\n\n` +
                               `*Detalhes:* ${message}\n\n` +
                               `*Contato:* ${phone}\n` +
                               `(Formulário enviado via site)`;
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp da empresa (substitua pelo seu)
        const whatsappNumber = '5511997180903'; // Exemplo: 55 (Brasil) + DDD + número
        
        // Abrir WhatsApp com a mensagem
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = `(${value.substring(0,2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0,10)}-${value.substring(10,14)}`;
        }
        
        e.target.value = value;
    });
});