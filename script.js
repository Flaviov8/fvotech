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
        
        // Validar campos obrigatórios
        if (!name || !phone || !service || !message) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Validar telefone (mínimo 10 dígitos)
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            alert('Por favor, insira um número de telefone válido com DDD (10 ou 11 dígitos)!');
            return;
        }
        
        // Criar mensagem para WhatsApp
        let whatsappMessage = `Olá, meu nome é ${name}!\n\n` +
                             `*Serviço desejado:* ${service}\n\n` +
                             `*Detalhes:* ${message}\n\n` +
                             `*Contato:* ${phoneDigits}\n` +
                             `(Formulário enviado via site)`;
        
        // Adicionar e-mail se existir
        if (email) {
            whatsappMessage += `\n*E-mail:* ${email}`;
        }
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp da empresa (substitua pelo seu)
        const whatsappNumber = '5511997180903'; // Substitua pelo seu número
        
        // Criar link do WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Alternativas para abrir o WhatsApp
        try {
            // Tentativa 1: Abrir em nova janela (pode ser bloqueada)
            const newWindow = window.open(whatsappUrl, '_blank');
            
            // Se foi bloqueado, Tentativa 2: Redirecionar na mesma janela
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = whatsappUrl;
            }
        } catch (e) {
            // Tentativa 3: Mostrar link manualmente se tudo falhar
            alert(`Não foi possível abrir o WhatsApp automaticamente. Por favor, clique neste link: ${whatsappUrl}`);
        }
    });

    // Máscara para telefone (melhorada)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = `(${value.substring(0,2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0,10)}-${value.substring(10)}`;
        }
        
        e.target.value = value;
    });
});