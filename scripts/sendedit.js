//document.addEventListener('DOMContentLoaded', function () {
  let url = "https://darferreira.pythonanywhere.com"
    // lee los argumentos pasados a este formulario
    //separa el string por los “&” creando una lista [“id=3” , “nombre=’tv50’” , ”precio=1200”,”stock=20”]
    var args = location.search.substr(1).split('&'); 
    //console.log(args)
    var parts = []
    for (let i = 0; i < args.length; ++i) {
      parts[i] = args[i].split('=');
    }
    //console.log(parts[0])
    var id = decodeURIComponent(parts[0][1]);
    var nombreInput = document.getElementById('nombre');
    var descripcionInput = document.getElementById('descripcion');
    var precioInput = document.getElementById('precio');
    var stockInput = document.getElementById('stock');
    var archivoInput = document.getElementById('archivo');
    var cargarProductoBtn = document.getElementById('cargarProducto');
    var cargarImagePreview = document.getElementById("preview-image")

    // Agregar eventos de entrada para cada campo
    nombreInput.addEventListener('input', checkFormCompletion);
    descripcionInput.addEventListener('input', checkFormCompletion);
    precioInput.addEventListener('input', checkFormCompletion);
    stockInput.addEventListener('input', checkFormCompletion);
    //archivoInput.addEventListener('input', checkFormCompletion);

    //decodeUriComponent elimina los caracteres especiales que recibe en la URL 
    nombreInput.value = decodeURIComponent(parts[1][1])
    precioInput.value = decodeURIComponent(parts[2][1])
    stockInput.value =decodeURIComponent( parts[3][1])
    descripcionInput.value =decodeURIComponent( parts[4][1])
    cargarImagePreview.setAttribute('src',`${url}/${decodeURIComponent( parts[5][1])}`)
    // =decodeURIComponent( parts[5][1])

    function checkFormCompletion() {
      var nombre = nombreInput.value;
      var descripcion = descripcionInput.value;
      var precio = precioInput.value;
      var stock = stockInput.value;
      //var archivo = archivoInput.value;

      // Verificar si todos los campos están completos
      if (nombre && descripcion && precio && stock) {
        // Habilitar el botón si todos los campos están completos
        cargarProductoBtn.disabled = false;
      } else {
        // Deshabilitar el botón si algún campo está incompleto
        cargarProductoBtn.disabled = true;
      }
    }



//});

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
  //let url = "https://darferreira.pythonanywhere.com"
    document.getElementById('notificaciones').innerHTML ="";
    //var id = document.getElementById("id");
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var stock = document.getElementById('stock').value;
    var input = document.getElementById('archivo');
    var archivo = input.files[0];
    // Si el input=file estaba vacío creo un nuevo File con el atributo filename=''
    if (input.files.length == 0){
      archivo = new File([""],'');
    }

  

    var formData = new FormData();
    formData.append('imagen', archivo);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('stock', stock);

// console.log(formData);
    // Realizar la solicitud POST a la API REST
    fetch(`${url}/api/productos/`+id, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('notificaciones').innerHTML ="<div class=\"alert alert-success\" role=\"alert\">Se edito correctamente el producto "+nombre+"</div>"
        console.log('Respuesta del servidor:', data);
  
    })
    .catch(error => {
        document.getElementById('notificaciones').innerHTML ="<div class=\"alert alert-danger\" role=\"alert\"No se pudo editar correctamente el producto "+nombre+"</div>"
        console.error('Error al realizar la solicitud:', error);
    });
}