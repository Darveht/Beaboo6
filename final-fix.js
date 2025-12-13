// Script final para asegurar que la aplicación sea visible
console.log('🔧 Script final ejecutándose...');

// Función para forzar visibilidad
function forceVisibility() {
  console.log('🔧 Forzando visibilidad final...');
  
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
  
  // Verificar Firebase y mostrar la vista correcta
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const user = firebase.auth().currentUser;
    console.log('🔥 Usuario actual:', user ? 'Autenticado' : 'No autenticado');
    
    if (user) {
      // Usuario autenticado - mostrar app principal
      if (authForm) authForm.style.display = 'none';
      if (mainApp) {
        mainApp.style.display = 'flex';
        mainApp.style.backgroundColor = '#ffffff';
        mainApp.style.color = '#000000';
      }
      console.log('✅ Mostrando aplicación para usuario autenticado');
    } else {
      // Usuario no autenticado - mostrar formulario
      if (mainApp) mainApp.style.display = 'none';
      if (authForm) {
        authForm.style.display = 'flex';
        authForm.style.backgroundColor = '#ffffff';
        authForm.style.color = '#000000';
      }
      console.log('✅ Mostrando formulario para usuario no autenticado');
    }
  } else {
    console.log('⚠️ Firebase no disponible, mostrando formulario por defecto');
    if (mainApp) mainApp.style.display = 'none';
    if (authForm) {
      authForm.style.display = 'flex';
      authForm.style.backgroundColor = '#ffffff';
      authForm.style.color = '#000000';
    }
  }
  
  console.log('✅ Visibilidad final completada');
}

// Ejecutar inmediatamente
forceVisibility();

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', forceVisibility);
} else {
  forceVisibility();
}

// Ejecutar después de un delay para asegurar que Firebase esté cargado
setTimeout(forceVisibility, 2000);

console.log('🔧 Script final cargado completamente');