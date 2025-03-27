document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const phoneInput = document.getElementById('phone');
    const whatsappNumber = '5511997180903'; // Número deve incluir código do país sem +

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
        
        // Validação
        if (!validateForm(formData)) return;
        
        // Criar e enviar mensagem
        sendWhatsAppMessage(formData, whatsappNumber);
    });

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

    function showAlert(message) {
        alert(message);
    }

    function sendWhatsAppMessage(data, whatsappNumber) {
        const phoneDigits = data.phone.replace(/\D/g, '');
        
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
        const directAppUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        openWhatsApp(whatsappUrl, directAppUrl);
    }

    function openWhatsApp(webUrl, directUrl) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Primeiro tenta abrir o app diretamente
            window.location.href = directUrl;
            
            // Fallback após 500ms se não abrir
            setTimeout(() => {
                window.location.href = webUrl;
            }, 500);
        } else {
            // Para desktop usa a abordagem padrão
            const newWindow = window.open(webUrl, '_blank');
            
            if (!newWindow || newWindow.closed) {
                window.location.href = webUrl;
            }
        }
    }
});