// Funciones de soporte para la pantalla de autenticación

// Función para abrir el modal de soporte desde la pantalla de autenticación
function openSupportFromAuth() {
  // Ocultar el formulario de autenticación
  document.getElementById('auth-form').style.display = 'none';
  
  // Mostrar el modal de soporte
  document.getElementById('support-modal').classList.remove('hidden');
  
  // Pre-llenar el tipo de problema como "account" (problema con la cuenta)
  document.getElementById('support-problem-type').value = 'account';
  
  // Agregar texto predeterminado en la descripción
  const descriptionField = document.getElementById('support-description');
  descriptionField.value = 'No puedo acceder a mi cuenta. ';
  
  // Actualizar el contador de caracteres
  updateCharacterCount();
}

// Función para cerrar el modal de soporte y volver a la autenticación
function closeSupportModal() {
  // Ocultar el modal de soporte
  document.getElementById('support-modal').classList.add('hidden');
  
  // Mostrar el formulario de autenticación
  document.getElementById('auth-form').style.display = 'flex';
  
  // Limpiar el formulario de soporte
  resetSupportForm();
}

// Función para resetear el formulario de soporte
function resetSupportForm() {
  document.getElementById('support-form').reset();
  document.getElementById('support-form-container').classList.remove('hidden');
  document.getElementById('support-success-message').classList.add('hidden');
  updateCharacterCount();
}

// Función para actualizar el contador de caracteres
function updateCharacterCount() {
  const description = document.getElementById('support-description');
  const charCount = document.getElementById('char-count');
  const validationMessage = document.getElementById('validation-message');
  const submitButton = document.getElementById('btn-send-support');
  
  if (description && charCount) {
    const currentLength = description.value.length;
    const minLength = 100;
    
    if (currentLength < minLength) {
      charCount.textContent = `${currentLength} / ${minLength} caracteres mínimo`;
      charCount.className = 'text-sm text-gray-500';
      
      if (validationMessage) {
        validationMessage.classList.add('hidden');
      }
      
      // Deshabilitar botón si no cumple requisitos mínimos
      if (submitButton && currentLength === 0) {
        submitButton.disabled = true;
        submitButton.classList.add('opacity-50', 'cursor-not-allowed');
      }
    } else {
      charCount.textContent = `${currentLength} caracteres`;
      charCount.className = 'text-sm text-green-600';
      
      if (validationMessage) {
        validationMessage.classList.remove('hidden');
      }
      
      // Habilitar botón
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }
}

// Función para enviar la solicitud de soporte
async function sendSupportRequest(event) {
  event.preventDefault();
  
  const email = document.getElementById('support-email').value;
  const problemType = document.getElementById('support-problem-type').value;
  const description = document.getElementById('support-description').value;
  
  // Validaciones
  if (!email || !problemType || !description) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }
  
  if (description.length < 100) {
    alert('La descripción debe tener al menos 100 caracteres.');
    return;
  }
  
  const submitButton = document.getElementById('btn-send-support');
  const originalText = submitButton.innerHTML;
  
  // Mostrar estado de carga
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
  
  try {
    const response = await fetch('/.netlify/functions/send-support-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        problemType: problemType,
        description: description,
        userId: 'auth-screen' // Indicar que viene de la pantalla de autenticación
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar la solicitud');
    }
    
    // Mostrar mensaje de éxito
    showSupportSuccess();
    
    // Mostrar notificación toast
    showToast('Solicitud enviada correctamente. Te contactaremos pronto.', 'success');
    
  } catch (error) {
    console.error('Error al enviar solicitud de soporte:', error);
    alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    
    // Restaurar botón
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
}

// Función para mostrar el mensaje de éxito
function showSupportSuccess() {
  document.getElementById('support-form-container').classList.add('hidden');
  document.getElementById('support-success-message').classList.remove('hidden');
  
  // Agregar animación de éxito
  const successIcon = document.querySelector('#support-success-message .fas.fa-check-circle');
  if (successIcon) {
    successIcon.style.animation = 'bounceIn 0.6s ease-out';
  }
  
  // Reproducir sonido de éxito (opcional)
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {});
  } catch (e) {}
}

// Función para validar el formulario en tiempo real
function validateForm() {
  const email = document.getElementById('support-email');
  const problemType = document.getElementById('support-problem-type');
  const description = document.getElementById('support-description');
  const submitButton = document.getElementById('btn-send-support');
  
  if (email && problemType && description && submitButton) {
    const isValid = email.value.trim() !== '' && 
                   problemType.value !== '' && 
                   description.value.length >= 100;
    
    if (isValid) {
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }
}

// Agregar event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Event listener para el formulario de soporte
  const supportForm = document.getElementById('support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', sendSupportRequest);
  }
  
  // Event listeners para validación en tiempo real
  const email = document.getElementById('support-email');
  const problemType = document.getElementById('support-problem-type');
  const description = document.getElementById('support-description');
  
  if (email) {
    email.addEventListener('input', validateForm);
  }
  
  if (problemType) {
    problemType.addEventListener('change', validateForm);
  }
  
  if (description) {
    description.addEventListener('input', function() {
      updateCharacterCount();
      validateForm();
    });
  }
  
  // Validación inicial
  validateForm();
  
  // Atajos de teclado
  document.addEventListener('keydown', function(event) {
    // Escape para cerrar el modal de soporte
    if (event.key === 'Escape') {
      const supportModal = document.getElementById('support-modal');
      if (supportModal && !supportModal.classList.contains('hidden')) {
        closeSupportModal();
      }
    }
    
    // Ctrl/Cmd + Enter para enviar el formulario
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      const supportForm = document.getElementById('support-form');
      const submitButton = document.getElementById('btn-send-support');
      if (supportForm && submitButton && !submitButton.disabled) {
        event.preventDefault();
        supportForm.dispatchEvent(new Event('submit'));
      }
    }
  });
});

// Función para mostrar notificaciones toast
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-[10000] px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full`;
  
  if (type === 'success') {
    toast.classList.add('bg-green-500');
    toast.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
  } else if (type === 'error') {
    toast.classList.add('bg-red-500');
    toast.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
  }
  
  document.body.appendChild(toast);
  
  // Animar entrada
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);
  
  // Animar salida
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes bounceIn {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .transition-all {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);