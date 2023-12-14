

function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Validación simple para demostración
    if (username === 'admin' && password === 'admin') {
        window.location.href = "admenu.html";
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  }
