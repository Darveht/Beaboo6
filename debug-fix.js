// Script de emergencia para solucionar el problema de pantalla en blanco

console.log('🔧 Iniciando script de emergencia...');

// Función para forzar la visibilidad de elementos
function forceVisibility() {
    console.log('🔧 Forzando visibilidad de elementos...');
    
    // Asegurar que el body sea visible
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.body.style.display = 'block';
    
    // Mostrar la aplicación principal si existe
    const mainApp = document.getElementById('main-app');
    if (mainApp) {
        mainApp.style.display = 'flex';
        mainApp.style.backgroundColor = '#ffffff';
        mainApp.style.color = '#000000';
        console.log('✅ Aplicación principal mostrada');
    }
    
    // Mostrar el formulario de auth si existe
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.style.display = 'flex';
        authForm.style.backgroundColor = '#ffffff';
        authForm.style.color = '#000000';
        console.log('✅ Formulario de autenticación mostrado');
    }
    
    // Asegurar que todos los elementos principales sean visibles
    const elements = document.querySelectorAll('div, section, header, main, nav');
    elements.forEach(el => {
        if (el.style.display === 'none' && !el.classList.contains('hidden')) {
            el.style.display = 'block';
        }
    });
    
    console.log('✅ Visibilidad forzada completada');
}

// Ejecutar inmediatamente
forceVisibility();

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
} else {
    forceVisibility();
}

// Ejecutar después de un pequeño delay para asegurar que todo esté cargado
setTimeout(forceVisibility, 1000);

// Función para verificar el estado de Firebase
function checkFirebaseAuth() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        console.log('🔥 Firebase está disponible');
        
        firebase.auth().onAuthStateChanged((user) => {
            console.log('🔥 Estado de autenticación cambiado:', user ? 'Autenticado' : 'No autenticado');
            
            if (user) {
                // Usuario autenticado - mostrar app principal
                const authForm = document.getElementById('auth-form');
                const mainApp = document.getElementById('main-app');
                
                if (authForm) {
                    authForm.style.display = 'none';
                }
                if (mainApp) {
                    mainApp.style.display = 'flex';
                    mainApp.style.backgroundColor = '#ffffff';
                    mainApp.style.color = '#000000';
                }
                console.log('✅ Usuario autenticado - mostrando aplicación');
            } else {
                // Usuario no autenticado - mostrar formulario
                const authForm = document.getElementById('auth-form');
                const mainApp = document.getElementById('main-app');
                
                if (mainApp) {
                    mainApp.style.display = 'none';
                }
                if (authForm) {
                    authForm.style.display = 'flex';
                    authForm.style.backgroundColor = '#ffffff';
                    authForm.style.color = '#000000';
                }
                console.log('✅ Usuario no autenticado - mostrando formulario');
            }
        });
    } else {
        console.log('⚠️ Firebase no está disponible aún, reintentando...');
        setTimeout(checkFirebaseAuth, 1000);
    }
}

// Verificar Firebase después de un delay
setTimeout(checkFirebaseAuth, 2000);

console.log('🔧 Script de emergencia cargado completamente');