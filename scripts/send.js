document.addEventListener('DOMContentLoaded', function () {
    var nombreInput = document.getElementById('nombre');
    var descripcionInput = document.getElementById('descripcion');
    var precioInput = document.getElementById('precio');
    var stockInput = document.getElementById('stock');
    var archivoInput = document.getElementById('archivo');
    var cargarProductoBtn = document.getElementById('cargarProducto');

    function checkFormCompletion() {
      var nombre = nombreInput.value;
      var descripcion = descripcionInput.value;
      var precio = precioInput.value;
      var stock = stockInput.value;
      var archivo = archivoInput.value;

      // Verificar si todos los campos están completos
      if (nombre && descripcion && precio && stock && archivo) {
        // Habilitar el botón si todos los campos están completos
        cargarProductoBtn.disabled = false;
      } else {
        // Deshabilitar el botón si algún campo está incompleto
        cargarProductoBtn.disabled = true;
      }
    }

    // Agregar eventos de entrada para cada campo
    nombreInput.addEventListener('input', checkFormCompletion);
    descripcionInput.addEventListener('input', checkFormCompletion);
    precioInput.addEventListener('input', checkFormCompletion);
    stockInput.addEventListener('input', checkFormCompletion);
    archivoInput.addEventListener('input', checkFormCompletion);
  });

  function previewImage() {
    var input = document.getElementById('archivo');
    var preview = document.getElementById('preview-image');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        preview.src = '';
    }
}

function enviarDatos() {
    document.getElementById('notificaciones').innerHTML ="";
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var stock = document.getElementById('stock').value;
    var input = document.getElementById('archivo');
    var archivo = input.files[0];

var formData = new FormData();
formData.append('imagen', archivo);
formData.append('nombre', nombre);
formData.append('descripcion', descripcion);
formData.append('precio', precio);
formData.append('stock', stock);

console.log(formData);
    // Realizar la solicitud POST a la API REST
    let url = "https://darferreira.pythonanywhere.com"
    fetch(`${url}/api/productos`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('notificaciones').innerHTML ="<div class=\"alert alert-success\" role=\"alert\">Se cargo correctamente el producto "+nombre+"</div>"
        console.log('Respuesta del servidor:', data);
  
    })
    .catch(error => {
        document.getElementById('notificaciones').innerHTML ="<div class=\"alert alert-danger\" role=\"alert\"No se pudo cargar correctamente el producto "+nombre+"</div>"
        console.error('Error al realizar la solicitud:', error);
    });
}