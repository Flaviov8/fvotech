document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const phoneInput = document.getElementById('phone');
    const whatsappNumber = '5511997180903'; // Substitua pelo seu número Business API
    
    // Configuração do chatbot
    const chatbotConfig = {
        welcomeMessage: "Olá! Sou o assistente virtual da Empresa FVOTECH. Como posso ajudar?",
        quickReplies: [
            { title: "Orçamento", id: "budget" },
            { title: "Agendamento", id: "schedule" },
            { title: "Suporte", id: "support" }
        ],
        defaultFlow: "budget" // Fluxo padrão quando vem do formulário
    };

    // Máscara para telefone (mantida igual)
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
        const formData = getFormData();
        if (!validateForm(formData)) return;
        
        // Envia com interação do chatbot
        sendWithChatbotFlow(formData, whatsappNumber, chatbotConfig.defaultFlow);
    });

    function getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            email: document.getElementById('email').value.trim()
        };
    }

    function validateForm(data) {
        // Validação mantida igual
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

    function sendWithChatbotFlow(data, whatsappNumber, flowId) {
        const phoneDigits = data.phone.replace(/\D/g, '');
        
        // Mensagem estruturada para o chatbot
        let whatsappMessage = `*${chatbotConfig.welcomeMessage}*\n\n`;
        whatsappMessage += `*Cliente:* ${data.name}\n`;
        whatsappMessage += `*Assunto:* ${data.service}\n`;
        whatsappMessage += `*Mensagem:* ${data.message}\n\n`;
        whatsappMessage += `_Fluxo automático iniciado: ${flowId}_`;
        
        // Adiciona quick replies se for mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            whatsappMessage += `\n\n${generateQuickReplies()}`;
        }
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        const directAppUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        openWhatsApp(whatsappUrl, directAppUrl);
    }

    function generateQuickReplies() {
        return chatbotConfig.quickReplies.map(reply => 
            `➡ ${reply.title}: Envie "${reply.id}"`).join('\n');
    }

    function openWhatsApp(webUrl, directUrl) {
        // Implementação mantida igual
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            window.location.href = directUrl;
            setTimeout(() => { window.location.href = webUrl; }, 500);
        } else {
            const newWindow = window.open(webUrl, '_blank');
            if (!newWindow || newWindow.closed) {
                window.location.href = webUrl;
            }
        }
    }
});