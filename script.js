document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');

    // Máscara para telefone melhorada
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = `(${value.substring(0, 2)}`;
        }
        if (value.length > 2) {
            formattedValue += `) ${value.substring(2, 7)}`;
        }
        if (value.length > 7) {
            formattedValue += `-${value.substring(7, 11)}`;
        }
        
        e.target.value = formattedValue;
    });

    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            email: document.getElementById('email').value.trim()
        };
        
        // Validação melhorada
        if (!validateForm(formData)) return;
        
        // Criar e enviar mensagem
        sendWhatsAppMessage(formData);
    });

    // Função de validação separada para melhor organização
    function validateForm(data) {
        if (!data.name || !data.phone || !data.service || !data.message) {
            showAlert('Por favor, preencha todos os campos obrigatórios!');
            return false;
        }
        
        const phoneDigits = data.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            showAlert('Por favor, insira um número de telefone válido com DDD (10 ou 11 dígitos)!');
            return false;
        }
        
        return true;
    }

    // Função para mostrar alertas (pode ser substituída por um modal mais bonito)
    function showAlert(message) {
        // Aqui você poderia implementar um sistema de notificação mais elegante
        alert(message);
    }

    // Função para enviar mensagem ao WhatsApp
    function sendWhatsAppMessage(data) {
        const phoneDigits = data.phone.replace(/\D/g, '');
        const whatsappNumber = '5511997180903'; // Substitua pelo seu número
        
        let whatsappMessage = `Olá, meu nome é ${data.name}!\n\n` +
                           `*Serviço desejado:* ${data.service}\n\n` +
                           `*Detalhes:* ${data.message}\n\n` +
                           `*Contato:* ${phoneDigits}\n` +
                           `(Formulário enviado via site)`;
        
        if (data.email) {
            whatsappMessage += `\n*E-mail:* ${data.email}`;
        }
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        openWhatsApp(whatsappUrl);
    }

    // Função para abrir o WhatsApp com fallbacks
    function openWhatsApp(url) {
        // Verifica se é mobile para tentar abrir diretamente o app
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Tenta abrir o app diretamente (pode não funcionar em todos os dispositivos)
            window.location.href = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
            
            // Fallback para caso o app não abra
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        } else {
            // Para desktop, abre em nova aba
            const newWindow = window.open(url, '_blank');
            
            // Fallback se o popup for bloqueado
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = url;
            }
        }
    }
});