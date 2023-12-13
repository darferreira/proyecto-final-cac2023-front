
new Vue({
  el: '#app',
  data: {
    url:"https://darferreira.pythonanywhere.com",
    datos: []
  },
  mounted() {
    // Realizar la solicitud a la API usando fetch
    fetch(`${this.url}/api/productos`)
      .then(response => response.json())
      .then(data => {
        // Asignar los datos obtenidos a la propiedad datos
       
        this.datos = data;
      })
      .catch(error => console.error('Error fetching data:', error));
  },
  methods: {
    agregarAlCarrito(dato) {
      // Lógica para agregar al carrito
      console.log('Agregado al carrito:', dato);
    },
    borrar(dato) {
      const confirmacion = confirm(`¿Estás seguro que deseas borrar este producto?`);

      if (confirmacion) {
        // Llamada a la API para eliminar el product
        fetch(`${this.url}/api/productos/${dato}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al borrar el producto');
            }
            response.text()
          })
          .then(res => {
            location.reload();
          })
          .catch(error => console.error('Error al borrar el producto:', error));
      }
    }
  }
  
});
